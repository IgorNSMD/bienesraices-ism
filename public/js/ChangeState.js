/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/changeState.js":
/*!*******************************!*\
  !*** ./src/js/changeState.js ***!
  \*******************************/
/***/ (() => {

eval("(function(){\r\n    //alert('cambiarestado.js')\r\n    const changeStateBtn = document.querySelectorAll('.change-state')\r\n    const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content')\r\n\r\n    changeStateBtn.forEach( b => {\r\n        b.addEventListener('click',changeStateProperty)\r\n    });\r\n\r\n    async function changeStateProperty(e){\r\n        const { propertyid: id } = e.target.dataset\r\n        //console.log(id)\r\n\r\n        try {\r\n            const url = `/properties/changeState/${ id }`\r\n\r\n            const resp = await fetch(url,{\r\n                method:'PUT',\r\n                headers: {\r\n                    'CSRF-Token': token\r\n                }\r\n            })\r\n    \r\n                    \r\n            const result = await resp.json()\r\n\r\n            //console.log(result)    \r\n\r\n            if(result){\r\n\r\n                if(e.target.classList.contains('bg-yellow-100')){\r\n                    e.target.classList.add('bg-green-100','text-green-800')\r\n                    e.target.classList.remove('bg-yellow-100','text-yellow-800')\r\n                    e.target.textContent = 'Publicado'\r\n                } else {\r\n                    e.target.classList.remove('bg-green-100','text-green-800')\r\n                    e.target.classList.add('bg-yellow-100','text-yellow-800')\r\n                    e.target.textContent = 'No Publicado'\r\n                }\r\n\r\n            }\r\n\r\n\r\n        } catch (error) {\r\n            console.log(error)    \r\n        }\r\n    }\r\n\r\n})()\n\n//# sourceURL=webpack://bienesraices-ism/./src/js/changeState.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/changeState.js"]();
/******/ 	
/******/ })()
;