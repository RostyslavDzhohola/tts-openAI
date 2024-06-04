chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('Received message', message);
  if (message === 'scrapeAndConvert') {
    sendResponse('Hello from the background script. Running scrapeAndConvert');
  } else if (message === 'test') {
    // TODO: Send post request to server http://localhost:3000/convert
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