import apiFetch from "@wordpress/api-fetch";
import "./style.scss";

// Youth team championships (rapid and blitz).
// Filtered by gender (boys/girls) and age group; U10 and U11 share one button.
// Rapid and blitz are shown together, each row badged with its time control.
// All years on one page; search happens in the browser.
// The block's saved markup (old DataTables table) is hidden by CSS and replaced by .lsf-archive.

const GENDERS = [
	{ key: "Boys", label: "Berniukų" },
	{ key: "Girls", label: "Mergaičių" },
];
// Each button matches one or more numeric ages; "10" covers both U10 and U11
const AGE_GROUPS = [
	{ key: "18", label: "U18", ages: [18] },
	{ key: "14", label: "U14", ages: [14] },
	{ key: "10", label: "U10/U11", ages: [10, 11] },
];
const TC_LABEL = { Rapid: "Greitieji", Blitz: "Žaibo" };
const MONTHS = [
	"sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio",
	"liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio",
];

const esc = (s) =>
	String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fold = (s) => String(s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// Ages may be numbers or strings like "U11"
function toAge(value) {
	const n = parseInt(String(value ?? "").replace(/\D/g, ""), 10);
	return Number.isNaN(n) ? null : n;
}

function genderOf(config) {
	return config.gender === "Women" ? "Girls" : "Boys";
}

function collectRows(data) {
	const rows = [];
	(data || []).forEach((yearData) => {
		(yearData.tournaments || []).forEach((t) => {
			const c = t.config || {};
			if (c.format !== "Team") return;
			if (c.time_control !== "Rapid" && c.time_control !== "Blitz") return;
			const age = toAge(c.age_group);
			if (age == null) return; // youth only
			rows.push({ year: yearData.year, age, gender: genderOf(c), tc: c.time_control, t });
		});
	});
	// Newest first; within a year keep rapid before blitz, then file order
	return rows
		.map((r, i) => ({ ...r, i }))
		.sort((a, b) => b.year - a.year || (a.tc === b.tc ? a.i - b.i : a.tc === "Rapid" ? -1 : 1));
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
	const state = { gender: "Boys", ageKey: "18", query: "", rows: null };

	const root = document.createElement("div");
	root.className = "lsf-archive";
	root.innerHTML = `
		<div class="lsf-filters" role="search">
			<div class="lsf-seg" role="group" aria-label="Lytis">
				${GENDERS.map((g) => `<button type="button" data-gender="${g.key}">${g.label}</button>`).join("")}
			</div>
			<div class="lsf-ages" role="group" aria-label="Amžiaus grupė">
				${AGE_GROUPS.map((a) => `<button type="button" data-age="${a.key}">${a.label}</button>`).join("")}
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

	const rowHtml = ({ year, tc, t }) => {
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
				<span class="lsf-note">${esc(TC_LABEL[tc] || tc)}</span>
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
		root.querySelectorAll("[data-gender]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gender === state.gender)));
		root.querySelectorAll("[data-age]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.age === state.ageKey)));
		if (!state.rows) return;

		const group = AGE_GROUPS.find((a) => a.key === state.ageKey) || AGE_GROUPS[0];
		const all = state.rows.filter((r) => r.gender === state.gender && group.ages.includes(r.age));
		const shown = all.filter(matches);
		const label = `${(GENDERS.find((g) => g.key === state.gender) || {}).label} ${group.label}`;
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
			state.ageKey = b.dataset.age;
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
	document.querySelectorAll(".wp-block-create-block-teamyouth").forEach(mount);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
