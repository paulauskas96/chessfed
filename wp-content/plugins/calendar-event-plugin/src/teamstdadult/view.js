import apiFetch from "@wordpress/api-fetch";

(function ($) {
	document.addEventListener("DOMContentLoaded", function () {
		// Function to fetch and display the tournaments based on the gender and time control
		function fetchAndDisplayTournaments(gender) {
			$("#loading").show();

			apiFetch({ path: "/sample/v1/data" })
				.then((data) => {
					let response = data
						.map((yearData) => {
							let filteredTournaments = yearData.tournaments.filter(
								(tournament) => {
									return (
										tournament.config.format === "Team" &&
										tournament.config.time_control === "Std" &&
										tournament.config.age_group === null &&
										((gender === "Male" &&
											(tournament.config.gender == null ||
												tournament.config.gender === "Open")) ||
											(gender === "Female" &&
												tournament.config.gender === "Women"))
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
					function initializeDataTable(winners) {
						if ($.fn.DataTable.isDataTable("#myTable")) {
							$("#myTable").DataTable().clear().destroy();
						}
						$("#myTable").DataTable({
							ordering: false,
							lengthChange: false,
							responsive: true,
							data: response,
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
							columns: [
								{
									data: "year",
								},
								{
									data: null,
									render: function (data, type, row) {
										let winnersList = "";
										if (row[winners]) {
											winnersList += `<h4> ${row.location ?? ""} </h4>`;
											row[winners].forEach((winner, index) => {
												let className = index === 0 ? "first-item" : "";
												winnersList += `
													<details>
														<summary class="${className}">${winner.place}. ${winner.name}${
															winner.city ? ` (${winner.city})` : ""
														}</summary>
														<ul>`;
												winner.members.forEach((member) => {
													winnersList += `<li>${member}</li>`;
												});
												winnersList += `
														</ul>
													</details>`;
											});
										}
										return winnersList;
									},
								},
								{
									data: null,
									render: function (data, type, row) {
										let links = "";
										if (row.results_link) {
											links += `<a classname="underline" href="${row.results_link} target="_blank"">Rezultatai</a><br>`;
										}
										if (row.games_link) {
											links += `<a classname="underline" href="${row.games_link} target="_blank"">Partijos</a><br>`;
										}
										if (row.download_link) {
											links += `<a classname="underline" href="${row.download_link} target="_blank"">Atsisųsti</a><br>`;
										}
										return links;
									},
								},
							],
						});
					}
					$("#loading").hide();
					// Initialize the DataTable with the 'winners' array
					initializeDataTable(
						gender === "Male" ? "team_winners" : "team_winners",
					);
				})
				.catch((error) => {
					console.error("Error:", error);
					// Hide the loading animation in case of error
					$("#loading").hide();
				});
		}

		// Fetch and display the tournaments for the initial gender and time control
		fetchAndDisplayTournaments("Male");

		// Add event listeners to the buttons
		document
			.getElementById("maleButton")
			.addEventListener("click", function () {
				fetchAndDisplayTournaments("Male");
				this.classList.add("active");
				document.getElementById("femaleButton").classList.remove("active");
			});

		document
			.getElementById("femaleButton")
			.addEventListener("click", function () {
				fetchAndDisplayTournaments("Female");
				this.classList.add("active");
				document.getElementById("maleButton").classList.remove("active");
			});
	});
})(jQuery);
