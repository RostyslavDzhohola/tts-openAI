console.log("background.js");

async function sendOpenAIRequest(text) {
  // Ensure the text is within the allowed limit
  const maxLength = 4096;
  if (text.length > maxLength) {
    text = text.substring(0, maxLength);
  }

  const response = await fetch("http://localhost:3000/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

  // Check if the response is JSON or plain text
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  } else {
    const data = await response.text();
    return { url: data };
  }
}
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('Received message in background:', message);
  // if (message.action === 'scrapeTest') {
  //   console.log('Handling scrapeTest in background.js');
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     const activeTab = tabs[0];
  //     if (activeTab && activeTab.url.startsWith('http')) {
  //       chrome.tabs.sendMessage(activeTab.id, { action: 'showAlert', message: 'Hello from content script' }, (response) => {
  //         console.log('Response from content script:', response);
  //         sendResponse('Hello from the background script. Running scrapeTest');
  //       });
  //     } else {
  //       console.warn('Content script not injected into this tab:', activeTab.url);
  //       sendResponse('Content script not injected into this tab');
  //     }
  //   });
  //   return true; // Keep the message channel open for sendResponse
  // } else 
  // if (message === "testFetchServer") {
  //   const response = await sendOpenAIRequest("Testing this extension, can you hear me. This is a test of the fetch server. It should return a response from the server.");
  //   sendResponse(response);

  // } else 
  if (message.action === "scrapeTextTest") {
    console.log('Scraping text from the website');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.url.startsWith('http')) {
        chrome.tabs.sendMessage(activeTab.id, { action: 'scrapeTextTest' }, async (response) => {
          console.log('Scraped text:', response);
          sendResponse(response);
          const openAIResponse = await sendOpenAIRequest(response);
          sendResponse(openAIResponse);
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
