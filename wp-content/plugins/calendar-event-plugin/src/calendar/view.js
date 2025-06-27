// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import ltLocale from "@fullcalendar/core/locales/lt";
import "tippy.js/themes/light-border.css";
import tippy, { animateFill, roundArrow, sticky } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

// document.addEventListener("DOMContentLoaded", function () {
// 	fetch("/wp-json/wp/v2/varzybos?per_page=70")
// 		.then((response) => response.json())
// 		.then((posts) => {
// 			const events = posts.map((post) => {
// 				const title = post.acf.pavadinimas
// 					? post.acf.pavadinimas
// 					: post.title.rendered;

// 					console.log(post)

// 				const formattedDate =
// 					post.acf.varzybu_data.slice(0, 4) +
// 					"-" +
// 					post.acf.varzybu_data.slice(4, 6) +
// 					"-" +
// 					post.acf.varzybu_data.slice(6);
// 				let formattedEndDate;
// 				if (post.acf.varzybu_data_iki) {
// 					let endDate = new Date(
// 						post.acf.varzybu_data_iki.slice(0, 4),
// 						post.acf.varzybu_data_iki.slice(4, 6) - 1, // months are 0-indexed in JavaScript
// 						post.acf.varzybu_data_iki.slice(6),
// 					);
// 					endDate.setDate(endDate.getDate() + 2); // add one day  reikia prideti nes fullcalendar end date = exclusive, bet nezinau kodel 2dienas reikia prideti
// 					formattedEndDate = endDate.toISOString().split("T")[0]; // get the date part of the ISO string
// 				}
// 				const lithuanianChars = {
// 					ą: "a",
// 					č: "c",
// 					ę: "e",
// 					ė: "e",
// 					į: "i",
// 					š: "s",
// 					ų: "u",
// 					ū: "u",
// 					ž: "z",
// 					Ą: "A",
// 					Č: "C",
// 					Ę: "E",
// 					Ė: "E",
// 					Į: "I",
// 					Š: "S",
// 					Ų: "U",
// 					Ū: "U",
// 					Ž: "Z",
// 				};

// 				const regex = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g;

// 				let sachmatuTipasLowercase = post.acf.sachmatu_tipas
// 					.toLowerCase()
// 					.replace(regex, (match) => lithuanianChars[match] || match);

// 				if (post.acf.lietuvos_mastu) {
// 					sachmatuTipasLowercase += " red";
// 				}
// 				if (!post.acf.lietuvos_mastu) {
// 					sachmatuTipasLowercase += " blue";
// 				}
// 				let eventColor = post.acf.lietuvos_mastu ? "#f75850" : "#228BE6";
// 				return {
// 					title,
// 					start: formattedDate,
// 					...(formattedEndDate && { end: formattedEndDate }), // spread syntax to conditionally add end property
// 					allDay: true,
// 					color: eventColor,
// 					extendedProps: {
// 						url: post.link,
// 						varzybu_data: formattedDate,
// 						varzybu_data_iki: formattedEndDate,
// 						sachmatu_tipas_formatted: sachmatuTipasLowercase,
// 						sachmatu_tipas: post.acf.sachmatu_tipas,
// 						varzybu_vieta: post.acf.varzybu_vieta,
// 					},
// 				};
// 			});
// 			const calendarElement = document.getElementById("calendar");

// 			const calendar = new Calendar(calendarElement, {
// 				plugins: [dayGridPlugin],
// 				initialView: "dayGridMonth",
// 				locale: "lt",
// 				fixedWeekCount: false,
// 				firstDay: 1,
// 				buttonText: {
// 					today: "Šiandien",
// 				},
// 				events: events,
// 				// events: filteredEvents,
// 				eventDidMount: function (info) {
// 					let endDate = new Date(info.event.end);
// 					let formattedEndDate = endDate.toISOString().split("T")[0];
// 					info.el.style.backgroundColor = info.event.color;

// 					tippy(info.el, {
// 						content: `
//         				<a href="${
// 									info.event.extendedProps.url
// 								}" target="_blank"><h3 class="turnyro-title underline">${
// 									info.event.title
// 								}</h3> </a>
// 						<ul class="turnyro-info">
// 						<li class="turnyro-data">
// 						${info.event.extendedProps.varzybu_data}
// 						${info.event.end ? " - " + formattedEndDate : ""}
// 						</li>
// 						<li class="turnyro-tipas ${
// 							info.event.extendedProps.sachmatu_tipas_formatted
// 						} "> ${info.event.extendedProps.sachmatu_tipas}</li>
// 						<li class="turnyro-vieta">${info.event.extendedProps.varzybu_vieta}</li>
// 						</ul>
//     					`,
// 						allowHTML: true,
// 						trigger: "click",
// 						theme: "light-border",
// 						arrow: roundArrow,
// 						interactive: true,
// 						placement: "auto",
// 						animateFill: true,
// 						sticky: true,
// 						plugins: [sticky, animateFill],
// 						popperOptions: {
// 							strategy: "fixed",
// 						},
// 					});
// 				},
// 			});
// 			calendar.render();
// 		});
// });

// document.addEventListener("DOMContentLoaded", function () {
//     fetch("/wp-json/wp/v2/varzybos?per_page=70&orderby=meta_value&meta_key=varzybu_data&order=desc")
//         .then(response => response.json())
//         .then(posts => {
//             const lithuanianChars = {
//                 ą: "a", č: "c", ę: "e", ė: "e", į: "i", š: "s", ų: "u", ū: "u", ž: "z",
//                 Ą: "A", Č: "C", Ę: "E", Ė: "E", Į: "I", Š: "S", Ų: "U", Ū: "U", Ž: "Z"
//             };
//             const regex = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g;

//             const formatDate = (dateStr) => {
// 				if (!dateStr) return null;
// 				return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
// 			};

//             const createEvent = (post) => {
//                 const { pavadinimas, varzybu_data, varzybu_data_iki, sachmatu_tipas, lietuvos_mastu, varzybu_vieta } = post.acf;

//                 const title = pavadinimas || post.title.rendered;
//                 const formattedDate = formatDate(varzybu_data);

//                 let formattedEndDate;
//                 if (varzybu_data_iki) {
//                     let endDate = new Date(varzybu_data_iki.slice(0, 4), varzybu_data_iki.slice(4, 6) - 1, varzybu_data_iki.slice(6));
//                     endDate.setDate(endDate.getDate() + 2); // add one day
//                     formattedEndDate = endDate.toISOString().split("T")[0];
//                 }

//                 let sachmatuTipasLowercase = sachmatu_tipas.toLowerCase().replace(regex, match => lithuanianChars[match] || match);
//                 sachmatuTipasLowercase += lietuvos_mastu ? " red" : " blue";
//                 let eventColor = lietuvos_mastu ? "#f75850" : "#228BE6";

//                 return {
//                     title,
//                     start: formattedDate,
//                     ...(formattedEndDate && { end: formattedEndDate }),
//                     allDay: true,
//                     color: eventColor,
//                     extendedProps: {
//                         url: post.link,
//                         varzybu_data: formattedDate,
//                         varzybu_data_iki: formattedEndDate,
//                         sachmatu_tipas_formatted: sachmatuTipasLowercase,
//                         sachmatu_tipas,
//                         varzybu_vieta
//                     }
//                 };
//             };

//             const events = posts.map(createEvent)
//             const calendarElement = document.getElementById("calendar");

//             const calendar = new Calendar(calendarElement, {
//                 plugins: [dayGridPlugin],
//                 initialView: "dayGridMonth",
//                 locale: "lt",
//                 fixedWeekCount: false,
//                 firstDay: 1,
//                 buttonText: {
//                     today: "Šiandien",
//                 },
//                 events,
//                 eventDidMount: function (info) {
//                     const endDate = new Date(info.event.end);
//                     const formattedEndDate = endDate.toISOString().split("T")[0];

//                     tippy(info.el, {
//                         content: `
//                             <a href="${info.event.extendedProps.url}" target="_blank">
//                                 <h3 class="turnyro-title underline">${info.event.title}</h3>
//                             </a>
//                             <ul class="turnyro-info">
//                                 <li class="turnyro-data">${info.event.extendedProps.varzybu_data}${info.event.end ? " - " + formattedEndDate : ""}</li>
//                                 <li class="turnyro-tipas ${info.event.extendedProps.sachmatu_tipas_formatted}">${info.event.extendedProps.sachmatu_tipas}</li>
//                                 <li class="turnyro-vieta">${info.event.extendedProps.varzybu_vieta}</li>
//                             </ul>
//                         `,
//                         allowHTML: true,
//                         trigger: "click",
//                         theme: "light-border",
//                         arrow: roundArrow,
//                         interactive: true,
//                         placement: "auto-start",
//                         animateFill: true,
//                         sticky: true,
//                         plugins: [sticky, animateFill],
//                         popperOptions: {
//                             strategy: "fixed",
//                         },
//                     });
//                 },
//             });

//             calendar.render();
//         });
// });

async function fetchAllPosts(afterDate) {
	let allPosts = [];
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		const response = await fetch(`/wp-json/wp/v2/varzybos?page=${page}&orderby=date&order=desc&per_page=100&after=${afterDate}`);

		if (!response.ok) {
			hasMore = false;
			break;
		}

		const posts = await response.json();
		allPosts = allPosts.concat(posts);

		if (posts.length < 100) {
			hasMore = false;
		} else {
			page++;
		}
	}

	return allPosts;
}

document.addEventListener("DOMContentLoaded", async function () {
	try {
		const afterDate = '2023-12-13T00:00:00'; // Format: YYYY-MM-DDTHH:mm:ss
        const posts = await fetchAllPosts(afterDate);

		// Your existing code starts here
		const lithuanianChars = {
			ą: "a",
			č: "c",
			ę: "e",
			ė: "e",
			į: "i",
			š: "s",
			ų: "u",
			ū: "u",
			ž: "z",
			Ą: "A",
			Č: "C",
			Ę: "E",
			Ė: "E",
			Į: "I",
			Š: "S",
			Ų: "U",
			Ū: "U",
			Ž: "Z",
		};
		const regex = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g;

		const formatDate = (dateStr) => {
			if (!dateStr) return null;
			return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(
				6,
			)}`;
		};

		const createEvent = (post) => {
			const {
				pavadinimas,
				varzybu_data,
				varzybu_data_iki,
				sachmatu_tipas,
				lietuvos_mastu,
				varzybu_vieta,
			} = post.acf;

			const title = pavadinimas || post.title.rendered;
			const formattedDate = formatDate(varzybu_data);

			let formattedEndDate;
			if (varzybu_data_iki) {
				let endDate = new Date(
					varzybu_data_iki.slice(0, 4),
					varzybu_data_iki.slice(4, 6) - 1,
					varzybu_data_iki.slice(6),
				);
				endDate.setDate(endDate.getDate() + 2); // add one day
				formattedEndDate = endDate.toISOString().split("T")[0];
			}

			let sachmatuTipasLowercase = sachmatu_tipas
				.toLowerCase()
				.replace(regex, (match) => lithuanianChars[match] || match);
			sachmatuTipasLowercase += lietuvos_mastu ? " red" : " blue";
			let eventColor = lietuvos_mastu ? "#f75850" : "#228BE6";

			return {
				title,
				start: formattedDate,
				...(formattedEndDate && { end: formattedEndDate }),
				allDay: true,
				color: eventColor,
				extendedProps: {
					url: post.link,
					varzybu_data: formattedDate,
					varzybu_data_iki: formattedEndDate,
					sachmatu_tipas_formatted: sachmatuTipasLowercase,
					sachmatu_tipas,
					varzybu_vieta,
				},
			};
		};

		const validPosts = posts.filter((post) => {
			const {
				pavadinimas,
				varzybu_data,
				sachmatu_tipas,
				lietuvos_mastu,
				varzybu_vieta,
			} = post.acf || {};
			return (
				varzybu_data &&
				sachmatu_tipas &&
				typeof lietuvos_mastu !== "undefined" &&
				varzybu_vieta
			);
		});

		const events = validPosts
			.map(createEvent)
			.filter((event) => event !== null);

		const calendarElement = document.getElementById("calendar");

		const calendar = new Calendar(calendarElement, {
			plugins: [dayGridPlugin],
			initialView: "dayGridMonth",
			locale: "lt",
			fixedWeekCount: false,
			firstDay: 1,
			buttonText: {
				today: "Šiandien",
			},
			events,
			eventDidMount: function (info) {
				const endDate = new Date(info.event.end);
				const formattedEndDate = endDate.toISOString().split("T")[0];

				tippy(info.el, {
					content: `
						<a href="${info.event.extendedProps.url}" target="_blank">
							<h3 class="turnyro-title underline">${info.event.title}</h3>
						</a>
						<ul class="turnyro-info">
							<li class="turnyro-data">${info.event.extendedProps.varzybu_data}${
								info.event.end ? " - " + formattedEndDate : ""
							}</li>
							<li class="turnyro-tipas ${
								info.event.extendedProps.sachmatu_tipas_formatted
							}">${info.event.extendedProps.sachmatu_tipas}</li>
							<li class="turnyro-vieta">${info.event.extendedProps.varzybu_vieta}</li>
						</ul>
					`,
					allowHTML: true,
					trigger: "click",
					theme: "light-border",
					arrow: roundArrow,
					interactive: true,
					placement: "auto-start",
					animateFill: true,
					sticky: true,
					plugins: [sticky, animateFill],
					popperOptions: {
						strategy: "fixed",
					},
				});
			},
		});

		calendar.render();
	} catch (error) {
		console.error("Error fetching posts:", error);
	}

	// fetch("/wp-json/wp/v2/varzybos?orderby=meta_value&meta_key=varzybu_data&order=desc")
	//     .then(response => response.json())
	//     .then(posts => {

	// 		const validPosts = posts.filter(post => {
	// 			const { pavadinimas, varzybu_data, sachmatu_tipas, lietuvos_mastu, varzybu_vieta } = post.acf || {};
	// 			return varzybu_data && sachmatu_tipas && typeof lietuvos_mastu !== 'undefined' && varzybu_vieta;
	// 		});
	// 		console.log(posts)
	// 		console.log(validPosts)

	//         const lithuanianChars = {
	//             ą: "a", č: "c", ę: "e", ė: "e", į: "i", š: "s", ų: "u", ū: "u", ž: "z",
	//             Ą: "A", Č: "C", Ę: "E", Ė: "E", Į: "I", Š: "S", Ų: "U", Ū: "U", Ž: "Z"
	//         };
	//         const regex = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g;

	//         const formatDate = (dateStr) => {
	// 			if (!dateStr) return null;
	// 			return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
	// 		};

	//         const createEvent = (post) => {
	//             const { pavadinimas, varzybu_data, varzybu_data_iki, sachmatu_tipas, lietuvos_mastu, varzybu_vieta } = post.acf;

	//             const title = pavadinimas || post.title.rendered;
	//             const formattedDate = formatDate(varzybu_data);

	//             let formattedEndDate;
	//             if (varzybu_data_iki) {
	//                 let endDate = new Date(varzybu_data_iki.slice(0, 4), varzybu_data_iki.slice(4, 6) - 1, varzybu_data_iki.slice(6));
	//                 endDate.setDate(endDate.getDate() + 2); // add one day
	//                 formattedEndDate = endDate.toISOString().split("T")[0];
	//             }

	//             let sachmatuTipasLowercase = sachmatu_tipas.toLowerCase().replace(regex, match => lithuanianChars[match] || match);
	//             sachmatuTipasLowercase += lietuvos_mastu ? " red" : " blue";
	//             let eventColor = lietuvos_mastu ? "#f75850" : "#228BE6";

	//             return {
	//                 title,
	//                 start: formattedDate,
	//                 ...(formattedEndDate && { end: formattedEndDate }),
	//                 allDay: true,
	//                 color: eventColor,
	//                 extendedProps: {
	//                     url: post.link,
	//                     varzybu_data: formattedDate,
	//                     varzybu_data_iki: formattedEndDate,
	//                     sachmatu_tipas_formatted: sachmatuTipasLowercase,
	//                     sachmatu_tipas,
	//                     varzybu_vieta
	//                 }
	//             };
	//         };

	//         const events = validPosts.map(createEvent).filter(event => event !== null);
	//         const calendarElement = document.getElementById("calendar");

	//         const calendar = new Calendar(calendarElement, {
	//             plugins: [dayGridPlugin],
	//             initialView: "dayGridMonth",
	//             locale: "lt",
	//             fixedWeekCount: false,
	//             firstDay: 1,
	//             buttonText: {
	//                 today: "Šiandien",
	//             },
	//             events,
	//             eventDidMount: function (info) {
	//                 const endDate = new Date(info.event.end);
	//                 const formattedEndDate = endDate.toISOString().split("T")[0];

	//                 tippy(info.el, {
	//                     content: `
	//                         <a href="${info.event.extendedProps.url}" target="_blank">
	//                             <h3 class="turnyro-title underline">${info.event.title}</h3>
	//                         </a>
	//                         <ul class="turnyro-info">
	//                             <li class="turnyro-data">${info.event.extendedProps.varzybu_data}${info.event.end ? " - " + formattedEndDate : ""}</li>
	//                             <li class="turnyro-tipas ${info.event.extendedProps.sachmatu_tipas_formatted}">${info.event.extendedProps.sachmatu_tipas}</li>
	//                             <li class="turnyro-vieta">${info.event.extendedProps.varzybu_vieta}</li>
	//                         </ul>
	//                     `,
	//                     allowHTML: true,
	//                     trigger: "click",
	//                     theme: "light-border",
	//                     arrow: roundArrow,
	//                     interactive: true,
	//                     placement: "auto-start",
	//                     animateFill: true,
	//                     sticky: true,
	//                     plugins: [sticky, animateFill],
	//                     popperOptions: {
	//                         strategy: "fixed",
	//                     },
	//                 });
	//             },
	//         });

	//         calendar.render();
	//     });
});
