(async () => {
  const response = await chrome.runtime.sendMessage('hello');
  console.log('Received response', response);
})();