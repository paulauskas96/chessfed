/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/rapidblitzyth/edit.js":
/*!***********************************!*\
  !*** ./src/rapidblitzyth/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/rapidblitzyth/editor.scss");






function Edit({
  attributes,
  setAttributes
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const [category, setCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)("18"); // Default category
  const [timeControl, setTimeControl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)("Rapid"); // Default time control
  const [showRapidAgeGroups, setShowRapidAgeGroups] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
  const [showBlitzAgeGroups, setShowBlitzAgeGroups] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const fetchData = async () => {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: "/sample/v1/data"
      });
      const newAttributes = response.map(item => ({
        year: item.year,
        tournaments: item.tournaments
      }));
      setAttributes({
        attributes: newAttributes
      });
    };
    fetchData();
  }, [setAttributes]); // dependencies

  const tournamentData = attributes.attributes;
  const handleAgeGroupButtonClick = ageGroup => {
    setCategory(ageGroup);
  };
  const handleTimeControlButtonClick = selectedTimeControl => {
    setTimeControl(selectedTimeControl);
    if (selectedTimeControl === "Rapid") {
      setShowRapidAgeGroups(true);
      setShowBlitzAgeGroups(false);
    }
    if (selectedTimeControl === "Blitz") {
      setShowBlitzAgeGroups(true);
      setShowRapidAgeGroups(false);
    }
  };
  // Display the data in the editor
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "button-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleTimeControlButtonClick("Rapid"),
    className: timeControl === "Rapid" ? "active" : ""
  }, "Greitieji"), showRapidAgeGroups && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "age-btn-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("18"),
    className: category === "18" ? "active" : ""
  }, "U18"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("16"),
    className: category === "16" ? "active" : ""
  }, "U16"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("14"),
    className: category === "14" ? "active" : ""
  }, "U14"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("12"),
    className: category === "12" ? "active" : ""
  }, "U12"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("10"),
    className: category === "10" ? "active" : ""
  }, "U10"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("8"),
    className: category === "8" ? "active" : ""
  }, "U8")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleTimeControlButtonClick("Blitz"),
    className: timeControl === "Blitz" ? "active" : ""
  }, "\u017Daibo"), showBlitzAgeGroups && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "age-btn-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("18"),
    className: category === "18" ? "active" : ""
  }, "U18"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("16"),
    className: category === "16" ? "active" : ""
  }, "U16"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("14"),
    className: category === "14" ? "active" : ""
  }, "U14"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("12"),
    className: category === "12" ? "active" : ""
  }, "U12"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("10"),
    className: category === "10" ? "active" : ""
  }, "U10"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleAgeGroupButtonClick("8"),
    className: category === "8" ? "active" : ""
  }, "U8"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "table-heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Metai"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Vieta ir laikas"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Vaikin\u0173 \u012Fskaita"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Mergin\u0173 \u012Fskaita"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Rezultatai"))), tournamentData && tournamentData.map(attribute => {
    const filteredTournaments = attribute.tournaments.filter(tournament => {
      return (
        // filtruojam turnyrus palei amziaus grupe ir std kategorija
        tournament.config.age_group === parseInt(category) && tournament.config.time_control === timeControl
      );
    });
    // Check if there are tournaments for the selected category
    if (filteredTournaments.length > 0) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", {
        className: "table-body",
        key: attribute.name
      }, filteredTournaments.map(tournament => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
        className: "table-info",
        key: tournament.name
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, attribute.year), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "Miestas ir laikas"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        className: "winner-row boys"
      }, tournament.winners && tournament.winners.map(winner => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        key: winner.place
      }, winner.place, ". ", winner.name, " (", winner.rating, ")", " "))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        className: "winner-row girls"
      }, tournament.female_winners && tournament.female_winners.map(femaleWinner => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        key: femaleWinner.place
      }, femaleWinner.place, ". ", femaleWinner.name, " (", femaleWinner.rating, ")", " "))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        className: "underline"
      }, tournament.results_link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: tournament.results_link.replace(/"/g, ""),
        target: "_blank",
        rel: "noopener"
      }, "Rezultatai"), tournament.games_link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: tournament.games_link.replace(/"/g, ""),
        target: "_blank",
        rel: "noopener"
      }, "Partijos"), tournament.download_link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: tournament.download_link.replace(/"/g, ""),
        target: "_blank",
        rel: "noopener"
      }, "Atsisi\u0173sti")))));
    }
    return null; // Don't render empty tables
  })));
}

/***/ }),

/***/ "./src/rapidblitzyth/index.js":
/*!************************************!*\
  !*** ./src/rapidblitzyth/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/rapidblitzyth/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/rapidblitzyth/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/rapidblitzyth/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/rapidblitzyth/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/rapidblitzyth/save.js":
/*!***********************************!*\
  !*** ./src/rapidblitzyth/save.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/rapidblitzyth/style.scss");



function Save({
  attributes
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  const tournamentData = attributes.attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "button-wrapper filter-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rapid-btn-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "rapidButton",
    className: "table-btn",
    "data-time-control": "Rapid"
  }, "Greitieji"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "age-btn-wrapper boy"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn active",
    "data-category": "18"
  }, "U18"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "16"
  }, "U16"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "14"
  }, "U14"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "12"
  }, "U12"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "10"
  }, "U10"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "8"
  }, "U8"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blitz-btn-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "blitzButton",
    className: "table-btn",
    "data-time-control": "Blitz"
  }, "\u017Daibo"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "age-btn-wrapper girl"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn active",
    "data-category": "18"
  }, "U18"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "16"
  }, "U16"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "14"
  }, "U14"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "12"
  }, "U12"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "10"
  }, "U10"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "table-btn",
    "data-category": "8"
  }, "U8")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "loading",
    style: {
      display: "none"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spinner"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    id: "myTable",
    width: "100%"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Metai"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    style: "max-width: 50px; min-width: 50px"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Vaikin\u0173 \u012Fskaita"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Mergin\u0173 \u012Fskaita"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Rezultatai"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null)));
}

/***/ }),

/***/ "./src/rapidblitzyth/editor.scss":
/*!***************************************!*\
  !*** ./src/rapidblitzyth/editor.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/rapidblitzyth/style.scss":
/*!**************************************!*\
  !*** ./src/rapidblitzyth/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/rapidblitzyth/block.json":
/*!**************************************!*\
  !*** ./src/rapidblitzyth/block.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/rapidblitzyth","version":"0.1.0","title":"Rapid Blitz Yth","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"attributes":{"attributes":{"type":"array","default":[]}},"textdomain":"rapidblitzyth","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"rapidblitzyth/index": 0,
/******/ 			"rapidblitzyth/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkcempionatu_lentele"] = globalThis["webpackChunkcempionatu_lentele"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["rapidblitzyth/style-index"], () => (__webpack_require__("./src/rapidblitzyth/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map