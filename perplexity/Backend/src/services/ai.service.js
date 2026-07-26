// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY
// });

// // export async function testAI(){
// //     model.invoke("hii").then((response)=>{
// //         console.log(response.text);

// //     })
// // }

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "use this tool to get the latest information from the internet",
  schema: z.object({
    query: z.string().min(3).describe("the search query to look up the internet."),
  }),
});

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

export async function generateResponse(messages) {
  try {
    const formattedMessages = messages
      .map((msg) => {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        } else if (msg.role === "assistant") {
          return new AIMessage(msg.content);
        }
      })
      .filter(Boolean);

    const response = await agent.invoke({
      messages: [
        new SystemMessage(`
You are an AI assistant.

If the user asks about:
- latest news
- current events
- real-time updates
- recent information

You MUST use the "searchInternet" tool.

Before calling the tool:
- Convert the user's message into a short, clean search query
- Example:
  User: "tell me update of ukraine war"
  Query: "Ukraine Russia war latest news"

Always prefer using the tool for real-time info.
`),
        ...formattedMessages,
      ],
    });

    return response.messages.at(-1).content;
  } catch (error) {
    console.log("⚠️ Gemini failed, switching to Mistral...");

    const formattedMessages = messages
      .map((msg) => {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        } else if (msg.role === "assistant") {
          return new AIMessage(msg.content);
        }
      })
      .filter(Boolean);

    const response = await mistralModel.invoke([
      new SystemMessage(
        "You are a helpful AI assistant. Remember previous conversation.",
      ),
      ...formattedMessages,
    ]);

    return response.content;
  }
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
    new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `),
  ]);

  return response.text;
}

export async function analyzeImage(imageUrl, prompt = "Describe this image") {
  try {
    const response = await geminiModel.invoke([
      new HumanMessage({
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: imageUrl,
          },
        ],
      }),
    ]);

    return response.content;
  } catch (error) {
    console.log("⚠️ Image analysis failed:", error);
    return "Sorry, I couldn't understand the image.";
  }
}