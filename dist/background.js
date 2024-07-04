/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

chrome.runtime.onStartup.addListener(() => {
    console.log('chrome.runtime.onStartup => Chrome started');
    sendMessage('chromeStarted', null, (message) => {
        console.log(`Message from extension after chromeStarted: ${message}`);
    });
});
function sendMessage(message, data, callback) {
    if (chrome.runtime) {
        const dataTSend = { action: message, data };
        chrome.runtime.sendMessage(dataTSend, callback);
    }
}

/******/ })()
;
//# sourceMappingURL=background.js.map