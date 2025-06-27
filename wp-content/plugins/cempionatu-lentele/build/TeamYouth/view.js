/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/TeamYouth/view.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

(function ($) {
  document.addEventListener("DOMContentLoaded", function () {
    let selectedGender = "Boys";
    let selectedCategory = "18";
    function fetchDataAndInitializeTable(gender, age_group) {
      $("#loading").show();
      age_group = Number(age_group);
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/sample/v1/data"
      }).then(data => {
        let response = data.map(yearData => {
          let filteredTournaments = yearData.tournaments.filter(tournament => {
            return tournament.config.format === "Team" && tournament.config.age_group === age_group && (tournament.config.time_control === "Rapid" || tournament.config.time_control === "Blitz") && (gender === "Boys" && (tournament.config.gender == null || tournament.config.gender === "Open") || gender === "Girls" && tournament.config.gender === "Women");
          });
          if (filteredTournaments.length > 0) {
            return filteredTournaments.map(tournament => {
              return {
                ...tournament,
                year: yearData.year
              };
            });
          }
        }).filter(Boolean).flat();
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
              previous: "<"
            }
          },
          columns: [{
            data: "year"
          }, {
            data: null,
            render: function (data, type, row) {
              var _row$rank, _row$location;
              return `<div>${(_row$rank = row.config.rank) !== null && _row$rank !== void 0 ? _row$rank : ""}</div>` + `<div>${(_row$location = row.location) !== null && _row$location !== void 0 ? _row$location : ""}</div>` + "<div>" + row.date_start + (row.date_start !== row.date_end ? " - " + row.date_end : "") + "</div>";
            }
          }, {
            data: null,
            render: function (data, type, row) {
              let winnersList = "<ul class='winners-list'>";
              let winners = mapWinners(row);
              winners.forEach((winner, index) => {
                let className = index === 0 ? "first-item" : "";
                winnersList += `<details><summary class=${className}>${winner.place}. ${winner.name}</summary>`;
                winnersList += `<ul>`;
                winner.members.forEach(member => {
                  winnersList += `<li>${member}</li>`;
                });
                winnersList += `</ul></details>`;
              });
              winnersList += "</ul>";
              return winnersList;
            }
          }, {
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
            }
          }]
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
      }).catch(error => console.error("Error:", error));
    }
    const genderButton = document.querySelectorAll("[data-gender]");
    const categoryButtons = document.querySelectorAll(".table-btn[data-category]");
    const boysButton = document.querySelector('[data-gender="Boys"]');
    const boysAgeGroupButton = document.querySelector('.age-btn-wrapper.boy [data-category="18"]');
    const girlsAgeGroupButton = document.querySelector('.age-btn-wrapper.girl [data-category="18"]');
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
})();

/******/ })()
;
//# sourceMappingURL=view.js.map