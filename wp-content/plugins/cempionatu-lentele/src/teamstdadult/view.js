import apiFetch from "@wordpress/api-fetch";
import "./style.scss";

// Adult standard (classical) team championships — the leagues (LSL, LMSL).
// A year can hold several tiers (Aukščiausioji lyga, Pirma lyga) — they are grouped
// under one year, top tier first. When searching, only the matching tiers are shown.
// All years on one page; filtering by category and search happens in the browser.
// The block's saved markup (old DataTables table) is hidden by CSS and replaced by .lsf-archive.

const CATEGORIES = [
	{ key: "Open", label: "Vyrų čempionatai" },
	{ key: "Women", label: "Moterų čempionatai" },
];
const MONTHS = [
	"sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio",
	"liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio",
];

const esc = (s) =>
	String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fold = (s) => String(s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function categoryOf(config) {
	return config.gender === "Women" ? "Women" : "Open";
}

// Lower rank number = higher tier (1 = Aukščiausioji, 2 = Pirma lyga); untiered last
function tierRank(t) {
	const r = t.config && t.config.rank;
	return typeof r === "number" ? r : 99;
}

function collectRows(data) {
	const rows = [];
	(data || []).forEach((yearData) => {
		(yearData.tournaments || []).forEach((t) => {
			const c = t.config || {};
			if (c.format !== "Team" || c.time_control !== "Std") return;
			if (c.age_group != null) return; // adults only
			rows.push({ year: yearData.year, cat: categoryOf(c), t });
		});
	});
	return rows;
}

function formatDates(ds, de) {
	const parse = (s) => {
		const m = /^(\d{1,2})\s+(\d{1,2})$/.exec(String(s ?? "").trim());
		return m && MONTHS[+m[1] - 1] ? [+m[1], +m[2]] : null;
	};
	let a = parse(ds);
	let b = parse(de ?? ds);
	const range = /^(\d{1,2})\s+(\d{1,2})-(\d{1,2})$/.exec(String(ds ?? "").trim());
	if (!a && range && MONTHS[+range[1] - 1]) {
		a = [+range[1], +range[2]];
		b = [+range[1], +range[3]];
	}
	if (!a || !b) {
		return [ds, de].map((v) => String(v ?? "").trim()).filter((v, i, arr) => v && arr.indexOf(v) === i).join(" – ");
	}
	const m1 = MONTHS[a[0] - 1];
	const m2 = MONTHS[b[0] - 1];
	const d = " d.";
	let s;
	if (a[0] === b[0] && a[1] === b[1]) s = `${m1} ${a[1]}${d}`;
	else if (a[0] === b[0]) s = `${m1} ${a[1]}–${b[1]}${d}`;
	else s = `${m1} ${a[1]}${d} – ${m2} ${b[1]}${d}`;
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function mount(block) {
	const state = { cat: "Open", query: "", rows: null };

	const root = document.createElement("div");
	root.className = "lsf-archive";
	root.innerHTML = `
		<div class="lsf-filters" role="search">
			<div class="lsf-seg" role="group" aria-label="Kategorija">
				${CATEGORIES.map((c) => `<button type="button" data-cat="${c.key}">${c.label}</button>`).join("")}
			</div>
			<label class="lsf-search">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
				<input type="search" placeholder="Komanda, žaidėjas ar metai" autocomplete="off" aria-label="Paieška">
			</label>
		</div>
		<p class="lsf-summary" aria-live="polite">Įkeliama…</p>
		<ol class="lsf-list"></ol>`;
	block.appendChild(root);

	const summaryEl = root.querySelector(".lsf-summary");
	const listEl = root.querySelector(".lsf-list");

	const highlight = (text) => {
		const t = String(text ?? "");
		const q = state.query;
		const ft = fold(t);
		if (!q || ft.length !== t.length) return esc(t);
		const i = ft.indexOf(fold(q));
		if (i < 0) return esc(t);
		const n = q.length;
		return esc(t.slice(0, i)) + "<mark>" + esc(t.slice(i, i + n)) + "</mark>" + esc(t.slice(i + n));
	};

	const teamHtml = (team) => {
		const place = Number(team.place);
		const medal = place >= 1 && place <= 3 ? `lsf-p${place}` : "lsf-p0";
		const members = team.members || [];
		const memberItems = members.map((m) => `<li>${highlight(m)}</li>`).join("");
		return `<li class="lsf-team">
			<span class="lsf-place ${medal}" aria-label="${esc(team.place)} vieta">${esc(team.place)}</span>
			<div class="lsf-team-body">
				<div class="lsf-team-name">${highlight(team.name)}${team.city ? `<span class="lsf-city">, ${highlight(team.city)}</span>` : ""}</div>
				${members.length ? `<ul class="lsf-members" data-cols="${members.length > 4 ? 2 : 1}">${memberItems}</ul>` : ""}
			</div>
		</li>`;
	};

	const tierHtml = (t) => {
		const label = t.location; // tier name (Aukščiausioji lyga / Pirma lyga), empty when a single league
		const dates = formatDates(t.date_start, t.date_end);
		const meta = dates ? esc(dates) : "";
		const links = [
			t.results_link ? `<a href="${esc(t.results_link)}" target="_blank" rel="noopener">Rezultatai ↗</a>` : "",
			t.games_link ? `<a href="${esc(t.games_link)}" target="_blank" rel="noopener">Partijos ↗</a>` : "",
			t.download_link ? `<a href="${esc(t.download_link)}">Atsisiųsti</a>` : "",
		].join("");
		const head = label || meta || links
			? `<div class="lsf-stage-head">
					<div class="lsf-stage-id">
						${label ? `<span class="lsf-stage-label">${highlight(label)}</span>` : ""}
						${meta ? `<span class="lsf-stage-meta">${meta}</span>` : ""}
					</div>
					${links ? `<div class="lsf-links">${links}</div>` : ""}
				</div>`
			: "";
		return `<div class="lsf-stage">
			${head}
			<ol class="lsf-teams">${(t.team_winners || []).map(teamHtml).join("")}</ol>
		</div>`;
	};

	const groupHtml = ({ year, tiers }) => `<li class="lsf-row lsf-row--grouped">
		<div class="lsf-head"><div class="lsf-year">${highlight(year)}</div></div>
		<div class="lsf-stages">${tiers.map(tierHtml).join("")}</div>
	</li>`;

	const matches = ({ year, t }) => {
		if (!state.query) return true;
		const parts = [year, t.location];
		(t.team_winners || []).forEach((w) => {
			parts.push(w.name, w.city);
			(w.members || []).forEach((m) => parts.push(m));
		});
		return parts.map(fold).join(" | ").includes(fold(state.query));
	};

	const render = () => {
		root.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
		if (!state.rows) return;

		const inCat = state.rows.filter((r) => r.cat === state.cat);
		const shown = inCat.filter(matches); // during search, only matching tiers survive

		const byYear = new Map();
		shown.forEach((r) => {
			if (!byYear.has(r.year)) byYear.set(r.year, []);
			byYear.get(r.year).push(r.t);
		});
		const groups = [...byYear.entries()]
			.map(([year, tiers]) => ({ year, tiers: tiers.sort((a, b) => tierRank(a) - tierRank(b)) }))
			.sort((a, b) => b.year - a.year);

		const label = (CATEGORIES.find((c) => c.key === state.cat) || {}).label;
		const years = inCat.map((r) => r.year);
		const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "";

		summaryEl.innerHTML = state.query
			? `<strong>${label}</strong> · rasta ${shown.length} iš ${inCat.length}`
			: `<strong>${label}</strong>${span ? ` · ${span}` : ""}`;
		listEl.innerHTML = groups.length
			? groups.map(groupHtml).join("")
			: `<li class="lsf-empty">${state.query ? `Pagal „${esc(state.query)}“ nieko nerasta.` : "Įrašų nėra."}</li>`;
	};

	root.querySelectorAll("[data-cat]").forEach((b) =>
		b.addEventListener("click", () => {
			state.cat = b.dataset.cat;
			render();
		}),
	);
	root.querySelector("input").addEventListener("input", (e) => {
		state.query = e.target.value.trim();
		render();
	});

	render();
	apiFetch({ path: "/sample/v1/data" })
		.then((data) => {
			state.rows = collectRows(data);
			render();
		})
		.catch((error) => {
			console.error("Championship archive:", error);
			summaryEl.textContent = "Nepavyko įkelti duomenų. Perkraukite puslapį.";
		});
}

function init() {
	document.querySelectorAll(".wp-block-create-block-teamstdadult").forEach(mount);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
