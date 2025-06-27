import apiFetch from "@wordpress/api-fetch";

(function ($) {
	document.addEventListener("DOMContentLoaded", function () {
		// Function to initialize the DataTable
		function initializeDataTable(time_control) {
			$("#loading").show();

			apiFetch({ path: "/sample/v1/data" })
				.then((data) => {
					let response = data
						.map((yearData) => {
							let filteredTournaments = yearData.tournaments.filter(
								(tournament) => {
									return (
										tournament.config.format === "Team" &&
										tournament.config.time_control === time_control &&
										tournament.config.age_group === null
									);
								},
							);
							if (filteredTournaments.length > 0) {
								return filteredTournaments.map((tournament) => {
									return {
										...tournament,
										year: yearData.year,
									};
								});
							}
						})
						.filter(Boolean)
						.flat();
					// Initialize DataTable with filteredTournaments
					if ($.fn.DataTable.isDataTable("#myTable")) {
						$("#myTable").DataTable().clear().destroy();
					}
					$("#myTable").DataTable({
						ordering: false,
						lengthChange: false,
						responsive: true,
						data: response,
						language: {
							"zeroRecords": "Įrašų nėra",
							"info": "Puslapis _PAGE_ / _PAGES_",
							"infoEmpty": "Įrašų nėra",
							"infoFiltered": "(iš _MAX_)",
							"search":         "Paieška:",
							"paginate": {
								"first":      "First",
								"last":       "Last",
								"next":       ">",
								"previous":   "<"
							},
						},
						columns: [
							{ data: "year" },
							{
								data: null,
								render: function (data, type, row) {
									return (
										`<div>${row.rank?? ""}</div>` +
										`<div>${row.location?? ""}</div>` +
										"<div>" +
										row.date_start +
										(row.date_start !== row.date_end ? " - " + row.date_end : "") +
										"</div>"
									);
								},
							},
							{
								data: "team_winners",
								render: function (data, type, row) {
									let winnersList = "";
									row["team_winners"].forEach((teamWinner, index) => {
										let className = index === 0 ? "first-item" : "";
										winnersList += `<details><summary class=${className}>${teamWinner.place}. ${teamWinner.name}${teamWinner.city ? ` (${teamWinner.city})` : ''}</summary>`;
										winnersList += `<ul>`;
										teamWinner.members.forEach((member) => {
											winnersList += `<li>${member}</li>`;
										});
										winnersList += `</ul></details>`;
									});
									return winnersList;
								},
							},
							{
								data: null,
								render: function (data, type, row) {
									let links = "";
									if (row.results_link) {
										links += `<a classname="underline" href="${row.results_link}">Rezultatai</a><br>`;
									}
									if (row.games_link) {
										links += `<a classname="underline" href="${row.games_link}">Partijos</a><br>`;
									}
									if (row.download_link) {
										links += `<a classname="underline" href="${row.download_link}">Atsisiųsti</a><br>`;
									}
									return links;
								},
							},
						],
					});
					$("#loading").hide();
				})
				.catch((error) => {
					console.error("Error:", error);
					// Hide the loading animation in case of error
					$("#loading").hide();
				});
		}

		// Initialize the DataTable with the 'Std' time_control
		initializeDataTable("Rapid");

		// Add event listeners to the buttons
		document
			.getElementById("rapidButton")
			.addEventListener("click", function () {
				initializeDataTable("Rapid");
				this.classList.add("active");
				document.getElementById("blitzButton").classList.remove("active");
			});

		document
			.getElementById("blitzButton")
			.addEventListener("click", function () {
				initializeDataTable("Blitz");
				this.classList.add("active");
				document.getElementById("rapidButton").classList.remove("active");
			});
	});
})(jQuery);
