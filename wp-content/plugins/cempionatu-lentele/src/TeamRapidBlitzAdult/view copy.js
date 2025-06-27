document.addEventListener("DOMContentLoaded", function () {
	// Define the initial category
	let timeControl = "Rapid"; // Default time control

	// Function to filter and display the tournaments based on the category
	const displayTournaments = function (timeControl) {
		const rows = document.querySelectorAll(".table-info");

		rows.forEach(function (row) {
			if (
				row.dataset.category == null &&
				row.dataset.timeControl === timeControl &&
				row.dataset.format === "Team"
			) {
				row.style.display = "grid";
			} else {
				row.style.display = "none";
			}
		});
	};
	// Add event listeners to the buttons
	const timeControlButtons = document.querySelectorAll(
		".table-btn[data-time-control]",
	);

	timeControlButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			timeControlButtons.forEach(function (btn) {
				btn.classList.remove("active");
			});

			button.classList.add("active");

			if (button.dataset.timeControl === "Rapid") {
				timeControl = button.dataset.timeControl;
			}

			if (button.dataset.timeControl === "Blitz") {
				timeControl = button.dataset.timeControl;
			}

			displayTournaments(timeControl);
		});
	});

	// Display the tournaments for the initial category
	displayTournaments(timeControl);
});
