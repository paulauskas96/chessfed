document.addEventListener("DOMContentLoaded", function () {
	// Define the initial category
	let category = "18";
	let gender = "Boys";

	// Function to filter and display the tournaments based on the category
	const displayTournaments = function (category, gender) {
		const rows = document.querySelectorAll(".table-info");

		rows.forEach(function (row) {
			if (
				row.dataset.category === category &&
				row.dataset.timeControl === "Std"
			) {
				row.style.display = "grid";
			} else {
				row.style.display = "none";
			}
		});

		const boyRows = document.querySelectorAll(".boys");
		const girlRows = document.querySelectorAll(".girls");

		const boysAgeGroup = document.querySelector(".age-btn-wrapper.boy");
		const girlsAgeGroup = document.querySelector(".age-btn-wrapper.girl");

		if (gender === "Boys") {
			boysAgeGroup.style.display = "flex";
			girlsAgeGroup.style.display = "none";

			boyRows.forEach(function (row) {
				row.style.display = "grid";
			});
			girlRows.forEach(function (row) {
				row.style.display = "none";
			});
		}
		if (gender === "Girls") {
			boysAgeGroup.style.display = "none";
			girlsAgeGroup.style.display = "flex";

			boyRows.forEach(function (row) {
				row.style.display = "none";
			});
			girlRows.forEach(function (row) {
				row.style.display = "grid";
			});
		}
	};
	// Add event listeners to the buttons
	const genderButtons = document.querySelectorAll("[data-gender]");
	const categoryButtons = document.querySelectorAll(
		".table-btn[data-category]",
	);

	const boysButton = document.querySelector('[data-gender="Boys"]');

	boysButton.classList.add("active");

	genderButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			genderButtons.forEach(function (btn) {
				btn.classList.remove("active");
			});

			button.classList.add("active");

			if (button.dataset.gender) {
				gender = button.dataset.gender;
			}

			displayTournaments(category, gender);
		});
	});

	categoryButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			categoryButtons.forEach(function (btn) {
				btn.classList.remove("active");
			});

			button.classList.add("active");

			if (button.dataset.category) {
				category = button.dataset.category;
			}

			displayTournaments(category, gender);
		});
	});

	// Display the tournaments for the initial category
	displayTournaments(category, gender);
});
