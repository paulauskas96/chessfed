document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll(".table-btn");
	const youthBtnWrapper = document.querySelector(".youth-btn-wrapper");
	const youthBtn = document.querySelector('[data-category="youthU18"]');
	const youthU18Btn = document.querySelector(".U18");
	const seniorBtnWrapper = document.querySelector(".senior-btn-wrapper");
	const seniorBtn = document.querySelector('[data-category="s50"].senior');
	const s50Btn = document.querySelector(".S50");

	if (youthBtnWrapper) {
		youthBtnWrapper.style.display = "none";
	}
	if (seniorBtnWrapper) {
		seniorBtnWrapper.style.display = "none";
	}

	const generalButton = document.querySelector('[data-category="general"]');

	if (generalButton) {
		generalButton.classList.add("active");
	}

	buttons.forEach((button) => {
		button.addEventListener("click", function (event) {
			event.preventDefault();

			// Get the category from the button's data attribute
			const category = event.target.dataset.category;
			// Fetch the new table data from data.json
			fetch("/wp-content/plugins/table-plugin/PhpScraping/data.json")
				.then((response) => response.json())
				.then((data) => {
					// Get the new table data for the clicked category
					const newTableData = data[category];
					// Update the table on the frontend
					updateTable(newTableData);
				});
			// Youth group toggle
			if (["youthU18", "youthU14", "youthU10"].includes(category)) {
				if (youthBtnWrapper) youthBtnWrapper.style.display = "flex";
			} else {
				if (youthBtnWrapper) youthBtnWrapper.style.display = "none";
			}

			// Senior group toggle
			if (["s50", "s65"].includes(category)) {
				if (seniorBtnWrapper) seniorBtnWrapper.style.display = "flex";
			} else {
				if (seniorBtnWrapper) seniorBtnWrapper.style.display = "none";
			}

			buttons.forEach((btn) => {
				btn.classList.remove("active");
			});
			event.target.classList.add("active");

			// Youth active state
			if (youthBtn) {
				if (["youthU18", "youthU14", "youthU10"].includes(category)) {
					youthBtn.classList.add("active");
				} else {
					youthBtn.classList.remove("active");
				}
			}
			if (event.target.classList.contains("youth") && youthU18Btn) {
				youthU18Btn.classList.add("active");
			}

			// Senior active state
			if (seniorBtn) {
				if (["s50", "s65"].includes(category)) {
					seniorBtn.classList.add("active");
				} else {
					seniorBtn.classList.remove("active");
				}
			}
			if (event.target.classList.contains("senior") && s50Btn) {
				s50Btn.classList.add("active");
			}
		});
	});

	// Get the select element
	const categorySelect = document.getElementById("category-select");

	// Add an event listener to handle the selection
	if (categorySelect) {
		categorySelect.addEventListener("change", function () {
			const selectedCategory = categorySelect.value;
			// Fetch and update the table based on the selected category
			fetch("/wp-content/plugins/table-plugin/PhpScraping/data.json")
				.then((response) => response.json())
				.then((data) => {
					const newTableData = data[selectedCategory];
					updateTable(newTableData);
				});
		});
	}
});
function updateTable(newTableData) {
	// Get the table body element

	const tableBody = document.querySelector(".table-body");
	// Clear the current table data
	tableBody.innerHTML = "";
	// Define the order of the columns
	const columnOrder = ["nr", "playerTitle", "playerName", "playerRating"];
	newTableData.forEach((rowData) => {
		const row = document.createElement("tr");
		row.className = "table-info";
		columnOrder.forEach((key) => {
			const cellData = rowData[key];
			const cell = document.createElement("td");
			// Add class to each cell based on its position in the row
			switch (columnOrder.indexOf(key)) {
				case 0:
					cell.className = "playerNr";
					cell.textContent = cellData;
					break;
				case 1:
					cell.className = "playerTitle";
					cell.textContent = cellData;
					break;
				case 2:
					cell.className = "playerName";
					if (key === "playerName") {
						// Use a regular expression to extract the anchor tag's href attribute
						const match = cellData.match(/href="([^"]*)"/);
						if (match) {
							const href = match[1];
							// Create an anchor tag and set its href attribute
							const anchor = document.createElement("a");
							anchor.href = "https://ratings.fide.com" + href;
							anchor.target = "_blank";
							// Set the innerHTML to preserve the anchor tag
							anchor.textContent = cellData.replace(/<[^>]*>/g, ""); // Remove HTML tags
							cell.appendChild(anchor);
							cell.classList.add("underline");
						} else {
							cell.textContent = cellData;
						}
					}
					break;
				case 3:
					cell.className = "playerRating";
					cell.textContent = cellData;
					break;
			}
			row.appendChild(cell);
		});
		// Add the row to the table body
		tableBody.appendChild(row);
	});
}
