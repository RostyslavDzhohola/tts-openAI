document.getElementById('test').addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage('test');
  console.log('Received response', response);
});

document.getElementById('scrapeAndConvert').addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage('scrapeAndConvert');
  console.log('Received response', response);
});

document.getElementById('readAloud').addEventListener('click', async () => {
  const response = await fetch('http://localhost:3000/audio/speech.mp3')
  if (response.ok) {
    const audioUrl = response.url;
    const audio = new Audio(audioUrl);
    audio.play();
  } else {
    console.error('Failed to fetch audio');
  }
});