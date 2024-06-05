console.log("content.js");

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
  if (request === 'alertMessage') {
    alert(request.message);
    sendResponse('Alert message sent');
  }
});