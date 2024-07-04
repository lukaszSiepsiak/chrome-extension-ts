/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/***/ (function() {


document === null || document === void 0 ? void 0 : document.addEventListener('DOMContentLoaded', () => {
    alert('DOMContentLoaded');
    const manifest = chrome.runtime.getManifest();
    var extensionName = document.getElementById('extension-name');
    var extensionVersion = document.getElementById('extension-version');
    if (extensionName != null) {
        extensionName.innerText = manifest.name;
    }
    if (extensionVersion != null) {
        extensionVersion.innerText = 'Version: ' + manifest.version;
    }
    const updateButton = document.getElementById('extension-check-button');
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            checkForUpdates();
        });
    }
    else {
        console.error('Button not found!');
    }
});
function checkForUpdates() {
    chrome.runtime.requestUpdateCheck((status, details) => {
        if (status === 'update_available') {
            alert('New version available: ' + (details === null || details === void 0 ? void 0 : details.version));
            chrome.runtime.reload();
            alert('Extension was reloaded successfully');
        }
        else if (status === 'no_update') {
            alert('No new updates available.');
        }
        else if (status === 'throttled') {
            alert('Update check throttled. Trying again later.');
            setTimeout(checkForUpdates, 4 * 60 * 60 * 1000);
        }
        else {
            alert('Error checking for updates: ' + status);
        }
    });
}
checkForUpdates();
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == 'chromeStarted') {
        alert(`Chrome runtime started. Sender url: ${sender.url}`);
        sendResponse('Chrome runtime started');
        return true;
    }
    else if (message.action == 'chromeConnected') {
        alert(`Chrome runtime connected. Sender url: ${sender.url}`);
        sendResponse('Chrome runtime connected');
        return true;
    }
    else if (message.action == 'extensionInstalled') {
        alert(`Extension installed. Sender url: ${sender === null || sender === void 0 ? void 0 : sender.url}`);
        sendResponse('Extension installed');
        return true;
    }
    else if (message.action == 'extensionUpdateAvailable') {
        alert(`New version available: ${message.data}. Sender url: ${sender.url}`);
        chrome.runtime.reload();
        sendResponse('Extension reloaded');
        return true;
    }
});


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
/*!******************************!*\
  !*** ./src/contentScript.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup */ "./src/popup.ts");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_popup__WEBPACK_IMPORTED_MODULE_0__);


}();
/******/ })()
;
//# sourceMappingURL=contentScript.js.map