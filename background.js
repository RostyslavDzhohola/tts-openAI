// background.js
require('dotenv').config();
const fetch = require('node-fetch');

async function getTTS(text) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 150
    })
  });
  const data = await response.json();
  return data.choices[0].text;
}