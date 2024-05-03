/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game-logic/gameboard.js":
/*!*************************************!*\
  !*** ./src/game-logic/gameboard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _populateDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../populateDOM */ "./src/populateDOM.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/game-logic/ship.js");


function gameboard() {
  // The possible hits you can make are 17, because there are
  // are five ships that have health as follows: 5, 4, 3, 3, 2.
  // When this number hits 0, all ships will be sunk, therefor the game ends
  // const possibleHits = 17;
  // IIFE that creates the grid object
  // it consists of a 2D array filled with objects that
  // contain the properies 'ship' and 'hit'
  var createGrid = function createGrid() {
    var board = {
      grid: [],
      areAllSunk: false
    };
    for (var i = 0; i < 10; i++) {
      var array = [];
      for (var j = 0; j < 10; j++) {
        array.push({
          ship: null,
          isHit: false
        });
      }
      board.grid.push(array);
    }
    return board;
  };
  var gridPlayer = createGrid();
  var gridComputer = createGrid();
  var getGridPlayer = function getGridPlayer() {
    return gridPlayer.grid;
  };
  var getGridComputer = function getGridComputer() {
    return gridComputer.grid;
  };
  var checkCoordinates = function checkCoordinates(shipSize, orientation, x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Coordinates are out of bounds of the board");
    }
    if (orientation === "h" && y + shipSize > 10) {
      throw new Error("Cannot place ship horizontally. It goes out of bounds.");
    }
    if (orientation === "v" && x + shipSize > 10) {
      throw new Error("Cannot place ship vertically. It goes out of bounds.");
    }
    if (orientation === "h") {
      for (var i = y; i < y + shipSize; i++) {
        if (gridPlayer.grid[x][i].ship !== null) {
          throw new Error("Cannot place ship. There is already a ship in the specified area.");
        }
      }
    } else {
      for (var _i = x; _i < x + shipSize; _i++) {
        if (gridPlayer.grid[_i][y].ship !== null) {
          throw new Error("Cannot place ship. There is already a ship in the specified area.");
        }
      }
    }
    return true;
  };
  var placePlayerShip = function placePlayerShip(ship, orientation, x, y) {
    try {
      if (checkCoordinates(ship.size, orientation, x, y)) {
        if (orientation === "h") {
          for (var i = y; i < y + ship.size; i++) {
            gridPlayer.grid[x][i].ship = ship;
          }
          return {
            start: {
              x: x,
              y: y
            },
            end: {
              x: x,
              y: y + ship.size - 1
            }
          };
        }
        // for vertical orientation
        for (var _i2 = x; _i2 < x + ship.size; _i2++) {
          gridPlayer.grid[_i2][y].ship = ship;
        }
        return {
          start: {
            x: x,
            y: y
          },
          end: {
            x: x + ship.size - 1,
            y: y
          }
        };
      }
    } catch (error) {
      return error;
    }
    return null;
  };
  var generateRandomCoordinates = function generateRandomCoordinates() {
    var coordinates = [];
    var shipSize = [5, 4, 3, 3, 2];
    while (shipSize.length > 0) {
      var orientation = Math.random() < 0.5 ? "h" : "v";
      var hasOverlap = false;
      var x = 0;
      var y = 0;
      if (orientation === "h") {
        x = Math.floor(Math.random() * 10); // Random row index
        y = Math.floor(Math.random() * (10 - shipSize[0])); // Random column index within bounds
        for (var i = y; i < y + shipSize[0]; i++) {
          if (gridComputer.grid[x][i].ship !== null) {
            hasOverlap = true;
          }
        }
      } else {
        x = Math.floor(Math.random() * (10 - shipSize[0])); // Random row index within bounds
        y = Math.floor(Math.random() * 10); // Random column index
        for (var _i3 = x; _i3 < x + shipSize[0]; _i3++) {
          if (gridComputer.grid[_i3][y].ship !== null) {
            hasOverlap = true;
          }
        }
      }
      if (!hasOverlap) {
        coordinates.push({
          shipSize: shipSize[0],
          orientation: orientation,
          x: x,
          y: y
        });
        var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(shipSize[0]);
        if (orientation === "h") {
          for (var _i4 = y; _i4 < y + shipSize[0]; _i4++) {
            gridComputer.grid[x][_i4].ship = ship;
          }
        } else {
          for (var _i5 = x; _i5 < x + shipSize[0]; _i5++) {
            gridComputer.grid[_i5][y].ship = ship;
          }
        }
        shipSize.shift();
      }
    }
    return coordinates;
  };

  // const updatePossibleHits = () => {
  //   possibleHits -= 1;
  //   if (!possibleHits) {
  //     // implement logic later on
  //     updateErrorDisplay("Game over");
  //     // throw new Error("Game over");
  //   }
  // };
  // Cheks if the given coordinates have been hit, and if there is a ship.
  // It marks the ship and the cell as hit. The way that the mechanic works is
  // a ship that is set on several adjacent cells is a single object assigned to
  // to multiple coordinates, with each hit,the health of the object decreases.
  var hit = function hit(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      (0,_populateDOM__WEBPACK_IMPORTED_MODULE_0__.updateErrorDisplay)("Coordinates are out of bounds of the board");
      // throw new Error("Coordinates are out of bounds of the board");
    }
    if (!gridComputer.grid[x][y].isHit) {
      if (gridComputer.grid[x][y].ship !== null) {
        gridComputer.grid[x][y].ship.hit();
      }
      gridComputer.grid[x][y].isHit = true;
      // updatePossibleHits();
      // throw new Error(err);
    } else {
      (0,_populateDOM__WEBPACK_IMPORTED_MODULE_0__.updateErrorDisplay)("Cell already attacked and marked as hit");
      // throw new Error("Cell already attacked and marked as hit");
    }
    console.log(gridComputer.grid[x][y].isHit);
    console.log(gridComputer.grid[x][y].ship.getHealth());
    console.log(gridComputer.grid[x][y].ship.getIsSunk());
  };
  return {
    getGridPlayer: getGridPlayer,
    getGridComputer: getGridComputer,
    placePlayerShip: placePlayerShip,
    hit: hit,
    generateRandomCoordinates: generateRandomCoordinates
  };
}

/***/ }),

/***/ "./src/game-logic/player.js":
/*!**********************************!*\
  !*** ./src/game-logic/player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/game-logic/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/game-logic/gameboard.js");
/* harmony import */ var _populateDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../populateDOM */ "./src/populateDOM.js");



function Player() {
  var board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var ships = [(0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(5),
  // carrier
  (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(4),
  // battleship
  (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3),
  // cruiser
  (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3),
  // submarine
  (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(2) // destroyer
  ];
  var getPlayerBoard = function getPlayerBoard() {
    return board.getGridPlayer();
  };
  function setShipsToBoard(x, y, orientation) {
    var result;
    if (ships[0]) {
      if (ships.length === 1) {
        result = board.placePlayerShip(ships[0], orientation, x, y);
        if (result instanceof Error) {
          // skip the line below if the result of the function calling is an error message
        } else {
          ships.shift();
          (0,_populateDOM__WEBPACK_IMPORTED_MODULE_2__.disableShipPlacement)();
          (0,_populateDOM__WEBPACK_IMPORTED_MODULE_2__.enableAttacks)(this);
        }
      } else {
        result = board.placePlayerShip(ships[0], orientation, x, y);
        if (result instanceof Error) {
          // skip the line below if the result of the function calling is an error message
        } else {
          ships.shift();
        }
      }
    } else {
      result = undefined;
    }
    return result;
  }
  var hit = function hit(x, y) {
    board.hit(x, y);
  };
  var setComputerShipsToBoard = function setComputerShipsToBoard() {
    var coordinates = board.generateRandomCoordinates();
    return coordinates;
  };
  return {
    getPlayerBoard: getPlayerBoard,
    setShipsToBoard: setShipsToBoard,
    setComputerShipsToBoard: setComputerShipsToBoard,
    hit: hit
  };
}

/***/ }),

/***/ "./src/game-logic/ship.js":
/*!********************************!*\
  !*** ./src/game-logic/ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(length) {
  var size = length;
  var health = size;
  var isSunk = size === 0;
  var getHealth = function getHealth() {
    return health;
  };
  var getIsSunk = function getIsSunk() {
    return isSunk;
  };
  var hit = function hit() {
    if (!isSunk) {
      health -= 1;
      if (health === 0) {
        isSunk = true;
      }
    }
  };
  return {
    size: size,
    getHealth: getHealth,
    getIsSunk: getIsSunk,
    hit: hit
  };
}

/***/ }),

/***/ "./src/populateDOM.js":
/*!****************************!*\
  !*** ./src/populateDOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableShipPlacement: () => (/* binding */ disableShipPlacement),
/* harmony export */   drawGrid: () => (/* binding */ drawGrid),
/* harmony export */   enableAttacks: () => (/* binding */ enableAttacks),
/* harmony export */   markComputerShips: () => (/* binding */ markComputerShips),
/* harmony export */   placeShips: () => (/* binding */ placeShips),
/* harmony export */   switchOrientation: () => (/* binding */ switchOrientation),
/* harmony export */   updateErrorDisplay: () => (/* binding */ updateErrorDisplay)
/* harmony export */ });
function drawGrid() {
  var containerPlayer = document.querySelector(".playerGrid");
  var containerComputer = document.querySelector(".computerGrid");
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cellPlayer = document.createElement("p");
      var cellComputer = document.createElement("p");
      cellPlayer.id = "player".concat(i.toString()).concat(j.toString());
      cellComputer.id = "computer".concat(i.toString()).concat(j.toString());
      cellPlayer.classList.add("cellPlayer");
      cellComputer.classList.add("cellComputer");
      containerPlayer.appendChild(cellPlayer);
      containerComputer.appendChild(cellComputer);
    }
  }
}
function markComputerShips(input) {
  var containerComputer = document.querySelectorAll(".cellComputer");
  var coordinates = input.slice();
  while (coordinates.length > 0) {
    if (coordinates[0].orientation === "h") {
      for (var i = coordinates[0].y; i < coordinates[0].y + coordinates[0].shipSize; i++) {
        containerComputer[coordinates[0].x * 10 + i].classList.add("ship");
      }
    } else {
      for (var _i = coordinates[0].x; _i < coordinates[0].x + coordinates[0].shipSize; _i++) {
        containerComputer[_i * 10 + coordinates[0].y].classList.add("ship");
      }
    }
    coordinates.shift();
  }
}
function switchOrientation() {
  var btn = document.getElementById("switchOrientation");
  btn.dataset.orientation = btn.dataset.orientation === "v" ? "h" : "v";
  btn.innerHTML = btn.innerHTML === "Vertical" ? "Horizontal" : "Vertical";
}
function updateErrorDisplay() {
  var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.innerHTML = err === null ? null : err;
}
function placeShips(player) {
  var cells = document.querySelectorAll(".cellPlayer");
  cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      var id = cell.id.slice(6);
      var orientation = document.getElementById("switchOrientation").dataset.orientation;
      var x = parseInt(id.slice(0, 1), 10);
      var y = parseInt(id.slice(1), 10);
      var coordinatesToMark = player.setShipsToBoard(x, y, orientation);
      if (coordinatesToMark === undefined) {
        updateErrorDisplay("all ships placed");
      } else if (coordinatesToMark instanceof Error) {
        updateErrorDisplay(coordinatesToMark);
      } else {
        var start = coordinatesToMark.start,
          end = coordinatesToMark.end;
        for (var i = start.x; i <= end.x; i++) {
          for (var j = start.y; j <= end.y; j++) {
            var cellWithShip = document.getElementById("player".concat(i).concat(j));
            cellWithShip.classList.add("ship");
          }
        }
      }
    });
  });
}
// remove all event listeneners by clonign each cell node
function disableShipPlacement() {
  var cells = document.querySelectorAll(".cellPlayer");
  cells.forEach(function (cell) {
    cell.replaceWith(cell.cloneNode(true));
  });
}
function enableAttacks(player) {
  var cells = document.querySelectorAll(".cellComputer");
  cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      var id = cell.id.slice(8);
      var x = parseInt(id.slice(0, 1), 10);
      var y = parseInt(id.slice(1), 10);
      cell.classList.add("hit");
      player.hit(x, y);
    });
  });
}

// export function renderPlayerBoard(){}
// export function renderComputerBoard(){}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
}
#gameContainer{
    display: flex;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 30px;
}
.gameControls{
    border: 1px solid red;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.grid {
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(10, 50px);
    padding: 10px;
    border: 1px solid red;
}
.cellComputer, .cellPlayer {
    border: 1px solid red;
}
.cellPlayer:hover{
    background-color: aqua;
}
.cellPlayer.ship{
    background-color: red;
}
.cellComputer.ship{
    background-color: blueviolet;
}
#errorDisplay{
    border: 1px solid red;
}
.cellComputer.hit{
    content: "X";
    background-color: aqua;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,UAAU;IACV,SAAS;IACT,sBAAsB;AAC1B;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,aAAa;AACjB;AACA;IACI,aAAa;IACb,qBAAqB;IACrB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,YAAY;IACZ,WAAW;IACX,SAAS;AACb;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,SAAS;AACb;AACA;IACI,aAAa;IACb,uCAAuC;IACvC,oCAAoC;IACpC,aAAa;IACb,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,sBAAsB;AAC1B;AACA;IACI,qBAAqB;AACzB;AACA;IACI,4BAA4B;AAChC;AACA;IACI,qBAAqB;AACzB;AACA;IACI,YAAY;IACZ,sBAAsB;AAC1B","sourcesContent":["*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nheader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 30px;\n}\n#gameContainer{\n    display: flex;\n    border: 1px solid red;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    width: 100%;\n    gap: 30px;\n}\n.gameControls{\n    border: 1px solid red;\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n}\n.grid {\n    display: grid;\n    grid-template-columns: repeat(10, 50px);\n    grid-template-rows: repeat(10, 50px);\n    padding: 10px;\n    border: 1px solid red;\n}\n.cellComputer, .cellPlayer {\n    border: 1px solid red;\n}\n.cellPlayer:hover{\n    background-color: aqua;\n}\n.cellPlayer.ship{\n    background-color: red;\n}\n.cellComputer.ship{\n    background-color: blueviolet;\n}\n#errorDisplay{\n    border: 1px solid red;\n}\n.cellComputer.hit{\n    content: \"X\";\n    background-color: aqua;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _populateDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./populateDOM */ "./src/populateDOM.js");
/* harmony import */ var _game_logic_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-logic/player */ "./src/game-logic/player.js");



var btn = document.getElementById("switchOrientation");
btn.addEventListener("click", _populateDOM__WEBPACK_IMPORTED_MODULE_1__.switchOrientation);
(0,_populateDOM__WEBPACK_IMPORTED_MODULE_1__.drawGrid)();
var player1 = (0,_game_logic_player__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_populateDOM__WEBPACK_IMPORTED_MODULE_1__.placeShips)(player1);
var coordinatesToMark = player1.setComputerShipsToBoard();
(0,_populateDOM__WEBPACK_IMPORTED_MODULE_1__.markComputerShips)(coordinatesToMark);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map