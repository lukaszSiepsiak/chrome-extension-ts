!function(){"use strict";var e={534:function(){null===document||void 0===document||document.addEventListener("DOMContentLoaded",(()=>{alert("DOMContentLoaded"),console.log("DOMContentLoaded");const e=chrome.runtime.getManifest();var n=document.getElementById("extension-name"),t=document.getElementById("extension-version");null!=n&&(n.innerText=e.name),null!=t&&(t.innerText="Version: "+e.version)}))}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,{a:n}),n},t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){t(534);function e(){return e=this,n=void 0,o=function*(){alert("CHECK FOR UPDATE STARTED"),console.log("CHECK FOR UPDATE STARTED");try{alert("FETCH FOR UPDATE STARTED"),console.log("FETCH FOR UPDATE STARTED");const t=yield fetch("https://lukaszsiepsiak.github.io/chrome-extension-ts/update.xml"),o=yield t.text(),r=(new DOMParser).parseFromString(o,"application/xml").querySelector("app"),i=null==r?void 0:r.querySelector("updatecheck");if(i){alert("FETCH FOR UPDATE SUCCEEDED");const t=i.getAttribute("version"),o=i.getAttribute("codebase");if(alert(`FETCH FOR UPDATE SUCCEEDED. REMOTE VERSION:${t} CODEBASE: ${o}`),t&&o){const r=chrome.runtime.getManifest().version;alert(`FETCH FOR UPDATE SUCCEEDED. CURRENT VERSION:${r}`),function(e,n){const t=e.split(".").map(Number),o=n.split(".").map(Number);for(let e=0;e<Math.max(t.length,o.length);e++){const n=t[e]||0,r=o[e]||0;if(n<r)return-1;if(n>r)return 1}return 0}(r,t)<0&&(alert("NEW VERSIONCHECK FOR UPDATE, NOTIFY USER"),console.log("NEW VERSIONCHECK FOR UPDATE, NOTIFY USER"),e=t,n=o,chrome.notifications.create("updateNotification",{type:"basic",iconUrl:"icon.png",title:"Extension Update Available",message:`A new version (${e}) of the extension is available. Click to update.`,priority:2}),chrome.notifications.onClicked.addListener((e=>{"updateNotification"===e&&(alert(`NEW VERSIONCHECK FOR UPDATE, updateExtension with url: ${n}`),function(e){chrome.downloads.download({url:e,filename:"chrome-extension-ts.zip"},(n=>{alert(`chrome.downloads.download, updateExtension with url: ${e}`),chrome.downloads.onChanged.addListener((function t(o){alert(`chrome.downloads.onChanged, updateExtension with url: ${e}`),o.id===n&&o.state&&"complete"===o.state.current&&(alert(`chrome.runtime.reload, updateExtension with url: ${e}`),chrome.downloads.onChanged.removeListener(t),chrome.runtime.reload())}))}))}(n))})))}}}catch(e){console.error("Error fetching or parsing update.xml:",e)}var e,n},new((t=void 0)||(t=Promise))((function(r,i){function a(e){try{c(o.next(e))}catch(e){i(e)}}function l(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,l)}c((o=o.apply(e,n||[])).next())}));var e,n,t,o}chrome.runtime.onInstalled.addListener((n=>{alert("chrome.runtime.onInstalled"),"install"!==n.reason&&"update"!==n.reason||e()})),setInterval(e,864e5),null===document||void 0===document||document.addEventListener("DOMContentLoaded",(()=>{alert("DOMContentLoaded"),console.log("DOMContentLoaded");const n=chrome.runtime.getManifest();var t=document.getElementById("extension-name"),o=document.getElementById("extension-version");null!=t&&(t.innerText=n.name),null!=o&&(o.innerText="Version: "+n.version);var r=null===document||void 0===document?void 0:document.getElementById("extension-check-button");null!=r&&r.addEventListener("click",(()=>{e()}))}))}()}();
//# sourceMappingURL=contentScript.js.map