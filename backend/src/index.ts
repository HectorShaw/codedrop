import * as dotenv from 'dotenv';
import OpenAI from "openai"
dotenv.config();

console.log("OpenRouter API Key:", process.env.OPENROUTER_API_KEY); // Add this debug line


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1:free",
    messages: [
      { role: "user", content: "Create a simple todo" }
    ],
    stream: true
  })


}
main();