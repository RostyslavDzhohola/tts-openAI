// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getText") {
    const articleText = document.querySelector('article') ? document.querySelector('article').innerText : document.body.innerText;
    sendResponse({ text: articleText });
  }
});
