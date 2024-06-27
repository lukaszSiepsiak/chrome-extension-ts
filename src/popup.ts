document.addEventListener("DOMContentLoaded", () => {
  const manifest = chrome.runtime.getManifest();
  const extensionName = document.getElementById("extension-name");
  const extensionVersion = document.getElementById("extension-version");

  if (extensionName != null) {
    extensionName.innerText = manifest.name;
  }

  if (extensionVersion != null) {
    extensionVersion.innerText = "Version: " + manifest.version;
  }
});

document.getElementById("updateButton")?.addEventListener("click", () => {
  chrome.runtime.reload();
});
