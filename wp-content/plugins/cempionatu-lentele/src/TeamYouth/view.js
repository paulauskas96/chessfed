import apiFetch from "@wordpress/api-fetch";

(function ($) {
	document.addEventListener("DOMContentLoaded", function () {
		let selectedGender = "Boys";
		let selectedCategory = "18";

		function fetchDataAndInitializeTable(gender, age_group) {
			$("#loading").show();
			age_group = Number(age_group);
			apiFetch({ path: "/sample/v1/data" })
				.then((data) => {
					let response = data
						.map((yearData) => {
							let filteredTournaments = yearData.tournaments.filter(
								(tournament) => {
									return (
										tournament.config.format === "Team" &&
										tournament.config.age_group === age_group &&
										(tournament.config.time_control === "Rapid" ||
											tournament.config.time_control === "Blitz") &&
										((gender === "Boys" &&
											(tournament.config.gender == null ||
												tournament.config.gender === "Open")) ||
											(gender === "Girls" &&
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
					console.log(response, age_group);
					// Function to map winners based on selected gender
					function mapWinners(row) {
						if (gender === "Boys") {
							return row.team_winners || [];
						} else if (gender === "Girls") {
							return row.team_winners || [];
						}
						return [];
					}

					// Function to initialize the DataTable
					$("#myTable").DataTable().clear().destroy();
					$("#myTable").DataTable({
						ordering: false,
						lengthChange: false,
						responsive: true,
						autoWidth: false,
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
							{ data: "year" },
							{
								data: null,
								render: function (data, type, row) {
									return (
										`<div>${row.config.rank?? ""}</div>` +
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
									let winners = mapWinners(row);
									winners.forEach((winner, index) => {
										let className = index === 0 ? "first-item" : "";
										winnersList += `<details><summary class=${className}>${winner.place}. ${winner.name}</summary>`;
										winnersList += `<ul>`;
										winner.members.forEach((member) => {
											winnersList += `<li>${member}</li>`;
										});
										winnersList += `</ul></details>`;
									});
									winnersList += "</ul>";
									return winnersList;
								},
							},
							{
								data: null,
								render: function (data, type, row) {
									let links = "";
									if (row.results_link) {
										links += `<a class="underline" href="${row.results_link}" target="_blank">Rezultatai</a><br>`;
									}
									if (row.games_link) {
										links += `<a class="underline" href="${row.games_link} target="_blank">Partijos</a><br>`;
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

					if (selectedGender === "Boys") {
						boysAgeGroup.style.display = "flex";
						girlsAgeGroup.style.display = "none";
					}
					if (selectedGender === "Girls") {
						boysAgeGroup.style.display = "none";
						girlsAgeGroup.style.display = "flex";
					}
					$("#loading").hide(); // Hide the loading animation
				})
				.catch((error) => console.error("Error:", error));
		}

		const genderButton = document.querySelectorAll("[data-gender]");
		const categoryButtons = document.querySelectorAll(
			".table-btn[data-category]",
		);

		const boysButton = document.querySelector('[data-gender="Boys"]');

		const boysAgeGroupButton = document.querySelector(
			'.age-btn-wrapper.boy [data-category="18"]',
		);
		const girlsAgeGroupButton = document.querySelector(
			'.age-btn-wrapper.girl [data-category="18"]',
		);

		boysButton.classList.add("active");
		boysAgeGroupButton.classList.add("active");

		genderButton.forEach(function (button) {
			button.addEventListener("click", function () {
				genderButton.forEach(function (btn) {
					btn.classList.remove("active");
				});

				button.classList.add("active");

				if (button.dataset.gender) {
					selectedGender = button.dataset.gender;
				}

				if (selectedGender === "Boys") {
					boysAgeGroupButton.classList.add("active");
					girlsAgeGroupButton.classList.remove("active");
					selectedCategory = boysAgeGroupButton.dataset.category;
				} else if (selectedGender === "Girls") {
					girlsAgeGroupButton.classList.add("active");
					boysAgeGroupButton.classList.remove("active");
					selectedCategory = girlsAgeGroupButton.dataset.category;
				}

				fetchDataAndInitializeTable(selectedGender, selectedCategory);
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
					console.log(selectedCategory);
				}
				fetchDataAndInitializeTable(selectedGender, selectedCategory);
			});
		});

		// Initial load
		fetchDataAndInitializeTable(selectedGender, selectedCategory);
	});
})(jQuery);
