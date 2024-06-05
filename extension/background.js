chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('Received message', message);
  if (message === 'scrapeAndConvert') {
    console.log('Received scrapeAndConvert message');
    //todo: scrape text from active tab
    //todo: send post request to server http://localhost:3000/convert
    //todo: send response to active tab
    return true; // Keep the message channel open for sendResponse
  } else if (message === 'test') {

    const response = await fetch('http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Testing this extension, can you hear me',
      }),
    });
    sendResponse('Hello from the background script. Running test');
  } else {
    sendResponse('Unknown message');
  }
});