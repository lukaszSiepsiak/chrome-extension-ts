document?.addEventListener('DOMContentLoaded', () => {
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
    } else {
        console.error('Button not found!');
    }
});

function checkForUpdates() {
    chrome.runtime.requestUpdateCheck((status, details) => {
        if (status === 'update_available') {
            alert('New version available: ' + details?.version);
            // Logic to handle the update, for example, reload the extension
            chrome.runtime.reload();

            alert('Extension was reloaded successfully');
        } else if (status === 'no_update') {
            alert('No new updates available.');
        } else if (status === 'throttled') {
            alert('Update check throttled. Trying again later.');
            // Schedule the next check in a few hours
            setTimeout(checkForUpdates, 4 * 60 * 60 * 1000); // 4 hours
        } else {
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
    } else if (message.action == 'chromeConnected') {
        alert(`Chrome runtime connected. Sender url: ${sender.url}`);

        sendResponse('Chrome runtime connected');

        return true;
    } else if (message.action == 'extensionInstalled') {
        alert(`Extension installed. Sender url: ${sender?.url}`);

        sendResponse('Extension installed');

        return true;
    } else if (message.action == 'extensionUpdateAvailable') {
        alert(`New version available: ${message.data}. Sender url: ${sender.url}`);

        chrome.runtime.reload();

        sendResponse('Extension reloaded');

        return true;
    }
});
