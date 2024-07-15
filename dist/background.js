/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

chrome.runtime.onStartup.addListener(() => {
    console.log('chrome.runtime.onStartup => Chrome started');
    sendMessage('chromeStarted', null);
});
chrome.runtime.onInstalled.addListener(() => {
    console.log('chrome.runtime.onInstalled => Invoked when extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version');
    chrome.runtime.onConnect.addListener((port) => {
        if (port.name === 'popup') {
            port.postMessage({ message: 'extensionInstalled' });
            port.onMessage.addListener((msg) => {
                console.log('Response from popup:', msg);
            });
        }
    });
});
chrome.runtime.onUpdateAvailable.addListener((details) => {
    console.log('chrome.runtime.onUpdateAvailable => Fired when an update is available');
    sendMessage('extensionUpdateAvailable', details === null || details === void 0 ? void 0 : details.version);
});
function sendMessage(message, data = {}) {
    if (chrome && chrome.runtime) {
        const dataTSend = { action: message, data };
        setTimeout(() => {
            chrome.runtime.sendMessage(dataTSend, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error sending signal from background service worker script. Message: ', chrome.runtime.lastError.message);
                }
                else {
                    console.log('Signal send successfully from background service worker script. Response message: ', response === null || response === void 0 ? void 0 : response.toString());
                }
            });
        }, 0);
    }
}

/******/ })()
;
//# sourceMappingURL=background.js.map