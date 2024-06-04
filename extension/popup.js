document.getElementById('test').addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage('test');
  console.log('Received response', response);
});

document.getElementById('scrapeAndConvert').addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage('scrapeAndConvert');
  console.log('Received response', response);
});