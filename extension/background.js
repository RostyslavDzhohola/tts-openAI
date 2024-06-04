chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message', message);
  if (message === 'scrapeAndConvert') {
    sendResponse('Hello from the background script. Running scrapeAndConvert');
  } else if (message === 'test') {
    sendResponse('Hello from the background script. Running test');
  } else {
    sendResponse('Unknown message');
  }
});