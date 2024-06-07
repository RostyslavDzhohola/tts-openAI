console.log("background.js");

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('Received message in background:', message);
  if (message.action === 'scrapeTest') {
    console.log('Handling scrapeTest in background.js');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'showAlert', message: 'Hello from content script' }, (response) => {
        console.log('Response from content script:', response);
        sendResponse('Hello from the background script. Running scrapeTest');
      });
    });
    return true; // Keep the message channel open for sendResponse
  } else if (message === "test") {
    const response = await fetch("http://localhost:3000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Testing this extension, can you hear me",
      }),
    });
    sendResponse("Hello from the background script. Running test");

  } else if (message.action === "scrapeTest") {
    console.log('Handling scrapeTest in background.js');
    sendResponse('Hello from the background script. Running scrapeTest');
    return true; // Keep the message channel open for sendResponse
  } else {
    sendResponse("Unknown message");
  }
});

chrome.runtime.onConnectExternal.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log("Received message from external script. running in port", msg);
    port.send("Running port ");
  });
});
