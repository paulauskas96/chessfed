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
/*!******************************!*\
  !*** ./src/stdadult/view.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

(function ($) {
  function fetchDataByGender(gender) {
    $("#loading").show();
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: "/sample/v1/data"
    }).then(data => {
      let response = data.map(yearData => {
        let filteredTournaments = yearData.tournaments.filter(tournament => {
          return tournament.config.format === "Individual" && tournament.config.time_control === "Std" && tournament.config.age_group === null && (gender === "Male" && (tournament.config.gender == null || tournament.config.gender === "Open") || gender === "Female" && tournament.config.gender === "Women");
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
      function initializeDataTable(winners) {
        $("#loading").show();
        $("#myTable").DataTable().clear().destroy();
        $("#myTable").DataTable({
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
          ordering: false,
          lengthChange: false,
          responsive: true,
          autoWidth: false,
          data: response,
          columns: [{
            data: "year"
          }, {
            data: null,
            render: function (data, type, row) {
              var _row$config$rank, _row$location;
              return `<div>${(_row$config$rank = row.config.rank) !== null && _row$config$rank !== void 0 ? _row$config$rank : ""}</div>` + `<div>${(_row$location = row.location) !== null && _row$location !== void 0 ? _row$location : ""}</div>` + "<div>" + row.date_start + (row.date_start !== row.date_end ? " - " + row.date_end : "") + "</div>";
            }
          }, {
            data: winners,
            render: function (data, type, row) {
              let winnersList = "<ul class='winners-list'>";
              data.forEach((winner, index) => {
                let className = index === 0 ? "first-item" : "";
                winnersList += `<li class="${className}">${winner.place}. ${winner.name}${winner.rating ? ` (${winner.rating})` : ''}</li>`;
              });
              winnersList += "</ul>";
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
        $("#loading").hide(); // Hide the loading animation
      }

      initializeDataTable(gender === "Male" ? "winners" : "winners");
    }).catch(error => console.error("Error:", error));
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
})();

/******/ })()
;
//# sourceMappingURL=view.js.map