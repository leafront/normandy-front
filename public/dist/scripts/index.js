/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/*!*********************************!*\
  !*** ./public/scripts/index.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar common = __webpack_require__(/*! ./common */ 2);\n\nvar local = __webpack_require__(/*! ./widget/local */ 8);\n\ncommon.headerMenu();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcHVibGljL3NjcmlwdHMvaW5kZXguanM/NzA2NSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG52YXIgbG9jYWwgPSByZXF1aXJlKCcuL3dpZGdldC9sb2NhbCcpO1xuXG5jb21tb24uaGVhZGVyTWVudSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBwdWJsaWMvc2NyaXB0cy9pbmRleC5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///13\n");

/***/ }),

/***/ 2:
/*!**********************************!*\
  !*** ./public/scripts/common.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

"use strict";
eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/leafrontye/Desktop/normandy-front/.babelrc'\\n    at Object.fs.openSync (fs.js:584:18)\\n    at Object.fs.readFileSync (fs.js:491:33)\\n    at OptionManager.addConfig (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-core/lib/transformation/file/options/option-manager.js:237:56)\\n    at OptionManager.findConfigs (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-core/lib/transformation/file/options/option-manager.js:454:16)\\n    at OptionManager.init (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-core/lib/transformation/file/options/option-manager.js:502:12)\\n    at File.initOptions (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-core/lib/transformation/file/index.js:243:89)\\n    at new File (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-core/lib/transformation/file/index.js:159:72)\\n    at Pipeline.transform (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-core/lib/transformation/pipeline.js:49:16)\\n    at transpile (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-loader/index.js:14:22)\\n    at Object.module.exports (/Users/leafrontye/Desktop/normandy-front/node_modules/babel-loader/index.js:88:12)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ }),

/***/ 8:
/*!****************************************!*\
  !*** ./public/scripts/widget/local.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar local = {};\n\nvar storage;\n\nvar doc = document;\n\nfunction serialize(value) {\n\treturn JSON.stringify(value);\n}\n\nfunction deserialize(value) {\n\n\tif (typeof value != 'string') return undefined;\n\n\treturn JSON.parse(value);\n}\n\nif ('localStorage' in window && window.localStorage) {\n\n\tstorage = window.localStorage;\n\n\tlocal.set = function (key, val) {\n\t\tstorage[key] = serialize(val);\n\t};\n\tlocal.get = function (key) {\n\t\treturn deserialize(storage[key]);\n\t};\n\tlocal.remove = function (key) {\n\t\tdelete storage[key];\n\t};\n\tlocal.clear = function () {\n\t\tstorage.clear();\n\t};\n} else {\n\n\tlocal.set = function (key, val) {\n\n\t\tif (window.name) {\n\n\t\t\tstorage = deserialize(window.name);\n\t\t} else {\n\n\t\t\tstorage = {};\n\t\t}\n\n\t\tstorage[key] = val;\n\n\t\twindow.name = serialize(storage);\n\t};\n\tlocal.get = function (key) {\n\n\t\treturn deserialize(window.name)[key];\n\t};\n\tlocal.remove = function (key) {\n\n\t\tstorage = deserialize(window.name);\n\n\t\tdelete storage[key];\n\n\t\twindow.name = serialize(storage);\n\t};\n\tlocal.clear = function () {\n\n\t\twindow.name = '';\n\t};\n}\n\nmodule.exports = local;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9wdWJsaWMvc2NyaXB0cy93aWRnZXQvbG9jYWwuanM/ODI4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxudmFyIGxvY2FsID0ge307XG5cbnZhciBzdG9yYWdlO1xuXG52YXIgZG9jID0gZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWx1ZSkge1xuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZSh2YWx1ZSkge1xuXG5cdGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHJldHVybiB1bmRlZmluZWQ7XG5cblx0cmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xufVxuXG5pZiAoJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcblxuXHRzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuXHRsb2NhbC5zZXQgPSBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdHN0b3JhZ2Vba2V5XSA9IHNlcmlhbGl6ZSh2YWwpO1xuXHR9XG5cdGxvY2FsLmdldCA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdHJldHVybiBkZXNlcmlhbGl6ZShcblx0XHRcdHN0b3JhZ2Vba2V5XSk7XG5cdH1cblx0bG9jYWwucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7XG5cdFx0ZGVsZXRlIHN0b3JhZ2Vba2V5XTtcblx0fVxuXHRsb2NhbC5jbGVhciA9IGZ1bmN0aW9uKCkge1xuXHRcdHN0b3JhZ2UuY2xlYXIoKTtcblx0fVxuXG59IGVsc2Uge1xuXG5cblx0bG9jYWwuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWwpIHtcblxuXHRcdGlmICh3aW5kb3cubmFtZSkge1xuXG5cdFx0XHRzdG9yYWdlID0gZGVzZXJpYWxpemUod2luZG93Lm5hbWUpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0c3RvcmFnZSA9IHt9O1xuXG5cdFx0fVxuXG5cdFx0c3RvcmFnZVtrZXldID0gdmFsO1xuXG5cdFx0d2luZG93Lm5hbWUgPSBzZXJpYWxpemUoc3RvcmFnZSk7XG5cblx0fVxuXHRsb2NhbC5nZXQgPSBmdW5jdGlvbihrZXkpIHtcblxuXHRcdHJldHVybiBkZXNlcmlhbGl6ZSh3aW5kb3cubmFtZSlba2V5XTtcblxuXHR9XG5cdGxvY2FsLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge1xuXG5cdFx0c3RvcmFnZSA9IGRlc2VyaWFsaXplKHdpbmRvdy5uYW1lKTtcblxuXHRcdGRlbGV0ZSBzdG9yYWdlW2tleV07XG5cblx0XHR3aW5kb3cubmFtZSA9IHNlcmlhbGl6ZShzdG9yYWdlKTtcblxuXHR9XG5cdGxvY2FsLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cblx0XHR3aW5kb3cubmFtZSA9ICcnO1xuXG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2NhbDtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcHVibGljL3NjcmlwdHMvd2lkZ2V0L2xvY2FsLmpzIl0sIm1hcHBpbmdzIjoiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///8\n");

/***/ })

/******/ });