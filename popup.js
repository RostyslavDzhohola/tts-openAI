// popup.js
document.getElementById('readArticle').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found");
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, { action: "getText" }, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
        return;
      }
      if (!response || !response.text) {
        console.error("No response or text from content script");
        return;
      }
      chrome.runtime.sendMessage({ action: "getTTS", text: response.text }, (response) => {
        if (response.error) {
          console.error("Error from background:", response.error);
        } else {
          playAudio(response.audioContent);
        }
      });
    });
  });
});

document.getElementById('testAPI').addEventListener('click', () => {
  const testText = "This is a test text for the OpenAI API.";
  chrome.runtime.sendMessage({ action: "getTTS", text: testText }, (response) => {
    if (response.error) {
      console.error("Error from background:", response.error);
    } else {
      playAudio(response.audioContent);
    }
  });
});

function playAudio(audioContent) {
  const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
  audio.play();
}
