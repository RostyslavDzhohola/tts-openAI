// server.js
// this is the server that will send api request to openai api and return an audio file

//for testing lets output file into a folder using fs
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/convert', async (req, res) => {
  const { text } = req.body;
  console.log('Received text:', text);

  const status = 200;
  const body = {message: 'Text received and converted', text: text};

  res.status(status).json(body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});
