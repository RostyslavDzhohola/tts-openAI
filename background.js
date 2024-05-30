// background.js
const API_KEY = ''; // Hardcode your API key here

async function getTTS(text) {
  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'tts-1', // Correct model parameter
        voice: 'alloy', // Example voice parameter
        input: text, // Correct input parameter
        output_format: 'mp3'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from API:', errorText);
      throw new Error('Failed to fetch TTS data');
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return base64Audio;
  } catch (error) {
    console.error('Error in getTTS function:', error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTTS") {
    getTTS(request.text).then(audioContent => {
      sendResponse({ audioContent });
    }).catch(error => {
      console.error("Error generating TTS:", error);
      sendResponse({ error: error.message });
    });
    return true;
  }
});
