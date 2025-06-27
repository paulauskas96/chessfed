/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _WebScraping_data_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../WebScraping/data.json */ "./WebScraping/data.json");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */





// import './btnFunctionality.js';
// import startScrapper from "./webScraping";

function Edit({
  attributes,
  setAttributes
}) {
  const [tableData, setTableData] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(_WebScraping_data_json__WEBPACK_IMPORTED_MODULE_5__.general);
  const [youthOpen, setYouthOpen] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [activeCategory, setActiveCategory] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)("general");
  const {
    showButtons
  } = attributes;
  const handleButtonClick = category => {
    setTableData(_WebScraping_data_json__WEBPACK_IMPORTED_MODULE_5__[category]);
    if (["youthU18", "youthU14", "youthU10"].includes(category)) {
      setYouthOpen(true);
    } else {
      setYouthOpen(false);
    }
    setActiveCategory(category);
    setAttributes({
      category: category
    });
  };
  const youthBtnHandler = () => {
    setTableData(_WebScraping_data_json__WEBPACK_IMPORTED_MODULE_5__.youthU18);
    setYouthOpen(!youthOpen);
    setActiveCategory("youthU18");
    setAttributes({
      category: "youthU18"
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.CheckboxControl, {
    label: "Show Buttons",
    checked: showButtons,
    onChange: value => setAttributes({
      showButtons: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "table-button-wrapper"
  }, attributes.showButtons && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "button-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    "data-category": "general",
    className: `table-btn ${activeCategory === "general" ? "active" : ""}`,
    onClick: () => handleButtonClick("general")
  }, "Bendras"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    "data-category": "men",
    className: `table-btn ${activeCategory === "men" ? "active" : ""}`,
    onClick: () => handleButtonClick("men")
  }, "Vyrai"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    "data-category": "female",
    className: `table-btn ${activeCategory === "female" ? "active" : ""}`,
    onClick: () => handleButtonClick("female")
  }, "Moterys"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    "data-category": "youthU14",
    className: `table-btn ${activeCategory === "youthU18" || activeCategory === "youthU14" || activeCategory === "youthU10" ? "active" : ""}`,
    onClick: youthBtnHandler
  }, "Jauniai"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "youth-btn-wrapper"
  }, youthOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `table-btn ${activeCategory === "youthU18" ? "active" : ""}`,
    onClick: () => handleButtonClick("youthU18")
  }, "U18"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `table-btn ${activeCategory === "youthU14" ? "active" : ""}`,
    onClick: () => handleButtonClick("youthU14")
  }, "U14"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `table-btn ${activeCategory === "youthU10" ? "active" : ""}`,
    onClick: () => handleButtonClick("youthU10")
  }, "U10"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    "data-category": "senior",
    className: `table-btn ${activeCategory === "senior" ? "active" : ""}`,
    onClick: () => handleButtonClick("senior")
  }, "Senjorai")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "table-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "table-title"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "rating-table"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "table-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Nr."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "FIDE Title"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "\u017Daid\u0117jas"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Reitingas"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", {
    className: "table-body"
  }, tableData.map((row, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      className: "table-info",
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "playerNr"
    }, row.nr), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "playerTitle"
    }, row.playerTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "playerName"
    }, row.playerName), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "playerRating"
    }, row.playerRating));
  }))))));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
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

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  }, 'Table Plugin – hello from the saved content!');
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./WebScraping/data.json":
/*!*******************************!*\
  !*** ./WebScraping/data.json ***!
  \*******************************/
/***/ (function(module) {

module.exports = JSON.parse('{"men":[{"nr":"1","playerName":"Pultinevicius, aulius","playerTitle":"GM","playerRating":"2589"},{"nr":"2","playerName":"Kazakouski, Valery","playerTitle":"GM","playerRating":"2577"},{"nr":"3","playerName":"Laurusas, Tomas","playerTitle":"GM","playerRating":"2566"},{"nr":"4","playerName":"Stremavicius, Titas","playerTitle":"GM","playerRating":"2563"},{"nr":"5","playerName":"Sulskis, Sarunas","playerTitle":"GM","playerRating":"2492"},{"nr":"6","playerName":"Rozentalis, Eduardas","playerTitle":"GM","playerRating":"2473"},{"nr":"7","playerName":"Pileckis, Emilis","playerTitle":"IM","playerRating":"2420"},{"nr":"8","playerName":"Narmontas, Matas","playerTitle":"IM","playerRating":"2417"},{"nr":"9","playerName":"Klabis, Rokas","playerTitle":"FM","playerRating":"2412"},{"nr":"10","playerName":"Zagorskis, Darius","playerTitle":"GM","playerRating":"2400"},{"nr":"11","playerName":"Juksta, Karolis","playerTitle":"IM","playerRating":"2392"},{"nr":"12","playerName":"Novik, Maxim","playerTitle":"GM","playerRating":"2375"},{"nr":"13","playerName":"Stremavicius, Pijus","playerTitle":"FM","playerRating":"2367"},{"nr":"14","playerName":"Vaznonis, Vytautas","playerTitle":"IM","playerRating":"2363"},{"nr":"15","playerName":"Sarakauskas, Gediminas","playerTitle":"IM","playerRating":"2361"},{"nr":"16","playerName":"Brazdzionis, Andrius","playerTitle":"FM","playerRating":"2340"},{"nr":"17","playerName":"Sakalauskas, Vaidas","playerTitle":"IM","playerRating":"2338"},{"nr":"18","playerName":"Stauskas, Lukas","playerTitle":"","playerRating":"2338"},{"nr":"19","playerName":"Samulevicius, Tomas","playerTitle":"","playerRating":"2333"},{"nr":"20","playerName":"Vedrickas, Tautvydas","playerTitle":"FM","playerRating":"2324"}],"female":[{"nr":"1","playerName":"Martynkova, Olena","playerTitle":"WIM","playerRating":"2227"},{"nr":"2","playerName":"Zaksaite, Salomeja","playerTitle":"WIM","playerRating":"2212"},{"nr":"3","playerName":"Limontaite, Simona","playerTitle":"WIM","playerRating":"2174"},{"nr":"4","playerName":"Baginskaite, Kamile","playerTitle":"WGM","playerRating":"2092"},{"nr":"5","playerName":"Vanagaite, Giedre","playerTitle":"WFM","playerRating":"2078"},{"nr":"6","playerName":"Batyte, Daiva","playerTitle":"WIM","playerRating":"2058"},{"nr":"7","playerName":"Sibajeva, Marija","playerTitle":"WFM","playerRating":"2016"},{"nr":"8","playerName":"Simkunaite, Gabija","playerTitle":"WFM","playerRating":"1995"},{"nr":"9","playerName":"Pazeriene, Diana","playerTitle":"","playerRating":"1974"},{"nr":"10","playerName":"Jakaityte, Ruta","playerTitle":"","playerRating":"1949"},{"nr":"11","playerName":"Savickiene, Viktorija","playerTitle":"","playerRating":"1913"},{"nr":"12","playerName":"Norinkeviciute, Rasa","playerTitle":"WFM","playerRating":"1906"},{"nr":"13","playerName":"Baliuniene, Margarita","playerTitle":"","playerRating":"1865"},{"nr":"14","playerName":"Buriene, Regina","playerTitle":"","playerRating":"1840"},{"nr":"15","playerName":"Moya, Giedre","playerTitle":"","playerRating":"1818"},{"nr":"16","playerName":"Perminaite, Guoda","playerTitle":"","playerRating":"1814"},{"nr":"17","playerName":"Savickiene, Virginija","playerTitle":"","playerRating":"1769"},{"nr":"18","playerName":"Sulikiene, Kristina","playerTitle":"WCM","playerRating":"1768"},{"nr":"19","playerName":"Setikiene, Grazina","playerTitle":"","playerRating":"1755"},{"nr":"20","playerName":"Butvilaite, Berta Reja","playerTitle":"","playerRating":"1732"}],"general":[{"nr":"1","playerName":"Pultinevicius, Paulius","playerTitle":"GM","playerRating":"2589"},{"nr":"2","playerName":"Kazakouski, Valery","playerTitle":"GM","playerRating":"2577"},{"nr":"3","playerName":"Laurusas, Tomas","playerTitle":"GM","playerRating":"2566"},{"nr":"4","playerName":"Stremavicius, Titas","playerTitle":"GM","playerRating":"2563"},{"nr":"5","playerName":"Sulskis, Sarunas","playerTitle":"GM","playerRating":"2492"},{"nr":"6","playerName":"Rozentalis, Eduardas","playerTitle":"GM","playerRating":"2473"},{"nr":"7","playerName":"Pileckis, Emilis","playerTitle":"IM","playerRating":"2420"},{"nr":"8","playerName":"Narmontas, Matas","playerTitle":"IM","playerRating":"2417"},{"nr":"9","playerName":"Klabis, Rokas","playerTitle":"FM","playerRating":"2412"},{"nr":"10","playerName":"Zagorskis, Darius","playerTitle":"GM","playerRating":"2400"},{"nr":"11","playerName":"Juksta, Karolis","playerTitle":"IM","playerRating":"2392"},{"nr":"12","playerName":"Novik, Maxim","playerTitle":"GM","playerRating":"2375"},{"nr":"13","playerName":"Stremavicius, Pijus","playerTitle":"FM","playerRating":"2367"},{"nr":"14","playerName":"Vaznonis, Vytautas","playerTitle":"IM","playerRating":"2363"},{"nr":"15","playerName":"Sarakauskas, Gediminas","playerTitle":"IM","playerRating":"2361"},{"nr":"16","playerName":"Brazdzionis, Andrius","playerTitle":"FM","playerRating":"2340"},{"nr":"17","playerName":"Sakalauskas, Vaidas","playerTitle":"IM","playerRating":"2338"},{"nr":"18","playerName":"Stauskas, Lukas","playerTitle":"","playerRating":"2338"},{"nr":"19","playerName":"Samulevicius, Tomas","playerTitle":"","playerRating":"2333"},{"nr":"20","playerName":"Vedrickas, Tautvydas","playerTitle":"FM","playerRating":"2324"}],"youthU18":[{"nr":"1","playerName":"Indriunas, Matas","playerTitle":"FM","playerRating":"2313"},{"nr":"2","playerName":"Pidluznij, Gleb","playerTitle":"","playerRating":"2246"},{"nr":"3","playerName":"Posaskov, Nikita","playerTitle":"","playerRating":"2169"},{"nr":"4","playerName":"Bazilius, Augustinas","playerTitle":"CM","playerRating":"2138"},{"nr":"5","playerName":"Greicius, Pijus","playerTitle":"","playerRating":"2107"},{"nr":"6","playerName":"Povilaitis, Tomas","playerTitle":"","playerRating":"2092"},{"nr":"7","playerName":"Morkunas, Gustas","playerTitle":"FM","playerRating":"2052"},{"nr":"8","playerName":"Nainys, Zanas","playerTitle":"","playerRating":"1974"},{"nr":"9","playerName":"Rudzkis, Vilius","playerTitle":"","playerRating":"1949"},{"nr":"10","playerName":"Kuznecovas, Kevinas","playerTitle":"","playerRating":"1915"},{"nr":"11","playerName":"Gavenavicius, Karolis","playerTitle":"","playerRating":"1909"},{"nr":"12","playerName":"Ser, Daniel","playerTitle":"","playerRating":"1905"},{"nr":"13","playerName":"Zilakauskis, Steponas","playerTitle":"","playerRating":"1836"},{"nr":"14","playerName":"Grybkauskas, Pijus","playerTitle":"","playerRating":"1814"},{"nr":"15","playerName":"Povilaitis, Matas","playerTitle":"","playerRating":"1813"},{"nr":"16","playerName":"Viliamas, Dovydas","playerTitle":"","playerRating":"1804"},{"nr":"17","playerName":"Misiuk, Martynas","playerTitle":"","playerRating":"1793"},{"nr":"18","playerName":"Leclere, Daniel","playerTitle":"","playerRating":"1767"},{"nr":"19","playerName":"Dijokas, Jokubas","playerTitle":"","playerRating":"1756"},{"nr":"20","playerName":"Scekaciov, Rostislav","playerTitle":"","playerRating":"1732"}],"youthU14":[{"nr":"1","playerName":"Bazilius, Augustinas","playerTitle":"CM","playerRating":"2138"},{"nr":"2","playerName":"Morkunas, Gustas","playerTitle":"FM","playerRating":"2052"},{"nr":"3","playerName":"Nainys, Zanas","playerTitle":"","playerRating":"1974"},{"nr":"4","playerName":"Ser, Daniel","playerTitle":"","playerRating":"1905"},{"nr":"5","playerName":"Grybkauskas, Pijus","playerTitle":"","playerRating":"1814"},{"nr":"6","playerName":"Misiuk, Martynas","playerTitle":"","playerRating":"1793"},{"nr":"7","playerName":"Dijokas, Jokubas","playerTitle":"","playerRating":"1756"},{"nr":"8","playerName":"Vaiciunas, Giedrius","playerTitle":"","playerRating":"1690"},{"nr":"9","playerName":"Kavalnis, Rytis","playerTitle":"","playerRating":"1654"},{"nr":"10","playerName":"Jasas, Ignas","playerTitle":"","playerRating":"1495"},{"nr":"11","playerName":"Rudzinskaite, Ula","playerTitle":"","playerRating":"1476"},{"nr":"12","playerName":"Navickas, Tadas","playerTitle":"","playerRating":"1470"},{"nr":"13","playerName":"Gerasimov, Igor","playerTitle":"","playerRating":"1451"},{"nr":"14","playerName":"Pidluznij, Matvej","playerTitle":"","playerRating":"1434"},{"nr":"15","playerName":"Sakinis, Rokas","playerTitle":"","playerRating":"1425"},{"nr":"16","playerName":"Norkeliunas, Sarunas","playerTitle":"","playerRating":"1403"},{"nr":"17","playerName":"Mikulinaite, Meta","playerTitle":"","playerRating":"1395"},{"nr":"18","playerName":"Alionyte, Patricija","playerTitle":"","playerRating":"1353"},{"nr":"19","playerName":"Burdin, Oleg","playerTitle":"","playerRating":"1347"},{"nr":"20","playerName":"Budiak, Arina","playerTitle":"","playerRating":"1345"}],"youthU10":[{"nr":"1","playerName":"Sakinis, Rokas","playerTitle":"","playerRating":"1425"},{"nr":"2","playerName":"Bogomolnikova, Zlata","playerTitle":"","playerRating":"1269"},{"nr":"3","playerName":"Vedrickas, Vytis","playerTitle":"","playerRating":"1260"},{"nr":"4","playerName":"Petronis, Tautvydas","playerTitle":"","playerRating":"1249"},{"nr":"5","playerName":"Vasilevskis, Mantas","playerTitle":"","playerRating":"1237"},{"nr":"6","playerName":"Bausys, Benas","playerTitle":"","playerRating":"1219"},{"nr":"7","playerName":"Lekevicius, Andrius","playerTitle":"","playerRating":"1180"},{"nr":"8","playerName":"Alejunaite, Milda","playerTitle":"","playerRating":"1177"},{"nr":"9","playerName":"Usinskas, Jonas","playerTitle":"","playerRating":"1123"},{"nr":"10","playerName":"Bitounti-Mpompa, Deniel","playerTitle":"","playerRating":"1111"},{"nr":"11","playerName":"Zaborovskis, Edvinas","playerTitle":"","playerRating":"1078"},{"nr":"12","playerName":"Liobikaite, Austeja","playerTitle":"","playerRating":"1075"},{"nr":"13","playerName":"Latysevas, Nikita","playerTitle":"","playerRating":"1064"},{"nr":"14","playerName":"Ser, Karina","playerTitle":"","playerRating":"1059"},{"nr":"15","playerName":"Rajuncas, Nojus","playerTitle":"","playerRating":"1038"},{"nr":"16","playerName":"Cechavicius, Antanas","playerTitle":"","playerRating":"1037"},{"nr":"17","playerName":"Deviatkova, Diana","playerTitle":"","playerRating":"1036"},{"nr":"18","playerName":"Rudys, Augustas","playerTitle":"","playerRating":"1029"},{"nr":"19","playerName":"Potapkin, Maksim","playerTitle":"","playerRating":"0"}],"senior":[{"nr":"1","playerName":"Sulskis, Sarunas","playerTitle":"GM","playerRating":"2492"},{"nr":"2","playerName":"Rozentalis, Eduardas","playerTitle":"GM","playerRating":"2473"},{"nr":"3","playerName":"Zagorskis, Darius","playerTitle":"GM","playerRating":"2400"},{"nr":"4","playerName":"Novik, Maxim","playerTitle":"GM","playerRating":"2375"},{"nr":"5","playerName":"Sakalauskas, Vaidas","playerTitle":"IM","playerRating":"2338"},{"nr":"6","playerName":"Malisauskas, Vidmantas","playerTitle":"GM","playerRating":"2314"},{"nr":"7","playerName":"Solys, Laimutis","playerTitle":"FM","playerRating":"2269"},{"nr":"8","playerName":"Dambrauskas, Virginijus","playerTitle":"IM","playerRating":"2222"},{"nr":"9","playerName":"Zapolskis, Antanas","playerTitle":"IM","playerRating":"2215"},{"nr":"10","playerName":"Baliasnyj, Timur","playerTitle":"","playerRating":"2200"},{"nr":"11","playerName":"Viskelis, Darius","playerTitle":"FM","playerRating":"2192"},{"nr":"12","playerName":"Lasinskas, Povilas","playerTitle":"FM","playerRating":"2143"},{"nr":"13","playerName":"Drozdov, Sergej","playerTitle":"","playerRating":"2104"},{"nr":"14","playerName":"Baginskaite, Kamile","playerTitle":"WGM","playerRating":"2092"},{"nr":"15","playerName":"Valiunas, Rimantas","playerTitle":"","playerRating":"2076"},{"nr":"16","playerName":"Babrauskas, Darius","playerTitle":"","playerRating":"2055"},{"nr":"17","playerName":"Lukosius, Rolandas","playerTitle":"","playerRating":"2032"},{"nr":"18","playerName":"Martinkus, Rolandas","playerTitle":"FM","playerRating":"2013"},{"nr":"19","playerName":"Tamosaitis, Rimas","playerTitle":"","playerRating":"2002"},{"nr":"20","playerName":"Jalanskij, Sergej","playerTitle":"","playerRating":"1997"}]}');

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/table-plugin","version":"0.1.0","title":"Table Plugin","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"table-plugin","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","attributes":{"category":{"type":"string","default":"general"},"showButtons":{"type":"boolean","default":true}}}');

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
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
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
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
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
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
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
/******/ 		var chunkLoadingGlobal = self["webpackChunktable_plugin"] = self["webpackChunktable_plugin"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map