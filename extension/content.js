console.log("content.js loaded");

function scrapeText() {
  const article = document.querySelector('article');
  return article ? article.innerText : document.body.innerText;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
  console.log("Received message in content script:", request);
  if (request.action === 'showAlert') {
    alert(request.message);
    sendResponse('Alert message sent');
  } else if (request.action === "scrapeTextTest") {
    const scrapedText = scrapeText();
    sendResponse(scrapedText);
  }
  return true; // Keep the message channel open for sendResponse
});