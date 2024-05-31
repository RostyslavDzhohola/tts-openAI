// server.js
// this is the server that will send api request to openai api and return an audio file

//for testing lets output file into a folder using fs
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); //

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const speechFile = path.resolve("./audio/speech.mp3");

app.post("/convert", async (req, res) => {
  const { text } = req.body;
  console.log("Received text:", text);

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
    });
    console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    res.send("Text converted and saved to speech.mp3");
  } catch (error) {
    console.error("Error converting text:", error);
    res.status(500).send("An error occurred while converting text");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  next();
});
