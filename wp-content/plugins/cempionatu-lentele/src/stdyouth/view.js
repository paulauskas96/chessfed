import apiFetch from "@wordpress/api-fetch";
import "./style.scss";

// Youth standard (classical) individual championships.
// All years are shown on one page; filtering by gender, age group and search happens in the browser.
// The block's saved markup (old DataTables table) is hidden by CSS and replaced by .lsf-archive.

const AGES = [18, 16, 14, 12, 10, 8];
const GENDERS = [
	{ key: "B", label: "Berniukai" },
	{ key: "G", label: "Mergaitės" },
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

// Some years store girls' groups as "G08" / "G10" instead of numbers
function toAge(value) {
	const n = parseInt(String(value ?? "").replace(/\D/g, ""), 10);
	return Number.isNaN(n) ? null : n;
}

function toGender(value) {
	if (value === "Women") return "G";
	if (value == null || value === "Open") return "B";
	return null;
}

function collectRows(data) {
	const rows = [];
	(data || []).forEach((yearData) => {
		(yearData.tournaments || []).forEach((t) => {
			const c = t.config || {};
			if (c.format !== "Individual" || c.time_control !== "Std") return;
			const age = toAge(c.age_group);
			const gender = toGender(c.gender);
			if (!AGES.includes(age) || !gender) return;
			rows.push({ year: yearData.year, age, gender, t });
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
	const state = { gender: "B", age: 18, query: "", rows: null };

	const root = document.createElement("div");
	root.className = "lsf-archive";
	root.innerHTML = `
		<div class="lsf-filters" role="search">
			<div class="lsf-seg" role="group" aria-label="Lytis">
				${GENDERS.map((g) => `<button type="button" data-gender="${g.key}">${g.label}</button>`).join("")}
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

	const rowHtml = ({ year, t }) => {
		const links = [
			t.results_link ? `<a href="${esc(t.results_link)}" target="_blank" rel="noopener">Rezultatai ↗</a>` : "",
			t.games_link ? `<a href="${esc(t.games_link)}" target="_blank" rel="noopener">Partijos ↗</a>` : "",
			t.download_link ? `<a href="${esc(t.download_link)}">Atsisiųsti</a>` : "",
		].join("");
		const dates = formatDates(t.date_start, t.date_end);
		const note = t.config && t.config.rank;
		return `<li class="lsf-row">
			<div class="lsf-head">
				<div class="lsf-year">${highlight(year)}</div>
				<div class="lsf-meta">
					${t.location ? `<span>${highlight(t.location)}</span>` : ""}
					${dates ? `<span>${esc(dates)}</span>` : ""}
				</div>
				${note ? `<span class="lsf-note">${esc(note)}</span>` : ""}
			</div>
			<ol class="lsf-winners">${(t.winners || []).map(winnerHtml).join("")}</ol>
			<div class="lsf-links">${links}</div>
		</li>`;
	};

	const matches = ({ year, t }) => {
		if (!state.query) return true;
		const parts = [year, t.location];
		(t.winners || []).forEach((w) => parts.push(w.name, w.city, w.country));
		return parts.map(fold).join(" | ").includes(fold(state.query));
	};

	const render = () => {
		root.querySelectorAll("[data-gender]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gender === state.gender)));
		root.querySelectorAll("[data-age]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.age) === state.age)));
		if (!state.rows) return;

		const all = state.rows.filter((r) => r.gender === state.gender && r.age === state.age);
		const shown = all.filter(matches);
		const label = `${state.gender === "B" ? "Berniukai" : "Mergaitės"} U${state.age}`;
		const years = all.map((r) => r.year);
		const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "";

		summaryEl.innerHTML = state.query
			? `<strong>${label}</strong> · rasta ${shown.length} iš ${all.length}`
			: `<strong>${label}</strong>${span ? ` · ${span}` : ""}`;
		listEl.innerHTML = shown.length
			? shown.map(rowHtml).join("")
			: `<li class="lsf-empty">${state.query ? `Pagal „${esc(state.query)}“ nieko nerasta.` : "Įrašų nėra."}</li>`;
	};

	root.querySelectorAll("[data-gender]").forEach((b) =>
		b.addEventListener("click", () => {
			state.gender = b.dataset.gender;
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
	document.querySelectorAll(".wp-block-create-block-stdyouth").forEach(mount);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
