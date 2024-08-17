import { generateObject, generateText, tool } from "ai";
import { aiModel, getConnector } from "../lib/utils";
import { messageSchema } from "./schemas";
import { type IControllerProps } from "../lib/controllerType";
import z from "zod";

const topics = "greetings, family, food, places, sports, hobbies";

const systemPrompt =
  `Now you are a chat specialized in teaching languages, ` +
  `choose an initial topic with which you can have a basic conversation, ` +
  `the topics you can choose from are: ${topics}. ` +
  `Ask both open and closed-ended questions related to the chosen topic, ` +
  `provide feedback by correcting grammatical, pronunciation, or vocabulary errors, ` +
  `suggest alternative phrases, and explain why a correction is necessary.`;

export const chatController = async ({
  messages,
  headers,
}: IControllerProps) => {
  const connector = getConnector(headers);

  try {
    const result = await generateText({
      model: connector(aiModel),
      system: systemPrompt,
      messages,
      toolChoice: "required",
      tools: {
        chatMessage: tool({
          description: "Generate a new message to answer the user",
          parameters: z.object({
            nativeLanguage: z.string().describe("native language of the user"),
            languageToLearn: z
              .string()
              .describe("language the user is trying to learn"),
          }),
          execute: async ({ nativeLanguage, languageToLearn }: any) => {
            return await generateObject({
              model: connector(aiModel),
              system:
                `Now you are a chat specialized in teaching languages, ` +
                `you have to speak in ${languageToLearn}, and also translate the same message to ${nativeLanguage} ` +
                `choose an initial topic with which you can have a basic conversation, ` +
                `the topics you can choose from are: ${topics}. ` +
                `Ask both open and closed-ended questions related to the chosen topic, ` +
                `provide feedback by correcting grammatical, pronunciation, or vocabulary errors, ` +
                `suggest alternative phrases, and explain why a correction is necessary.`,
              schema: messageSchema,
              messages,
            });
          },
        }),
      },
    });

    return result.responseMessages;
  } catch (error) {
    console.log("🚀 chatController ~ e:", error);
    return { error, isError: true };
  }
};
