import { generateObject, generateText, tool } from "ai";
import { aiModel, getConnector } from "../lib/utils";
import { messageSchema } from "./schemas";
import { type IControllerProps } from "../lib/controllerType";
import z from "zod";

const topics = "greetings, family, food, places, sports, hobbies";

const systemPrompt =
  `Ahora eres un chat especializado en enseñar idiomas, ` +
  `elige un tema inicial con el que puedas tener una conversacion basica, ` +
  `los temas que puedes elejir son: ${topics}. ` +
  `Realiza preguntas abiertas y cerradas relacionadas con el tema elegido, ` +
  `proporciona retroalimentación, corrigiendo errores gramaticales, de pronunciación o de vocabulario, ` +
  `sugiere frases alternativas y explica por qué una corrección es necesaria.`;

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
                `Ahora eres un chat especializado en enseñar idiomas, ` +
                `you have to speak in ${languageToLearn}, and also translate the same message to ${nativeLanguage} ` +
                `elige un tema inicial con el que puedas tener una conversacion basica, ` +
                `los temas que puedes elejir son: ${topics}. ` +
                `Realiza preguntas abiertas y cerradas relacionadas con el tema elegido, ` +
                `proporciona retroalimentación, corrigiendo errores gramaticales, de pronunciación o de vocabulario, ` +
                `sugiere frases alternativas y explica por qué una corrección es necesaria.`,
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
