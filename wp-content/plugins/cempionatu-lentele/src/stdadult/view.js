import apiFetch from "@wordpress/api-fetch";

(function ($) {
    function fetchDataByGender(gender) {
        $("#loading").show();
        apiFetch({ path: "/sample/v1/data" })
            .then((data) => {
                let response = data
                    .map((yearData) => {
                        let filteredTournaments = yearData.tournaments.filter(
                            (tournament) => {
                                return (
                                    tournament.config.format === "Individual" &&
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
                
                function initializeDataTable(winners) {
                    $("#loading").show();
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
								data: winners,
								render: function (data, type, row) {
									let winnersList = "<ul class='winners-list'>";
									data.forEach((winner, index) => {
										let className = index === 0 ? "first-item" : "";
										winnersList += `<li class="${className}">${winner.place}. ${winner.name}${winner.rating ? ` (${winner.rating})` : ''}</li>`;
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
                    $("#loading").hide(); // Hide the loading animation
                }

                initializeDataTable(gender === "Male" ? "winners" : "winners");
            })
            .catch((error) => console.error("Error:", error));
    }

    // Call the function with the initial gender value
    fetchDataByGender("Male");

    document.getElementById("maleButton").addEventListener("click", function () {
        fetchDataByGender("Male");
        this.classList.add("active");
        document.getElementById("femaleButton").classList.remove("active");
    });

    document.getElementById("femaleButton").addEventListener("click", function () {
        fetchDataByGender("Female");
        this.classList.add("active");
        document.getElementById("maleButton").classList.remove("active");
    });

})(jQuery);