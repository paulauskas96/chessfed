import apiFetch from "@wordpress/api-fetch";
import "./style.scss";

// Adult standard (classical) individual championships: men's and women's.
// A year can hold several stages (final, semifinal, open) — they are grouped
// under one year, final first. When searching, only the matching stages are shown.
// All years on one page; filtering by category and search happens in the browser.
// The block's saved markup (old DataTables table) is hidden by CSS and replaced by .lsf-archive.

const CATEGORIES = [
	{ key: "Open", label: "Vyrų čempionatai" },
	{ key: "Women", label: "Moterų čempionatai" },
];
// Final first, then semifinal, then the open tournament
const STAGE_ORDER = { Finalas: 0, Pusfinalis: 1, "Atviras turnyras": 2 };
const MONTHS = [
	"sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio",
	"liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio",
];
const TITLE_RE = /^(GM|IM|FM|CM|WGM|WIM|WFM|WCM)\s+(.+)$/;

const esc = (s) =>
	String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fold = (s) => String(s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function categoryOf(config) {
	return config.gender === "Women" ? "Women" : "Open";
}

function stageRank(t) {
	const r = t.config && t.config.rank;
	return r in STAGE_ORDER ? STAGE_ORDER[r] : 3;
}

function collectRows(data) {
	const rows = [];
	(data || []).forEach((yearData) => {
		(yearData.tournaments || []).forEach((t) => {
			const c = t.config || {};
			if (c.format !== "Individual" || c.time_control !== "Std") return;
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
				<input type="search" placeholder="Žaidėjas ar metai" autocomplete="off" aria-label="Paieška">
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

	const winnerHtml = (w) => {
		const m = TITLE_RE.exec(w.name || "");
		const title = m ? `<span class="lsf-title">${m[1]}</span> ` : "";
		const name = m ? m[2] : w.name;
		const place = Number(w.place);
		const medal = place >= 1 && place <= 3 ? `lsf-p${place}` : "lsf-p0";
		// Rating in parentheses right after the name
		const rating = w.rating ? ` <span class="lsf-rating">(${esc(w.rating)})</span>` : "";
		return `<li class="lsf-winner">
			<span class="lsf-place ${medal}" aria-label="${esc(w.place)} vieta">${esc(w.place)}</span>
			<span class="lsf-who">${title}<span class="lsf-name">${highlight(name)}</span>${rating}${(w.city || w.country) ? `<span class="lsf-city">, ${highlight(w.city || w.country)}</span>` : ""}</span>
		</li>`;
	};

	const stageHtml = (t) => {
		const label = t.config && t.config.rank;
		const dates = formatDates(t.date_start, t.date_end);
		const meta = [t.location ? highlight(t.location) : "", dates ? esc(dates) : ""].filter(Boolean).join(" · ");
		const links = [
			t.results_link ? `<a href="${esc(t.results_link)}" target="_blank" rel="noopener">Rezultatai ↗</a>` : "",
			t.games_link ? `<a href="${esc(t.games_link)}" target="_blank" rel="noopener">Partijos ↗</a>` : "",
			t.download_link ? `<a href="${esc(t.download_link)}">Atsisiųsti</a>` : "",
		].join("");
		return `<div class="lsf-stage">
			<div class="lsf-stage-head">
				<div class="lsf-stage-id">
					${label ? `<span class="lsf-stage-label">${esc(label)}</span>` : ""}
					${meta ? `<span class="lsf-stage-meta">${meta}</span>` : ""}
				</div>
				${links ? `<div class="lsf-links">${links}</div>` : ""}
			</div>
			<ol class="lsf-winners">${(t.winners || []).map(winnerHtml).join("")}</ol>
		</div>`;
	};

	const groupHtml = ({ year, stages }) => `<li class="lsf-row lsf-row--grouped">
		<div class="lsf-head"><div class="lsf-year">${highlight(year)}</div></div>
		<div class="lsf-stages">${stages.map(stageHtml).join("")}</div>
	</li>`;

	const matches = ({ year, t }) => {
		if (!state.query) return true;
		const parts = [year, t.location];
		(t.winners || []).forEach((w) => parts.push(w.name, w.city, w.country));
		return parts.map(fold).join(" | ").includes(fold(state.query));
	};

	const render = () => {
		root.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
		if (!state.rows) return;

		const inCat = state.rows.filter((r) => r.cat === state.cat);
		const shown = inCat.filter(matches); // during search, only matching stages survive

		// Group stages by year, newest first; within a year sort by stage (final first)
		const byYear = new Map();
		shown.forEach((r) => {
			if (!byYear.has(r.year)) byYear.set(r.year, []);
			byYear.get(r.year).push(r.t);
		});
		const groups = [...byYear.entries()]
			.map(([year, stages]) => ({ year, stages: stages.sort((a, b) => stageRank(a) - stageRank(b)) }))
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
	document.querySelectorAll(".wp-block-create-block-stdadult").forEach(mount);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
