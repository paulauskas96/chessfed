/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************************!*\
  !*** ./src/TeamRapidBlitzAdult/view.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

(function ($) {
  document.addEventListener("DOMContentLoaded", function () {
    // Function to initialize the DataTable
    function initializeDataTable(time_control) {
      $("#loading").show();
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/sample/v1/data"
      }).then(data => {
        let response = data.map(yearData => {
          let filteredTournaments = yearData.tournaments.filter(tournament => {
            return tournament.config.format === "Team" && tournament.config.time_control === time_control && tournament.config.age_group === null;
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
        // Initialize DataTable with filteredTournaments
        if ($.fn.DataTable.isDataTable("#myTable")) {
          $("#myTable").DataTable().clear().destroy();
        }
        $("#myTable").DataTable({
          ordering: false,
          lengthChange: false,
          responsive: true,
          data: response,
          language: {
            "zeroRecords": "Įrašų nėra",
            "info": "Puslapis _PAGE_ / _PAGES_",
            "infoEmpty": "Įrašų nėra",
            "infoFiltered": "(iš _MAX_)",
            "search": "Paieška:",
            "paginate": {
              "first": "First",
              "last": "Last",
              "next": ">",
              "previous": "<"
            }
          },
          columns: [{
            data: "year"
          }, {
            data: null,
            render: function (data, type, row) {
              var _row$rank, _row$location;
              return `<div>${(_row$rank = row.rank) !== null && _row$rank !== void 0 ? _row$rank : ""}</div>` + `<div>${(_row$location = row.location) !== null && _row$location !== void 0 ? _row$location : ""}</div>` + "<div>" + row.date_start + (row.date_start !== row.date_end ? " - " + row.date_end : "") + "</div>";
            }
          }, {
            data: "team_winners",
            render: function (data, type, row) {
              let winnersList = "";
              row["team_winners"].forEach((teamWinner, index) => {
                let className = index === 0 ? "first-item" : "";
                winnersList += `<details><summary class=${className}>${teamWinner.place}. ${teamWinner.name}${teamWinner.city ? ` (${teamWinner.city})` : ''}</summary>`;
                winnersList += `<ul>`;
                teamWinner.members.forEach(member => {
                  winnersList += `<li>${member}</li>`;
                });
                winnersList += `</ul></details>`;
              });
              return winnersList;
            }
          }, {
            data: null,
            render: function (data, type, row) {
              let links = "";
              if (row.results_link) {
                links += `<a classname="underline" href="${row.results_link}">Rezultatai</a><br>`;
              }
              if (row.games_link) {
                links += `<a classname="underline" href="${row.games_link}">Partijos</a><br>`;
              }
              if (row.download_link) {
                links += `<a classname="underline" href="${row.download_link}">Atsisiųsti</a><br>`;
              }
              return links;
            }
          }]
        });
        $("#loading").hide();
      }).catch(error => {
        console.error("Error:", error);
        // Hide the loading animation in case of error
        $("#loading").hide();
      });
    }

    // Initialize the DataTable with the 'Std' time_control
    initializeDataTable("Rapid");

    // Add event listeners to the buttons
    document.getElementById("rapidButton").addEventListener("click", function () {
      initializeDataTable("Rapid");
      this.classList.add("active");
      document.getElementById("blitzButton").classList.remove("active");
    });
    document.getElementById("blitzButton").addEventListener("click", function () {
      initializeDataTable("Blitz");
      this.classList.add("active");
      document.getElementById("rapidButton").classList.remove("active");
    });
  });
})(jQuery);
}();
/******/ })()
;
//# sourceMappingURL=view.js.map