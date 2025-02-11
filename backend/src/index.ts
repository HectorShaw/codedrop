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
      { role: "user", content: "what is 20 + 20" }
    ],
  })

  console.log(completion.choices[0].message)
}
main();





// async function main() {
//     try {
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//                 "HTTP-Referer": "http://localhost:3000",
//                 "X-Title": "Local Test",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "model": "deepseek/deepseek-r1:free",
//                 "messages": [
//                     {
//                         "role": "user",
//                         "content": "What is 20 + 20"
//                     }
//                 ]
//             })
//         });

//         const data = await response.json();
        
//         // First log the entire response to see what we're getting
//         console.log("Full Response:", JSON.stringify(data, null, 2));
        
//         // Then check if we have a valid response before accessing choices
//         if (data.choices && data.choices.length > 0) {
//             console.log("AI Response:", data.choices[0].message.content);
//         } else {
//             console.log("No response choices found. API Response:", data);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// main();