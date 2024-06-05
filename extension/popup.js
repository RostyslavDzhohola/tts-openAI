console.log("popup.js loaded");

document.getElementById('test').addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage('test');
  console.log('Received response', response);
});

document.getElementById('scrapeAndConvert').addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage('scrapeAndConvert');
  console.log('Received response from scrapeAndConvert', response);
});

document.getElementById('readAloud').addEventListener('click', async () => {
  const response = await fetch('http://localhost:3000/audio/speech.mp3');
  if (response.ok) {
    const audioUrl = response.url;
    const audio = new Audio(audioUrl);
    audio.play();
  } else {
    console.error('Failed to fetch audio');
  }
});

document.getElementById('scrapeTest').addEventListener('click', async () => {
  console.log("button clicked crapeTest");
  alert('Hello from the popup script');
  // console.log('Sending message from popup.js to scrapeTest in content.js');
  // const response = await chrome.runtime.sendMessage('scrapeTest');
  // console.log('The alert message is:', response);
  // alert('Received response from scrapeTest: ' + response);
});