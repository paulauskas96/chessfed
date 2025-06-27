import apiFetch from "@wordpress/api-fetch";

(function ($) {
	document.addEventListener("DOMContentLoaded", function () {
		$("#loading").show();
		apiFetch({ path: "/sample/v1/data" })
			.then((data) => {
				let response = data
					.map((yearData) => {
						let filteredTournaments = yearData.tournaments.filter(
							(tournament) => {
								return (
									tournament.config.format === "Individual" &&
									tournament.config.age_group === null &&
									tournament.config.time_control != "Std"
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

				// Function to initialize the DataTable
				function initializeDataTable(time_control) {
					$("#loading").show();
					$("#myTable").DataTable().clear().destroy();
					$("#myTable").DataTable({
						language: {
							zeroRecords: "Įrašų nėra",
							info: "Puslapis _PAGE_ / _PAGES_",
							infoEmpty: "Įrašų nėra",
							infoFiltered: "(iš _MAX_)",
							search: "Paieška:",
							paginate: {
								first: "First",
								last: "Last",
								next: ">",
								previous: "<",
							},
						},
						ordering: false,
						lengthChange: false,
						responsive: true,
						data: response.filter(
							(tournament) => tournament.config.time_control === time_control,
						),
						columns: [
							{ data: "year" },
							{
								data: null,
								render: function (data, type, row) {
									return (
										`<div>${row.config.rank ?? ""}</div>` +
										`<div>${row.location ?? ""}</div>` +
										"<div>" +
										row.date_start +
										(row.date_start !== row.date_end
											? " - " + row.date_end
											: "") +
										"</div>"
									);
								},
							},
							{
								data: null,
								render: function (data, type, row) {
									let winnersList = "<ul class='winners-list'>";
									if (row.winners) {
										row.winners.forEach((winner, index) => {
											let className = "";
											if (index === 0) {
												className = "first-item";
											}
											winnersList += `<li class="${className}">${winner.place}. ${winner.name} (${winner.rating})</li>`;
										});
									}
									if (row.winners) {
										if (row.ltu_winners) {
											winnersList +=
												'<li class="extra-text">Tarp lietuvių:</li>';

											row.ltu_winners.forEach((winner, index) => {
												let className = "";
												if (index === 0) {
													className = "first-item";
												}
												winnersList += `<li class=${className}>${winner.place}. ${winner.name} (${winner.rating})</li>`;
											});
										}
									}
									winnersList += "</ul>";
									return winnersList;
								},
							},
							{
								data: null,
								render: function (data, type, row) {
									let winnersList = "<ul class='winners-list'>";
									if (row.women_winners) {
										row.women_winners.forEach((winner, index) => {
											let className = index === 0 ? "first-item" : "";
											winnersList += `<li class=${className}>${winner.place}. ${winner.name} (${winner.rating})</li>`;
										});
									}
									if (row.women_winners) {
										if (row.ltu_women_winners) {
											winnersList +=
												'<li class="extra-text">Tarp lietuvių</li>';

											row.ltu_women_winners.forEach((winner, index) => {
												let className = index === 0 ? "first-item" : "";
												winnersList += `<li class=${className}>${winner.place}. ${winner.name} (${winner.rating})</li>`;
											});
										}
									}
									winnersList += "</ul>";
									return winnersList;
								},
							},
							{
								data: null,
								render: function (data, type, row) {
									let links = "";
									if (row.results_link) {
										links += `<a classname="underline" href="${row.results_link}" target="_blank">Rezultatai</a><br>`;
									}
									if (row.games_link) {
										links += `<a classname="underline" href="${row.games_link}" target="_blank">Partijos</a><br>`;
									}
									if (row.download_link) {
										links += `<a classname="underline" href="${row.download_link}" target="_blank">Atsisiųsti</a><br>`;
									}
									return links;
								},
							},
						],
					});
					$("#loading").hide();
				}
				// Initialize the DataTable with the 'winners' array and 'Rapid' time_control
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
			})
			.catch((error) => {
				console.error("Error:", error);
				// Hide the loading animation in case of error
			});
	});
})(jQuery);
