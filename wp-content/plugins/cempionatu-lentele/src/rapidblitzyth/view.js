import apiFetch from "@wordpress/api-fetch";
import "./style.scss";

// Youth rapid and blitz individual championships.
// Each event holds two standings in one row: boys/open (winners) and girls (women_winners).
// All years are on one page; filtering by time control, age group and search happens in the browser.
// The block's saved markup (old DataTables table) is hidden by CSS and replaced by .lsf-archive.

const AGES = [18, 16, 14, 12, 10, 8];
const TIME_CONTROLS = [
	{ key: "Rapid", label: "Greitieji" },
	{ key: "Blitz", label: "Žaibo" },
];
const STANDINGS = [
	{ key: "winners", label: "Vaikinų įskaita" },
	{ key: "women_winners", label: "Merginų įskaita" },
];
const MONTHS = [
	"sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio",
	"liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio",
];
const TITLE_RE = /^(GM|IM|FM|CM|WGM|WIM|WFM|WCM)\s+(.+)$/;

const esc = (s) =>
	String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Lowercase and strip diacritics so "zukauskas" finds "Žukauskas"
const fold = (s) => String(s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// Some years store age groups as "G08" / "U11" instead of numbers
function toAge(value) {
	const n = parseInt(String(value ?? "").replace(/\D/g, ""), 10);
	return Number.isNaN(n) ? null : n;
}

function collectRows(data) {
	const rows = [];
	(data || []).forEach((yearData) => {
		(yearData.tournaments || []).forEach((t) => {
			const c = t.config || {};
			if (c.format !== "Individual") return;
			if (c.time_control !== "Rapid" && c.time_control !== "Blitz") return;
			const age = toAge(c.age_group);
			if (!AGES.includes(age)) return;
			rows.push({ year: yearData.year, age, tc: c.time_control, t });
		});
	});
	return rows.sort((a, b) => b.year - a.year);
}

// "03 29", "04 02" -> "Kovo 29 d. – balandžio 2 d."; "03 04-06" is also accepted; unknown formats are shown as they are
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
	const d = " d."; // non-breaking space keeps "d." next to the number
	let s;
	if (a[0] === b[0] && a[1] === b[1]) s = `${m1} ${a[1]}${d}`;
	else if (a[0] === b[0]) s = `${m1} ${a[1]}–${b[1]}${d}`;
	else s = `${m1} ${a[1]}${d} – ${m2} ${b[1]}${d}`;
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function mount(block) {
	const state = { tc: "Rapid", age: 18, query: "", rows: null };

	const root = document.createElement("div");
	root.className = "lsf-archive";
	root.innerHTML = `
		<div class="lsf-filters" role="search">
			<div class="lsf-seg" role="group" aria-label="Laiko kontrolė">
				${TIME_CONTROLS.map((t) => `<button type="button" data-tc="${t.key}">${t.label}</button>`).join("")}
			</div>
			<div class="lsf-ages" role="group" aria-label="Amžiaus grupė">
				${AGES.map((a) => `<button type="button" data-age="${a}">U${a}</button>`).join("")}
			</div>
			<label class="lsf-search">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
				<input type="search" placeholder="Žaidėjas, miestas ar metai" autocomplete="off" aria-label="Paieška">
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
		// Non-breaking space ( ) after the title and before the city, so they
		// stay attached to the name on screen and survive copy-paste.
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

	const standingHtml = (t, { key, label }) => {
		const list = t[key] || [];
		return `<div class="lsf-standing">
			<div class="lsf-standing-label">${label}</div>
			<ol class="lsf-winners">${list.length ? list.map(winnerHtml).join("") : `<li class="lsf-empty-sub">—</li>`}</ol>
		</div>`;
	};

	const rowHtml = ({ year, t }) => {
		const links = [
			t.results_link ? `<a href="${esc(t.results_link)}" target="_blank" rel="noopener">Rezultatai ↗</a>` : "",
			t.games_link ? `<a href="${esc(t.games_link)}" target="_blank" rel="noopener">Partijos ↗</a>` : "",
			t.download_link ? `<a href="${esc(t.download_link)}">Atsisiųsti</a>` : "",
		].join("");
		const dates = formatDates(t.date_start, t.date_end);
		const note = t.config && t.config.rank;
		return `<li class="lsf-row lsf-row--dual">
			<div class="lsf-head">
				<div class="lsf-year">${highlight(year)}</div>
				<div class="lsf-meta">
					${t.location ? `<span>${highlight(t.location)}</span>` : ""}
					${dates ? `<span>${esc(dates)}</span>` : ""}
				</div>
				${note ? `<span class="lsf-note">${esc(note)}</span>` : ""}
			</div>
			<div class="lsf-standings">${STANDINGS.map((s) => standingHtml(t, s)).join("")}</div>
			<div class="lsf-links">${links}</div>
		</li>`;
	};

	const matches = ({ year, t }) => {
		if (!state.query) return true;
		const parts = [year, t.location];
		[...(t.winners || []), ...(t.women_winners || [])].forEach((w) => parts.push(w.name, w.city, w.country));
		return parts.map(fold).join(" | ").includes(fold(state.query));
	};

	const render = () => {
		root.querySelectorAll("[data-tc]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tc === state.tc)));
		root.querySelectorAll("[data-age]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.age) === state.age)));
		if (!state.rows) return;

		const all = state.rows.filter((r) => r.tc === state.tc && r.age === state.age);
		const shown = all.filter(matches);
		const tcLabel = (TIME_CONTROLS.find((t) => t.key === state.tc) || {}).label;
		const label = `${tcLabel} U${state.age}`;
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
	root.querySelectorAll("[data-age]").forEach((b) =>
		b.addEventListener("click", () => {
			state.age = Number(b.dataset.age);
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
	document.querySelectorAll(".wp-block-create-block-rapidblitzyth").forEach(mount);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
