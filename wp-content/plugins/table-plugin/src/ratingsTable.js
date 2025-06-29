// ratingsTable.js
// Shared vanilla JS component for rendering and managing the ratings table and category selection

function renderRatingsTable({
  container = document.getElementById("ratings-table-container"),
  dataUrl = "/wp-content/plugins/table-plugin/PhpScraping/data.json",
  nameMapUrl = "/wp-content/plugins/table-plugin/src/nameMap.json",
  initialCategory = "general",
  initialRatingType = "standard",
  showButtons = true
}) {
  // Helper to fetch JSON
  function fetchJson(url) {
    return fetch(url).then((r) => r.json());
  }

  // Helper to format player name
  function formatPlayerName(playerName, nameMap) {
    const text = playerName.replace(/<[^>]*>/g, "");
    const parts = text.split(",");
    if (parts.length === 2) {
      let surname = parts[0].trim();
      let name = parts[1].trim();
      let fullKey = `${name} ${surname}`;
      if (nameMap[fullKey]) {
        return nameMap[fullKey];
      }
      return `${name} ${surname}`;
    }
    return text;
  }

  // Render table
  function updateTable(newTableData, nameMap) {
    const tableBody = container.querySelector(".table-body");
    tableBody.innerHTML = "";
    const columnOrder = ["nr", "playerTitle", "playerName", "playerRating"];
    newTableData.forEach((rowData) => {
      const row = document.createElement("tr");
      row.className = "table-info";
      columnOrder.forEach((key) => {
        const cellData = rowData[key];
        const cell = document.createElement("td");
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
              const displayName = formatPlayerName(cellData, nameMap);
              const match = cellData.match(/href=\"([^\"]*)\"/);
              if (match) {
                const href = match[1];
                const anchor = document.createElement("a");
                anchor.href = "https://ratings.fide.com" + href;
                anchor.target = "_blank";
                anchor.textContent = displayName;
                cell.appendChild(anchor);
                cell.classList.add("underline");
              } else {
                cell.textContent = displayName;
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
      tableBody.appendChild(row);
    });
  }

  // Render buttons, rating type select, and category select
  function renderControls(categories, currentCategory, currentRatingType) {
    let html = "";
    // Rating type dropdown
    html += '<div class="rating-type-wrapper" style="margin-bottom:8px">';
    html += '<label for="rating-type-select" style="margin-right:8px">Reitingo tipas:</label>';
    html += '<select id="rating-type-select" class="rating-type-select">';
    html += '<option value="standard">Standard</option>';
    html += '<option value="rapid">Rapid</option>';
    html += '<option value="blitz">Blitz</option>';
    html += '</select>';
    html += '</div>';
    if (showButtons) {
      html += '<div class="button-wrapper">';
      html += '<button data-category="general" class="table-btn">Bendras</button>';
      html += '<button data-category="men" class="table-btn">Vyrai</button>';
      html += '<button data-category="female" class="table-btn">Moterys</button>';
      html += '<button data-category="youthU18" class="table-btn youth">Jauniai</button>';
      html += '<div class="youth-btn-wrapper" style="display:none">';
      html += '<button data-category="youthU18" class="table-btn U18">U18</button>';
      html += '<button data-category="youthU14" class="table-btn">U14</button>';
      html += '<button data-category="youthU10" class="table-btn">U10</button>';
      html += '</div>';
      html += '<button data-category="s50" class="table-btn senior">Senjorai</button>';
      html += '<div class="senior-btn-wrapper" style="display:none">';
      html += '<button data-category="s50" class="table-btn S50">S50</button>';
      html += '<button data-category="s65" class="table-btn S65">S65</button>';
      html += '</div>';
      html += '</div>';
      html += '<select id="category-select" class="table-select">';
      html += '<option value="general">Bendras</option>';
      html += '<option value="men">Vyrai</option>';
      html += '<option value="female">Moterys</option>';
      html += '<optgroup label="Jauniai">';
      html += '<option value="youthU18">U18</option>';
      html += '<option value="youthU14">U14</option>';
      html += '<option value="youthU10">U10</option>';
      html += '</optgroup>';
      html += '<optgroup label="Senjorai">';
      html += '<option value="s50">S50</option>';
      html += '<option value="s65">S65</option>';
      html += '</optgroup>';
      html += '</select>';
    }
    html += '<div class="table-wrapper">';
    html += '<table class="rating-table">';
    html += '<thead><tr class="table-heading">';
    html += '<th>Nr.</th><th>Titulas</th><th>Žaidėjas</th><th>Reitingas</th>';
    html += '</tr></thead>';
    html += '<tbody class="table-body"></tbody>';
    html += '</table></div>';
    container.innerHTML = html;
    // Set rating type select value
    const ratingTypeSelect = container.querySelector('#rating-type-select');
    if (ratingTypeSelect) ratingTypeSelect.value = currentRatingType;
  }

  // Main logic
  let currentCategory = initialCategory;
  let currentRatingType = initialRatingType;
  let tableData = {};
  let nameMap = {};

  Promise.all([fetchJson(dataUrl), fetchJson(nameMapUrl)]).then(([data, nMap]) => {
    tableData = data;
    nameMap = nMap;
    // Defensive: fallback to standard if not present
    if (!tableData[currentRatingType]) currentRatingType = 'standard';
    renderControls(Object.keys(tableData[currentRatingType]), currentCategory, currentRatingType);
    updateTable(tableData[currentRatingType][currentCategory], nameMap);
    attachEventListeners();
  });

  function attachEventListeners() {
    // Rating type select logic
    const ratingTypeSelect = container.querySelector('#rating-type-select');
    if (ratingTypeSelect) {
      ratingTypeSelect.value = currentRatingType;
      ratingTypeSelect.onchange = null;
      ratingTypeSelect.addEventListener('change', function () {
        currentRatingType = ratingTypeSelect.value;
        // Defensive: fallback to general if not present
        if (!tableData[currentRatingType][currentCategory]) currentCategory = 'general';
        renderControls(Object.keys(tableData[currentRatingType]), currentCategory, currentRatingType);
        updateTable(tableData[currentRatingType][currentCategory], nameMap);
        attachEventListeners();
      });
    }

    // Button logic
    const buttons = container.querySelectorAll(".table-btn");
    const youthBtnWrapper = container.querySelector(".youth-btn-wrapper");
    const youthBtn = container.querySelector('[data-category="youthU18"]');
    const youthU18Btn = container.querySelector(".U18");
    const seniorBtnWrapper = container.querySelector(".senior-btn-wrapper");
    const seniorBtn = container.querySelector('[data-category="s50"].senior');
    const s50Btn = container.querySelector(".S50");
    const generalButton = container.querySelector('[data-category="general"]');
    if (generalButton) generalButton.classList.add("active");

    function setActiveButton(category) {
      buttons.forEach((btn) => btn.classList.remove("active"));
      const btn = container.querySelector(`[data-category="${category}"]`);
      if (btn) btn.classList.add("active");

      // Helper to handle group logic
      function handleGroup(group, wrapper, mainBtnClass, subBtnClasses) {
        if (wrapper) {
          wrapper.style.display = group.includes(category) ? "flex" : "none";
        }
        const mainBtn = container.querySelector(mainBtnClass);
        if (mainBtn) {
          if (group.includes(category)) mainBtn.classList.add("active");
          else mainBtn.classList.remove("active");
        }
        subBtnClasses.forEach(sub => {
          const subBtn = container.querySelector(sub.selector);
          if (subBtn) {
            if (category === sub.value) subBtn.classList.add("active");
            else subBtn.classList.remove("active");
          }
        });
      }

      // Youth group
      handleGroup(
        ["youthU18", "youthU14", "youthU10"],
        youthBtnWrapper,
        '[data-category="youthU18"]',
        [
          { selector: ".U18", value: "youthU18" },
          { selector: '[data-category="youthU14"]', value: "youthU14" },
          { selector: '[data-category="youthU10"]', value: "youthU10" }
        ]
      );

      // Senior group
      handleGroup(
        ["s50", "s65"],
        seniorBtnWrapper,
        '[data-category="s50"].senior',
        [
          { selector: ".S50", value: "s50" },
          { selector: ".S65", value: "s65" }
        ]
      );
    }

    buttons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const category = event.target.dataset.category;
        currentCategory = category;
        updateTable(tableData[currentRatingType][category], nameMap);
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
        setActiveButton(category);
      });
    });

    // Select logic
    const categorySelect = container.querySelector("#category-select");
    if (categorySelect) {
      categorySelect.value = currentCategory;
      categorySelect.onchange = null;
      categorySelect.addEventListener("change", function () {
        const selectedCategory = categorySelect.value;
        currentCategory = selectedCategory;
        renderControls(Object.keys(tableData[currentRatingType]), currentCategory, currentRatingType);
        updateTable(tableData[currentRatingType][selectedCategory], nameMap);
        attachEventListeners();
        setActiveButton(currentCategory); // Restore active button after re-render (including subcategories)
      });
    }

    // Restore active button after initial attach (including subcategories)
    setActiveButton(currentCategory);
  }
  attachEventListeners();
}

// Auto-initiate the ratings table if the container exists in the DOM
if (typeof window !== 'undefined') {
  document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById("ratings-table-container");
    if (container) {
      renderRatingsTable({
        container: container
      });
    }
  });
}
