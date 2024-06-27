// Function to check for updates
async function checkForUpdate() {
  const updateUrl =
    "https://lukaszsiepsiak.github.io/chrome-extension-ts/update.xml";

  try {
    const response = await fetch(updateUrl);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const appElement = xmlDoc.querySelector("app");
    const updateCheckElement = appElement?.querySelector("updatecheck");

    if (updateCheckElement) {
      const remoteVersion = updateCheckElement.getAttribute("version");
      const codebase = updateCheckElement.getAttribute("codebase");

      if (remoteVersion && codebase) {
        const currentVersion = chrome.runtime.getManifest().version;

        if (compareVersions(currentVersion, remoteVersion) < 0) {
          notifyUser(remoteVersion, codebase);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching or parsing update.xml:", error);
  }
}

// Function to compare versions (returns -1 if v1 < v2, 0 if v1 == v2, 1 if v1 > v2)
function compareVersions(v1: string, v2: string): number {
  const v1Parts = v1.split(".").map(Number);
  const v2Parts = v2.split(".").map(Number);

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
  chrome.notifications.create("updateNotification", {
    type: "basic",
    iconUrl: "icon.png",
    title: "Extension Update Available",
    message: `A new version (${version}) of the extension is available. Click to update.`,
    priority: 2,
  });

  chrome.notifications.onClicked.addListener((notificationId) => {
    if (notificationId === "updateNotification") {
      // Open the URL to download the update
      chrome.tabs.create({ url: url });
    }
  });
}

// Check for updates when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install" || details.reason === "update") {
    checkForUpdate();
  }
});

// Optional: Check for updates periodically, e.g., every day
setInterval(checkForUpdate, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
