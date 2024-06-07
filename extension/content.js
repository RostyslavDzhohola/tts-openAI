console.log("content.js loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
  console.log("Received message in content script:", request);
  if (request.action === 'showAlert') {
    alert(request.message);
    sendResponse('Alert message sent');
  }
});