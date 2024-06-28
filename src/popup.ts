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
});
