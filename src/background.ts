chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        console.log(`Updated from ${details.previousVersion} to ${chrome.runtime.getManifest().version}`);
        // Optionally notify the user about the update
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'images/icon128.png',
            title: 'Extension Updated',
            message: `Updated to version ${chrome.runtime.getManifest().version}`,
        });
    }
});

chrome.runtime.onStartup.addListener(() => {
    // This will run each time Chrome starts
    console.log('Chrome started');
});
