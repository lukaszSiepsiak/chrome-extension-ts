// chrome.runtime.onInstalled.addListener((details) => {
//     if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
//         console.log(`Updated from version ${details.previousVersion} to ${chrome.runtime.getManifest().version}`);
//         // Optionally notify the user about the update
//         chrome.notifications.create({
//             type: 'basic',
//             iconUrl: 'icons/icon128.png',
//             title: 'Extension Updated. Reloading extensions',
//             message: `Updated to version ${chrome.runtime.getManifest().version}`,
//         });

//         //chrome.runtime.reload();
//     }
// });

chrome.runtime.onStartup.addListener(() => {
    // This will run each time Chrome starts
    console.log('Chrome started');
});
