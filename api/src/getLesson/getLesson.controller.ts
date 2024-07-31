import { generateObject, generateText, tool, type CoreMessage } from "ai";
import { aiModel, connector } from "../lib/utils";
import z from "zod";
import { questionSystemPromp, systemPrompt } from "./prompts";
import { questionSchema } from "./schemas";

interface IControllerProps {
  messages: CoreMessage[] | undefined;
}

export const getLessonController = async ({ messages }: IControllerProps) => {
  const result = await generateText({
    model: connector(aiModel),
    system: systemPrompt,
    messages,
    toolChoice: "required",
    tools: {
      question: tool({
        description: "Genera una lista de ejercicios",
        parameters: z.object({
          tematica: z.string().describe("la tematica de la pregunta"),
          numberOfExercises: z.string().describe("numero de ejercicios que se deben generar"),
          wordsLearned: z.string().describe("palabras que el usuario ya sabe"),
          initialTopics: z.string().describe("topics que el usuario ya sabe"),
        }),
        execute: async ({ tematica, numberOfExercises, wordsLearned, initialTopics }) => {
          return await generateObject({
            model: connector(aiModel),
            system: questionSystemPromp,
            schema: questionSchema,
            prompt:
              `Genera una lista de ${numberOfExercises} ejercicios de traduccion respetando la tematica ${tematica}. ` +
              `puedes utilizar palabras que el usuario ya sabe como: ${wordsLearned}, siempre que sigan la tematica. ` +
              `puedes relacionar con topics que el usuario ya sabe como: ${initialTopics}, siempre que sigan la tematica. ` +
              `Elige modalidades aleatorias para los diferentes ejercicios. `,
          });
        },
      }),
    },
  });

  return result.responseMessages;
};
