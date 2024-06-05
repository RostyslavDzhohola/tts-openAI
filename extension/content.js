// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request === 'scrapeText') {
//     const text = scrapeTextForAudio();
//     sendResponse({ ok: true, text });
//   }
// });

async function scrapeTextForAudio() {
  console.log('Scraping text for audio');
  let text = '';
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const articleElement = document.querySelector('article');
      if (articleElement) {
        text = articleElement.textContent;
      } else {
        const bodyElement = document.querySelector('body');
        if (bodyElement) {
          text = bodyElement.textContent;
        }
      }
    }
  });
  console.log('Scraped text:', text);
  return text;
}
