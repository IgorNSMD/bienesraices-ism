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

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ (() => {

eval("(function() {\r\n\r\n    //https://www.google.cl/maps/@-32.967291,-71.5440427,15z\r\n\r\n    const lat = document.querySelector('#lat').value || -33.4525756; // 20.67444163271174;\r\n    const lng = document.querySelector('#lng').value || -70.6184675; // -103.38739216304566;\r\n    const map = L.map('map').setView([lat, lng ], 16);\r\n    \r\n    let marker;\r\n\r\n    // Utilizar provider y Geocoder\r\n    const geocodeService = L.esri.Geocoding.geocodeService()\r\n\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    // el Pin\r\n    marker = new L.marker([lat,lng],{\r\n        draggable: true,\r\n        autoPan: true\r\n    }).addTo(map)\r\n\r\n    // Detectar el movimiento del ping\r\n    marker.on('moveend', function(e){\r\n        marker = e.target\r\n\r\n        //console.log(marker)\r\n\r\n        const position = marker.getLatLng();\r\n\r\n        //console.log(position)\r\n\r\n        map.panTo(new L.LatLng(position.lat, position.lng))\r\n\r\n        // Obtener la información de las calles al soltar el ping\r\n\r\n        geocodeService.reverse().latlng(position,16).run(function(error,result){\r\n            //console.log(result)\r\n            marker.bindPopup(result.address.LongLabel)\r\n\r\n            //Llenar los campos\r\n            document.querySelector('.street').textContent = result?.address?.Address ?? '';\r\n            document.querySelector('#street').value = result?.address?.Address ?? '';\r\n            document.querySelector('#lat').value = result?.latlng?.lat ?? '';\r\n            document.querySelector('#lng').value = result?.latlng?.lng ?? '';\r\n\r\n        })\r\n\r\n    })\r\n\r\n})()\n\n//# sourceURL=webpack://bienesraices-ism/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"]();
/******/ 	
/******/ })()
;