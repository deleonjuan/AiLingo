import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { createOpenAI } from "@ai-sdk/openai";

export const aiModel = "models/gemini-1.5-flash-latest"
export const connector = createGoogleGenerativeAI({
  apiKey: import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

