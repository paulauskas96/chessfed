document.addEventListener("DOMContentLoaded", function () {
	// Define the initial category
	let category = "18";
	let timeControl = "Rapid"; // Default time control

	// Function to filter and display the tournaments based on the category
	const displayTournaments = function (category, timeControl) {
		const rows = document.querySelectorAll(".table-info");

		rows.forEach(function (row) {
			if (
				row.dataset.category === category &&
				row.dataset.timeControl === timeControl
			) {
				row.style.display = "grid";
			} else {
				row.style.display = "none";
			}
		});
	};
	// Add event listeners to the buttons
	const categoryButtons = document.querySelectorAll(
		".table-btn[data-category]",
	);
	const timeControlButtons = document.querySelectorAll(
		".table-btn[data-time-control]",
	);

	categoryButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			categoryButtons.forEach(function (btn) {
				btn.classList.remove("active");
			});

			button.classList.add("active");

			if (button.dataset.category) {
				category = button.dataset.category;
			}

			displayTournaments(category, timeControl);
		});
	});

	const rapidAgeGroup = document.querySelector(".age-btn-wrapper.rapid");
	const blitzAgeGroup = document.querySelector(".age-btn-wrapper.blitz");

	timeControlButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			timeControlButtons.forEach(function (btn) {
				btn.classList.remove("active");
			});

			button.classList.add("active");

			if (button.dataset.timeControl === "Rapid") {
				timeControl = button.dataset.timeControl;
				rapidAgeGroup.style.display = "flex";
				blitzAgeGroup.style.display = "none";
			}
			if (button.dataset.timeControl === "Blitz") {
				timeControl = button.dataset.timeControl;
				rapidAgeGroup.style.display = "none";
				blitzAgeGroup.style.display = "flex";
			}

			displayTournaments(category, timeControl);
		});
	});

	// Display the tournaments for the initial category
	displayTournaments(category, timeControl);
});
