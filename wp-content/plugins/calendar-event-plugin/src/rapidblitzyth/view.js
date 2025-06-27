import apiFetch from "@wordpress/api-fetch";

(function ($) {
	document.addEventListener("DOMContentLoaded", function () {
		let selectedTimeControl = "Rapid";
		let selectedCategory = "18";

		function fetchDataAndInitializeTable(time_control, age_group) {
			$("#loading").show();
			age_group = Number(age_group);
			apiFetch({ path: "/sample/v1/data" })
				.then((data) => {
					let response = data
						.map((yearData) => {
							let filteredTournaments = yearData.tournaments.filter(
								(tournament) => {
									return (
										tournament.config.format === "Individual" &&
										tournament.config.time_control === time_control &&
										tournament.config.age_group === age_group
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
					$("#myTable").DataTable().clear().destroy();
					$("#myTable").DataTable({
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
						ordering: false,
						lengthChange: false,
						responsive: true,
						autoWidth: false,
						data: response,
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
								data: null,
								render: function (data, type, row) {
									let winnersList = "<ul class='winners-list'>";
									if (row.winners) {
										row.winners.forEach((winner, index) => {
											let className = "";
											if (index === 0) {
												className = "first-item";
											}
											winnersList += `<li class=${className}>${winner.place}. ${winner.name} (${winner.rating}), ${winner.city}</li>`;
										});
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
											winnersList += `<li class="${className}">${winner.place}. ${winner.name} (${winner.rating}), ${winner.city}</li>`;
										});
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
										links += `<a class="underline" href="${row.results_link}">Rezultatai</a><br>`;
									}
									if (row.games_link) {
										links += `<a class="underline" href="${row.games_link}">Partijos</a><br>`;
									}
									if (row.download_link) {
										links += `<a class="underline" href="${row.download_link}">Atsisiųsti</a><br>`;
									}
									return links;
								},
							},
						],
					});
					const boysAgeGroup = document.querySelector(".age-btn-wrapper.boy");
					const girlsAgeGroup = document.querySelector(".age-btn-wrapper.girl");

					if (selectedTimeControl === "Rapid") {
						boysAgeGroup.style.display = "flex";
						girlsAgeGroup.style.display = "none";
					}
					if (selectedTimeControl === "Blitz") {
						boysAgeGroup.style.display = "none";
						girlsAgeGroup.style.display = "flex";
					}
					$("#loading").hide(); // Hide the loading animation
				})
				.catch((error) => console.error("Error:", error));
		}

		const timeControlBtn = document.querySelectorAll("[data-time-control]");
		const categoryButtons = document.querySelectorAll(
			".table-btn[data-category]",
		);

		const boysButton = document.querySelector('[data-time-control="Rapid"]');

		const boysAgeGroupButton = document.querySelector(
			'.age-btn-wrapper.boy [data-category="18"]',
		);
		const girlsAgeGroupButton = document.querySelector(
			'.age-btn-wrapper.girl [data-category="18"]',
		);

		boysButton.classList.add("active");
		boysAgeGroupButton.classList.add("active");

		timeControlBtn.forEach(function (button) {
			button.addEventListener("click", function () {
				timeControlBtn.forEach(function (btn) {
					btn.classList.remove("active");
				});

				button.classList.add("active");

				if (button.dataset.timeControl) {
					selectedTimeControl = button.dataset.timeControl;
				}

				if (selectedTimeControl === "Rapid") {
					boysAgeGroupButton.classList.add("active");
					girlsAgeGroupButton.classList.remove("active");
					selectedCategory = boysAgeGroupButton.dataset.category;
				} else if (selectedTimeControl === "Blitz") {
					girlsAgeGroupButton.classList.add("active");
					boysAgeGroupButton.classList.remove("active");
					selectedCategory = girlsAgeGroupButton.dataset.category;
				}

				fetchDataAndInitializeTable(selectedTimeControl, selectedCategory);
			});
		});

		categoryButtons.forEach(function (button) {
			button.addEventListener("click", function () {
				categoryButtons.forEach(function (btn) {
					btn.classList.remove("active");
				});

				button.classList.add("active");

				if (button.dataset.category) {
					selectedCategory = button.dataset.category;
				}
				fetchDataAndInitializeTable(selectedTimeControl, selectedCategory);
			});
		});

		// Initial load
		fetchDataAndInitializeTable(selectedTimeControl, selectedCategory);
	});
})(jQuery);
