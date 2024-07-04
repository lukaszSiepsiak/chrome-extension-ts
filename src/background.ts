chrome.runtime.onStartup.addListener(() => {
    // This will run each time Chrome starts
    console.log('chrome.runtime.onStartup => Chrome started');

    sendMessage('chromeStarted', null, (message: string) => {
        console.log(`Message from extension after chromeStarted: ${message}`);
    });
});

// chrome.runtime.onConnect.addListener(() => {
//     console.log('chrome.runtime.onConnect => Chrome runtime connected');

//     sendMessage('chromeConnected', null, (message: string) => {
//         console.log(`Message from extension after chromeConnected: ${message}`);
//     });
// });

// chrome.runtime.onInstalled.addListener(() => {
//     console.log('chrome.runtime.onInstalled => Invoked when extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version');

//     sendMessage('extensionInstalled', null, (message: string) => {
//         console.log(`Message from extension after extensionInstalled: ${message}`);
//     });
// });

// chrome.runtime.onUpdateAvailable.addListener((details) => {
//     console.log('chrome.runtime.onUpdateAvailable => Fired when an update is available');

//     sendMessage('extensionUpdateAvailable', details?.version, (message: string) => {
//         console.log(`Message from extension after extensionUpdateAvailable: ${message}`);
//     });
// });

function sendMessage(message: string, data: any, callback: (responseData: any) => void) {
    if (chrome.runtime) {
        const dataTSend = { action: message, data };

        chrome.runtime.sendMessage(dataTSend, callback);
    }
}
