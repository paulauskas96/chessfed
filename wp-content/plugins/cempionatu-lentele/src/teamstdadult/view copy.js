document.addEventListener("DOMContentLoaded", function () {

	// Define the initial category
	let gender = "Male";

	// Function to filter and display the tournaments based on the category
	const displayTournaments = function (gender) {
		const rows = document.querySelectorAll(".table-info");
		rows.forEach(function (row) {
			if (gender === "Male") {
				if (
					row.dataset.category == null &&
					row.dataset.timeControl === "Std" &&
					row.dataset.format === "Team" &&
					(row.dataset.gender == null || row.dataset.gender === "Open")
				) {
					row.style.display = "grid";
				} else {
					row.style.display = "none";
				}
			} else {
				row.style.display = "none";
			}
		});

		const rowsW = document.querySelectorAll(".table-info.women");

		rowsW.forEach(function (row) {
			if (gender === "Female") {
				if (
					row.dataset.category == null &&
					row.dataset.timeControl === "Std" &&
					row.dataset.format === "Team" &&
					row.dataset.gender === "Women"
				) {
					row.style.display = "grid";
				} else {
					row.style.display = "none";
				}
			} else {
				row.style.display = "none";
			}
		});

		const boyRows = document.querySelectorAll(".boys");
		const girlRows = document.querySelectorAll(".girls");

		if (gender === "Male") {
			boyRows.forEach(function (row) {
				row.style.display = "grid";
			});
			girlRows.forEach(function (row) {
				row.style.display = "none";
			});
		}
		if (gender === "Female") {
			boyRows.forEach(function (row) {
				row.style.display = "none";
			});
			girlRows.forEach(function (row) {
				row.style.display = "grid";
			});
		}
	};
	// Add event listeners to the buttons
	const genderButtons = document.querySelectorAll(".table-btn[data-gender]");

	const MaleButton = document.querySelector('[data-gender="Male"]');

	MaleButton.classList.add("active");

	genderButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			genderButtons.forEach(function (btn) {
				btn.classList.remove("active");
			});

			button.classList.add("active");

			if (button.dataset.gender) {
				gender = button.dataset.gender;
			}

			displayTournaments(gender);
		});
	});

	// Display the tournaments for the initial category
	displayTournaments(gender);
});
