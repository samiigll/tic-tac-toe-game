import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// Create new assistant
// const assistant = await openai.beta.assistants.create({
//     name: "My First Assistant",
//     instructions: "This is my first assistant",
//     tools: [
//         {
//             type:"code_interpreter",
//         },
//     ],
//     model:"gpt-4-1106-preview",
// });    

const assistant = await openai.beta.assistants.retrieve(
    "ASSISTANT_ID"
);

// Threads
// Create Thread
const Thread = await openai.beta.threads.create();

// Create Message
const message = await openai.beta.threads.messages.create(threads.id, {
    role: "user",
    content: "Hello, I'm a user!"
});

// Run assistant
const run = await openai.beta.assistants.run(assistant.id, {
    assistant_id: assistant.id,
    intructions: "This is my first assistant",
});

console.log(run);


import express from "express";
const app = express();
import dotenv from "dotenv";
import { OpenAI } from "openai";
let port = 3000;

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an asynchronous function
async function createAssistant(req, res) {
  //create new assistant
  const assistant = await openai.beta.assistants.create({
    name: "tic-tac-toe-game",
    instructions:
      "You play tic-toc-toe very well. Your opponents can't beat you. ",
    tools: [
      {
        type: "code_interpreter",
        function: "your_function_here",
      },
    ],
    model: "gpt-4",
  });

  return assistant;
}

app.get("/create-assistant", async (req, res) => {
  res.send(await createAssistant());
});

app.post('/create-assistant', createAssistant);

app.listen(port, () => console.log(`Server running on port ${port}`));