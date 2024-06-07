console.log("popup.js loaded");

// document.getElementById('testFetchServer').addEventListener('click', async () => {
//   const response = await chrome.runtime.sendMessage('testFetchServer');
//   console.log('Received response', response);
// });

// document.getElementById('scrapeAndConvert').addEventListener('click', async () => {
//   const response = await chrome.runtime.sendMessage('scrapeAndConvert');
//   console.log('Received response from scrapeAndConvert', response);
//   // todo: this does not work, the backgorund doens't have the coresponding action
// });

document.getElementById('readAloud').addEventListener('click', async () => {
  const response = await fetch('http://localhost:3000/audio/speech.mp3', { cache: 'no-store' });
  if (response.ok) {
    const audioUrl = response.url;
    const audio = new Audio(audioUrl);
    audio.play();
  } else {
    console.error('Failed to fetch audio');
  }
});

// document.getElementById('scrapeTest').addEventListener('click', async () => {
//   console.log("button clicked scrapeTest");
//   try {
//     const response = await chrome.runtime.sendMessage({ action: 'scrapeTest' });
//     console.log('Received response from background:', response);
//     alert('Received response from scrapeTest: ' + response);
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// });

document.getElementById('scrapeTextTest').addEventListener('click', async () => {
  console.log("button clicked scrapeTextTest");
  try {
    const response = await chrome.runtime.sendMessage({ action: 'scrapeTextTest' });
    console.log('Received response from background:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
});
