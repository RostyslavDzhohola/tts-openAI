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

const logRequestDetails = async (req, res, next ) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 100ms
  next();
}

app.use(logRequestDetails);

app.post("/convert", async (req, res) => {
  const { text } = req.body;
  console.log("Received text:", text);

  if (!text) {
    res.status(400).send("No text provided");
    return;
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
    });
    
    console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    // Ensure the file is written before sending the response
    await fs.promises.access(speechFile, fs.constants.F_OK);
    res.send("http://localhost:3000/audio/speech.mp3");
  } catch (error) {
    console.error("Error converting text:", error);
    res.status(500).send("An error occurred while converting text");
  }
});

app.get("/audio/speech.mp3", (req, res) => {
  try {
    res.sendFile(speechFile);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).send("An error occurred while sending the file");
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
