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

/***/ "./src/js/mapStart.js":
/*!****************************!*\
  !*** ./src/js/mapStart.js ***!
  \****************************/
/***/ (() => {

eval("(function(){\r\n    //https://www.google.cl/maps/@-32.967291,-71.5440427,15z\r\n\r\n    const lat = -33.4525756; // 20.67444163271174;\r\n    const lng = -70.6184675; // -103.38739216304566;\r\n    const map = L.map('map-start').setView([lat, lng ], 16);\r\n\r\n    let markers = new L.FeatureGroup().addTo(map)\r\n    let properties = [];\r\n\r\n    // Filters\r\n    const filters = {\r\n        category: '',\r\n        price:''\r\n    }\r\n\r\n    const categoriesSelect = document.querySelector('#categories')\r\n    const pricesSelect = document.querySelector('#prices')\r\n\r\n\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);    \r\n\r\n    // Filtrado de categorias y precios\r\n    categoriesSelect.addEventListener('change', e => {\r\n        //console.log(e.target.value)\r\n        filters.category = +e.target.value\r\n        filterProperties()\r\n    })\r\n\r\n    pricesSelect.addEventListener('change', e => {\r\n        //console.log(e.target.value)\r\n        filters.price = +e.target.value\r\n        filterProperties()\r\n    })\r\n\r\n    const getProperties = async(req,res) => {\r\n        try {\r\n\r\n            const url = '/api/properties'\r\n            const response = await fetch(url)\r\n            properties = await response.json()\r\n\r\n            showProperties(properties)\r\n            \r\n\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n\r\n    const showProperties = properties => {\r\n        //console.log(properties)\r\n\r\n        // Limpiar los markers previamente\r\n        markers.clearLayers()\r\n\r\n        properties.forEach(property => {\r\n            \r\n            //console.log(property)\r\n\r\n            // Agregar los pines\r\n            const marker = new L.marker([property?.lat, property?.lng], {\r\n                autoPan: true\r\n            })\r\n            .addTo(map)\r\n            .bindPopup(`\r\n                <p class=\"text-indigo-600 font-bold\">${ property?.category.name } </p>\r\n                <h1 class=\"text-xl font-extrabold uppercase my-2\">${ property?.title }  </h1>\r\n                <img src=\"/uploads/${ property?.picture }\" alt=\"Imagen de la propiedad ${ property?.picture }\">\r\n                <p class=\"text-gray-600 font-bold\">${ property?.price.name } </p>\r\n                <a href=\"/property/${ property.id }\" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase\">Ver propiedad</a>\r\n            `)\r\n\r\n            markers.addLayer(marker)\r\n        });\r\n    }\r\n    const filterProperties = () => {\r\n        // console.log(properties)\r\n        const result = properties.filter(filterCategorie).filter(filterPrice)\r\n        showProperties(result)\r\n        //console.log(result)\r\n    }\r\n\r\n    const filterCategorie = property => {\r\n        // console.log(property)\r\n        return filters.category ? property.categoryid === filters.category : property\r\n    }\r\n\r\n    const filterPrice = property => {\r\n        // console.log(property)\r\n        return filters.price ? property.priceid === filters.price : property\r\n    }\r\n\r\n    getProperties()\r\n})()\n\n//# sourceURL=webpack://bienesraices-ism/./src/js/mapStart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapStart.js"]();
/******/ 	
/******/ })()
;