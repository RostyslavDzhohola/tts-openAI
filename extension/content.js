console.log("content.js loaded");

function scrapeText() {
  // Check for article element
  const article = document.querySelector('article');
  if (article) {
    console.log("Article found");
    return article.innerText;
  }

  // Check for span elements if no article element is found
  const spans = document.querySelectorAll('span');
  if (spans.length > 0) {
    console.log("Span elements found");
    const headersAndSpans = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span:not(a span)');
    return Array.from(headersAndSpans).map(el => el.innerText).join('\n');
  }

  // Check for paragraph elements if no span elements are found
  const paragraphs = document.querySelectorAll('p');
  if (paragraphs.length > 0) {
    console.log("Paragraph elements found");
    return Array.from(paragraphs).map(el => el.innerText).join('\n');
  }

  // Fallback to scraping the entire body if none of the above are found
  return document.body.innerText;
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