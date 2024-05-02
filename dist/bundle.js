(()=>{"use strict";var e={208:(e,n,r)=>{r.d(n,{A:()=>c});var t=r(354),o=r.n(t),a=r(314),i=r.n(a)()(o());i.push([e.id,"*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nheader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 30px;\n}\n#gameContainer{\n    display: flex;\n    border: 1px solid red;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    width: 100%;\n    gap: 30px;\n}\n.gameControls{\n    border: 1px solid red;\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n}\n.grid {\n    display: grid;\n    grid-template-columns: repeat(10, 50px);\n    grid-template-rows: repeat(10, 50px);\n    padding: 10px;\n    border: 1px solid red;\n}\n.cellComputer, .cellPlayer {\n    border: 1px solid red;\n}\n.cellPlayer:hover{\n    background-color: aqua;\n}\n.cellPlayer.ship{\n    background-color: red;\n}\n#errorDisplay{\n    border: 1px solid red;\n}","",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"AAAA;IACI,UAAU;IACV,SAAS;IACT,sBAAsB;AAC1B;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,aAAa;AACjB;AACA;IACI,aAAa;IACb,qBAAqB;IACrB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,YAAY;IACZ,WAAW;IACX,SAAS;AACb;AACA;IACI,qBAAqB;IACrB,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,SAAS;AACb;AACA;IACI,aAAa;IACb,uCAAuC;IACvC,oCAAoC;IACpC,aAAa;IACb,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,sBAAsB;AAC1B;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB",sourcesContent:["*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nheader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 30px;\n}\n#gameContainer{\n    display: flex;\n    border: 1px solid red;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    width: 100%;\n    gap: 30px;\n}\n.gameControls{\n    border: 1px solid red;\n    padding: 20px;\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n}\n.grid {\n    display: grid;\n    grid-template-columns: repeat(10, 50px);\n    grid-template-rows: repeat(10, 50px);\n    padding: 10px;\n    border: 1px solid red;\n}\n.cellComputer, .cellPlayer {\n    border: 1px solid red;\n}\n.cellPlayer:hover{\n    background-color: aqua;\n}\n.cellPlayer.ship{\n    background-color: red;\n}\n#errorDisplay{\n    border: 1px solid red;\n}"],sourceRoot:""}]);const c=i},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var r="",t=void 0!==n[5];return n[4]&&(r+="@supports (".concat(n[4],") {")),n[2]&&(r+="@media ".concat(n[2]," {")),t&&(r+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),r+=e(n),t&&(r+="}"),n[2]&&(r+="}"),n[4]&&(r+="}"),r})).join("")},n.i=function(e,r,t,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(t)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);t&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),n.push(d))}},n}},354:e=>{e.exports=function(e){var n=e[1],r=e[3];if(!r)return n;if("function"==typeof btoa){var t=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t),a="/*# ".concat(o," */");return[n].concat([a]).join("\n")}return[n].join("\n")}},72:e=>{var n=[];function r(e){for(var r=-1,t=0;t<n.length;t++)if(n[t].identifier===e){r=t;break}return r}function t(e,t){for(var a={},i=[],c=0;c<e.length;c++){var s=e[c],l=t.base?s[0]+t.base:s[0],d=a[l]||0,u="".concat(l," ").concat(d);a[l]=d+1;var p=r(u),A={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)n[p].references++,n[p].updater(A);else{var f=o(A,t);t.byIndex=c,n.splice(c,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(e,n){var r=n.domAPI(n);return r.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;r.update(e=n)}else r.remove()}}e.exports=function(e,o){var a=t(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=r(a[i]);n[c].references--}for(var s=t(e,o),l=0;l<a.length;l++){var d=r(a[l]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=s}}},659:e=>{var n={};e.exports=function(e,r){var t=function(e){if(void 0===n[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}n[e]=r}return n[e]}(e);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(r)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,r)=>{e.exports=function(e){var n=r.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(r){!function(e,n,r){var t="";r.supports&&(t+="@supports (".concat(r.supports,") {")),r.media&&(t+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(t+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),t+=r.css,o&&(t+="}"),r.media&&(t+="}"),r.supports&&(t+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(t,e,n.options)}(n,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function r(t){var o=n[t];if(void 0!==o)return o.exports;var a=n[t]={id:t,exports:{}};return e[t](a,a.exports,r),a.exports}r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r.nc=void 0,(()=>{var e=r(72),n=r.n(e),t=r(825),o=r.n(t),a=r(659),i=r.n(a),c=r(56),s=r.n(c),l=r(540),d=r.n(l),u=r(113),p=r.n(u),A=r(208),f={};function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;document.getElementById("errorDisplay").innerHTML=null===e?null:e}function h(e){var n=e,r=0===e;return{size:e,getHealth:function(){return n},getIsSunk:function(){return r},hit:function(){r||0==(n-=1)&&(r=!0)}}}function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}f.styleTagTransform=p(),f.setAttributes=s(),f.insert=i().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=d(),n()(A.A,f),A.A&&A.A.locals&&A.A.locals,document.getElementById("switchOrientation").addEventListener("click",(function(){var e=document.getElementById("switchOrientation");e.dataset.orientation="v"===e.dataset.orientation?"h":"v",e.innerHTML="Vertical"===e.innerHTML?"Horizontal":"Vertical"})),function(){for(var e=document.querySelector(".playerGrid"),n=document.querySelector(".computerGrid"),r=0;r<10;r++)for(var t=0;t<10;t++){var o=document.createElement("p"),a=document.createElement("p");o.id="player".concat(r.toString()).concat(t.toString()),a.id="computer".concat(r.toString()).concat(t.toString()),o.classList.add("cellPlayer"),a.classList.add("cellComputer"),e.appendChild(o),n.appendChild(a)}}();var g,v,C,b,x,I=(b=17,x=function(){for(var e={grid:[],areAllSunk:!1},n=0;n<10;n++){for(var r=[],t=0;t<10;t++)r.push({ship:null,isHit:!1});e.grid.push(r)}return e}(),g={getGridPlayer:function(){return x.grid},placePlayerShip:function(e,n,r,t){try{if(function(e,n,r,t){if(r<0||r>=10||t<0||t>=10)throw new Error("Coordinates are out of bounds of the board");if("h"===n&&t+e>10)throw new Error("Cannot place ship horizontally. It goes out of bounds.");if("v"===n&&r+e>10)throw new Error("Cannot place ship vertically. It goes out of bounds.");if("h"===n){for(var o=t;o<t+e;o++)if(null!==x.grid[r][o].ship)throw new Error("Cannot place ship. There is already a ship in the specified area.")}else for(var a=r;a<r+e;a++)if(null!==x.grid[a][t].ship)throw new Error("Cannot place ship. There is already a ship in the specified area.");return!0}(e.size,n,r,t)){if("h"===n){for(var o=t;o<t+e.size;o++)x.grid[r][o].ship=e;return{start:{x:r,y:t},end:{x:r,y:t+e.size-1}}}for(var a=r;a<r+e.size;a++)x.grid[a][t].ship=e;return{start:{x:r,y:t},end:{x:r+e.size-1,y:t}}}}catch(e){return e}return null},hit:function(e,n){if((e<0||e>=10||n<0||n>=10)&&y("Coordinates are out of bounds of the board"),x.grid[e][n].isHit)y("Cell already attacked and marked as hit");else{null!==x.grid[e][n].ship&&x.grid[e][n].ship.hit(),x.grid[e][n].isHit=!0;try{(b-=1)||y("Game over")}catch(e){y(e)}}}},v=[h(5),h(4),h(3),h(3),h(2)],{getPlayerBoard:function(){return g.getGridPlayer()},setShipsToBoard:function(e,n,r){try{var t;return v[0]?"object"===m(t=g.placePlayerShip(v[0],r,e,n))?v.shift():y(t):t=null,t}catch(e){y(e)}}});C=I,document.querySelectorAll(".cellPlayer").forEach((function(e){e.addEventListener("click",(function(){var n=e.id.slice(6),r=document.getElementById("switchOrientation").dataset.orientation,t=parseInt(n.slice(0,1),10),o=parseInt(n.slice(1),10),a=C.setShipsToBoard(t,o,r);if(null!=a)for(var i=a.start,c=a.end,s=i.x;s<=c.x;s++)for(var l=i.y;l<=c.y;l++)document.getElementById("player".concat(s).concat(l)).classList.add("ship");else y("all ships placed")}))}))})()})();
//# sourceMappingURL=bundle.js.map