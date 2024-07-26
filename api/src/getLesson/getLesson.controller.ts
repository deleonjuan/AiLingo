import { generateObject, generateText, tool, type CoreMessage } from "ai";
import { aiModel, connector } from "../lib/utils";
import z from "zod";
import { questionSystemPromp, systemPropmp } from "./promps";
import { questionSchema } from "./schemas";

interface IControllerProps {
  messages: CoreMessage[] | undefined;
}

export const getLessonController = async ({ messages }: IControllerProps) => {
  const result = await generateText({
    model: connector(aiModel),
    system: systemPropmp,
    messages,
    toolChoice: "required",
    tools: {
      question: tool({
        description: "Genera una lista de ejercicios",
        parameters: z.object({
          tematica: z.string().describe("la tematica de la pregunta"),
        }),
        execute: async ({ tematica }) => {
          return await generateObject({
            model: connector(aiModel),
            system: questionSystemPromp,
            schema: questionSchema,
            prompt:
              `Genera una lista de 3 ejercicios de traduccion respetando la tematica ${tematica}` +
              `Elige modalidades aleatorias para los diferentes ejercicios. `,
          });
        },
      }),
    },
  });

  return result.responseMessages;
};
