console.log("background.js");

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  console.log("Received message", message);
  if (message === "scrapeAndConvert") {
    console.log("Received scrapeAndConvert message");
    //todo: scrape text from active tab
    //todo: send post request to server http://localhost:3000/convert
    //todo: send response to active tab
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

  } else if (message === "scrapeTest") {
    //todo: resolve the "Could not establish connection. Receiving end does not exist" error
    console.log("Received scrapeTest message");
    sendResponse("Hello from the background script. Running scrapeTest");
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
