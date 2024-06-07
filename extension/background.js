console.log("background.js");

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('Received message in background:', message);
  if (message.action === 'scrapeTest') {
    console.log('Handling scrapeTest in background.js');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.url.startsWith('http')) {
        chrome.tabs.sendMessage(activeTab.id, { action: 'showAlert', message: 'Hello from content script' }, (response) => {
          console.log('Response from content script:', response);
          sendResponse('Hello from the background script. Running scrapeTest');
        });
      } else {
        console.warn('Content script not injected into this tab:', activeTab.url);
        sendResponse('Content script not injected into this tab');
      }
    });
    return true; // Keep the message channel open for sendResponse
  } else if (message === "testFetchServer") {
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

  } else if (message.action === "scrapeTextTest") {
    console.log('Scraping text from the website');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.url.startsWith('http')) {
        chrome.tabs.sendMessage(activeTab.id, { action: 'scrapeTextTest' }, (response) => {
          console.log('Scraped text:', response);
          sendResponse(response);
        });
      } else {
        console.warn('Content script not injected into this tab:', activeTab.url);
        sendResponse('Content script not injected into this tab');
      }
    });
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
