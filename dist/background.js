!function(){"use strict";chrome.runtime.onInstalled.addListener((e=>{e.reason===chrome.runtime.OnInstalledReason.UPDATE&&(console.log(`Updated from version ${e.previousVersion} to ${chrome.runtime.getManifest().version}`),chrome.notifications.create({type:"basic",iconUrl:"icons/icon128.png",title:"Extension Updated. Reloading extensions",message:`Updated to version ${chrome.runtime.getManifest().version}`}),chrome.runtime.reload())})),chrome.runtime.onStartup.addListener((()=>{console.log("Chrome started")}))}();
//# sourceMappingURL=background.js.map