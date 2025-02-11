import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import OpenAI from "openai"
import { BASE_PROMPT, getSystemPrompt } from './prompts';
import { nodebasePrompt } from './defaults/node';
import { reactbasePrompt } from './defaults/react';

console.log("OpenRouter API Key:", process.env.OPENROUTER_API_KEY); 
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

const app = express();
app.use(express.json());


app.get('/template', async (req, res) => {
  const prompt = req.body.prompt;


  const response = await openai.chat.completions.create({
    messages: [
      { role: "user", content: prompt },
      { role: "system", content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra" },
    ],
    model: "deepseek/deepseek-r1:free",
    max_tokens: 200
  })

  const answer = response.choices[0].message.content; 

  if (answer == "react") {
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactbasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [reactbasePrompt]
    })
    return;
  } 

  if (answer === "node") {
    res.json({
      prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodebasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [nodebasePrompt]
    })
    return;
  }

  res.status(403).json({ message: "You cant access this" })
  return;


})




async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: getSystemPrompt() },
      { role: "user", content: "Create a simple todo" }
    ],
    model: "deepseek/deepseek-r1:free",
    max_tokens: 1024,
    stream: true,
  })

  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {  // only log if there's actual content
      process.stdout.write(content);
    }
  }

}
main();