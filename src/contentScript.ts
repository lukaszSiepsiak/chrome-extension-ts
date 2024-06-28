import './popup';

// Function to check for updates
async function checkForUpdate() {
    alert('CHECK FOR UPDATE STARTED');
    console.log('CHECK FOR UPDATE STARTED');

    const updateUrl = 'https://lukaszsiepsiak.github.io/chrome-extension-ts/update.xml';

    try {
        alert('FETCH FOR UPDATE STARTED');
        console.log('FETCH FOR UPDATE STARTED');
        const response = await fetch(updateUrl);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

        const appElement = xmlDoc.querySelector('app');
        const updateCheckElement = appElement?.querySelector('updatecheck');

        if (updateCheckElement) {
            alert('FETCH FOR UPDATE SUCCEEDED');
            const remoteVersion = updateCheckElement.getAttribute('version');
            const codebase = updateCheckElement.getAttribute('codebase');
            alert(`FETCH FOR UPDATE SUCCEEDED. REMOTE VERSION:${remoteVersion} CODEBASE: ${codebase}`);

            if (remoteVersion && codebase) {
                const currentVersion = chrome.runtime.getManifest().version;
                alert(`FETCH FOR UPDATE SUCCEEDED. CURRENT VERSION:${currentVersion}`);

                if (compareVersions(currentVersion, remoteVersion) < 0) {
                    alert('NEW VERSIONCHECK FOR UPDATE, NOTIFY USER');
                    console.log('NEW VERSIONCHECK FOR UPDATE, NOTIFY USER');
                    notifyUser(remoteVersion, codebase);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching or parsing update.xml:', error);
    }
}

// Function to compare versions (returns -1 if v1 < v2, 0 if v1 == v2, 1 if v1 > v2)
function compareVersions(v1: string, v2: string): number {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] || 0;
        const v2Part = v2Parts[i] || 0;

        if (v1Part < v2Part) return -1;
        if (v1Part > v2Part) return 1;
    }

    return 0;
}

// Function to notify the user about the update
function notifyUser(version: string, url: string) {
    chrome.notifications.create('updateNotification', {
        type: 'basic',
        iconUrl: '/icons/icon48.png',
        title: 'Extension Update Available',
        message: `A new version (${version}) of the extension is available. Click to update.`,
        priority: 2,
    });

    chrome.notifications.onClicked.addListener((notificationId) => {
        if (notificationId === 'updateNotification') {
            alert(`NEW VERSIONCHECK FOR UPDATE, updateExtension with url: ${url}`);
            updateExtension(url);
        }
    });
}

function updateExtension(url: string) {
    // chrome.downloads.download({ url, filename: 'chrome-extension-ts.zip' }, (downloadId) => {
    //     alert(`chrome.downloads.download, updateExtension with url: ${url}`);
    //     chrome.downloads.onChanged.addListener(function listener(delta) {
    //         alert(`chrome.downloads.onChanged, updateExtension with url: ${url}`);
    //         if (delta.id === downloadId && delta.state && delta.state.current === 'complete') {
    //             alert(`chrome.runtime.reload, updateExtension with url: ${url}`);
    //             chrome.downloads.onChanged.removeListener(listener);
    //             // After download is complete, reload the extension
    //             chrome.runtime.reload();
    //         }
    //     });
    // });

    chrome.runtime.reload();
}

// Check for updates when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    alert('chrome.runtime.onInstalled');
    if (details.reason === 'install' || details.reason === 'update') {
        checkForUpdate();
    }
});

// Optional: Check for updates periodically, e.g., every day
setInterval(checkForUpdate, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

document?.addEventListener('DOMContentLoaded', () => {
    alert('DOMContentLoaded');
    console.log('DOMContentLoaded');
    const manifest = chrome.runtime.getManifest();

    var extensionName = document.getElementById('extension-name');
    var extensionVersion = document.getElementById('extension-version');

    if (extensionName != null) {
        extensionName.innerText = manifest.name;
    }

    if (extensionVersion != null) {
        extensionVersion.innerText = 'Version: ' + manifest.version;
    }

    var updateCheckButton = document?.getElementById('extension-check-button');

    if (updateCheckButton != null) {
        updateCheckButton.addEventListener('click', () => {
            checkForUpdate();
        });
    }
});
