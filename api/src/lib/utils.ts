import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { createOpenAI } from "@ai-sdk/openai";

// models/gemini-1.5-fast-latest is failing, using pro instead as a temp solution
export const aiModel = "models/gemini-1.5-pro-latest";

export const getConnector = (headers: Headers) => {
  const userApiKey = headers.get("apikey");
  const fixedApiKey = userApiKey && userApiKey !== "" ? userApiKey : undefined;

  const apiKey =
    fixedApiKey ??
    import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  return createGoogleGenerativeAI({
    apiKey,
  });
};
