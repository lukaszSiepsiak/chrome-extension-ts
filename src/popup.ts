document?.addEventListener('DOMContentLoaded', () => {
    alert('DOMContentLoaded');

    fillExtensionInformation();
    bindExtensionCheckButton();
    //bindServiceWorkerMessages();
});

const isChromeRuntimeHealthy = () => window.chrome && chrome?.runtime;

function bindExtensionCheckButton() {
    const updateButton = document.getElementById('extension-check-button');

    if (updateButton) {
        updateButton.addEventListener('click', () => {
            checkForUpdates();
        });
    } else {
        console.error('Button not found!');
    }
}

function fillExtensionInformation() {
    if (isChromeRuntimeHealthy()) {
        const manifest = chrome.runtime.getManifest();

        var extensionName = document.getElementById('extension-name');
        var extensionVersion = document.getElementById('extension-version');

        if (extensionName != null) {
            extensionName.innerText = manifest.name;
        }

        if (extensionVersion != null) {
            extensionVersion.innerText = 'Version: ' + manifest.version;
        }
    }
}

function checkForUpdates() {
    if (isChromeRuntimeHealthy() && chrome.runtime.requestUpdateCheck) {
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
}

function bindServiceWorkerMessages() {
    if (isChromeRuntimeHealthy()) {
        const port = chrome.runtime.connect({ name: 'popup' });

        port.onMessage.addListener((message) => {
            if (chrome.runtime.lastError) {
                console.error('Error receiving message:', chrome.runtime.lastError.message);

                port.postMessage(chrome.runtime.lastError.message);
                return;
            }

            if (message.action == 'chromeStarted') {
                alert(`Chrome runtime started`);

                port.postMessage('Chrome runtime started');

                return true;
            } else if (message.action == 'chromeConnected') {
                alert(`Chrome runtime connected`);

                port.postMessage('Chrome runtime connected');

                return true;
            } else if (message.action == 'extensionInstalled') {
                alert(`Extension installed`);

                port.postMessage('chrome.runtime.onInstalled');

                return true;
            } else if (message.action == 'extensionUpdateAvailable') {
                alert(`New version available: ${message.data}`);

                chrome.runtime.reload();

                port.postMessage('Extension reloaded');

                return true;
            }

            return true;
        });
    }
}

checkForUpdates();
