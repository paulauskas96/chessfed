import apiFetch from "@wordpress/api-fetch";
import "./style.scss";

// Adult rapid and blitz team championships.
// All years on one page; filtering by time control and search happens in the browser.
// The block's saved markup (old DataTables table) is hidden by CSS and replaced by .lsf-archive.

const TIME_CONTROLS = [
	{ key: "Rapid", label: "Greitieji" },
	{ key: "Blitz", label: "Žaibo" },
];
const MONTHS = [
	"sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio",
	"liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio",
];

const esc = (s) =>
	String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fold = (s) => String(s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function collectRows(data) {
	const rows = [];
	(data || []).forEach((yearData) => {
		(yearData.tournaments || []).forEach((t) => {
			const c = t.config || {};
			if (c.format !== "Team") return;
			if (c.time_control !== "Rapid" && c.time_control !== "Blitz") return;
			if (c.age_group != null) return; // adults only
			rows.push({ year: yearData.year, tc: c.time_control, t });
		});
	});
	return rows.map((r, i) => ({ ...r, i })).sort((a, b) => b.year - a.year || a.i - b.i);
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
	const state = { tc: "Rapid", query: "", rows: null };

	const root = document.createElement("div");
	root.className = "lsf-archive";
	root.innerHTML = `
		<div class="lsf-filters" role="search">
			<div class="lsf-seg" role="group" aria-label="Laiko kontrolė">
				${TIME_CONTROLS.map((t) => `<button type="button" data-tc="${t.key}">${t.label}</button>`).join("")}
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

	const rowHtml = ({ year, t }) => {
		const links = [
			t.results_link ? `<a href="${esc(t.results_link)}" target="_blank" rel="noopener">Rezultatai ↗</a>` : "",
			t.games_link ? `<a href="${esc(t.games_link)}" target="_blank" rel="noopener">Partijos ↗</a>` : "",
			t.download_link ? `<a href="${esc(t.download_link)}">Atsisiųsti</a>` : "",
		].join("");
		const dates = formatDates(t.date_start, t.date_end);
		return `<li class="lsf-row">
			<div class="lsf-head">
				<div class="lsf-year">${highlight(year)}</div>
				<div class="lsf-meta">
					${t.location ? `<span>${highlight(t.location)}</span>` : ""}
					${dates ? `<span>${esc(dates)}</span>` : ""}
				</div>
			</div>
			<ol class="lsf-teams">${(t.team_winners || []).map(teamHtml).join("")}</ol>
			<div class="lsf-links">${links}</div>
		</li>`;
	};

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
		root.querySelectorAll("[data-tc]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tc === state.tc)));
		if (!state.rows) return;

		const all = state.rows.filter((r) => r.tc === state.tc);
		const shown = all.filter(matches);
		const label = (TIME_CONTROLS.find((t) => t.key === state.tc) || {}).label;
		const years = all.map((r) => r.year);
		const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "";

		summaryEl.innerHTML = state.query
			? `<strong>${label}</strong> · rasta ${shown.length} iš ${all.length}`
			: `<strong>${label}</strong>${span ? ` · ${span}` : ""}`;
		listEl.innerHTML = shown.length
			? shown.map(rowHtml).join("")
			: `<li class="lsf-empty">${state.query ? `Pagal „${esc(state.query)}“ nieko nerasta.` : "Įrašų nėra."}</li>`;
	};

	root.querySelectorAll("[data-tc]").forEach((b) =>
		b.addEventListener("click", () => {
			state.tc = b.dataset.tc;
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
	// Block name is lowercase in block.json, so WordPress emits a lowercase class
	document.querySelectorAll(".wp-block-create-block-teamrapidblitzadult").forEach(mount);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
