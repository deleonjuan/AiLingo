import z from "zod";
import { generateObject, generateText, tool, type CoreMessage } from "ai";
import { connector, aiModel } from "../lib/utils";
import { questionSystemPromp, systemPropmp } from "./promps";
import { checkSchema, questionSchema } from "./schemas";

interface IControllerProps {
  messages: CoreMessage[] | undefined;
}

export const doMagicController = async ({ messages }: IControllerProps) => {
  const result = await generateText({
    model: connector(aiModel),
    system: systemPropmp,
    tools: {
      question: tool({
        description:
          "Genera un ejercicio de traduccion respetando la tematica.",
        parameters: z.object({
          tematica: z.string().describe("la tematica de la pregunta"),
          lastModality: z.string().describe("la modalidad usada anteriormente"),
          lastQuestion: z
            .string()
            .describe("la palabra/frase/pregunta que hiciste antes"),
        }),
        execute: async ({ tematica, lastQuestion, lastModality }) => {
          return await generateObject({
            model: connector(aiModel),
            system: questionSystemPromp,
            schema: questionSchema,
            prompt:
              `Elige una modalidad de la lista para generar un ejercicio de traduccion con la tematica ${tematica} ` +
              `la modalidad debe ser diferente a ${lastModality}. ` +
              `y que sea diferente al ejercicio de traduccion anterior que fue traducir o responder: ${lastQuestion}`,
          });
        },
      }),
      checkAnswer: tool({
        description: "validacion de la respuesta del usuario",
        parameters: z.object({
          question: z.string().describe("pregunta"),
          userAnswer: z.string().describe("respuesta del usuario"),
        }),
        execute: async ({ userAnswer, question }) => {
          return await generateObject({
            model: connector(aiModel),
            schema: checkSchema,
            prompt: `es ${userAnswer} la respuesta o traduccion correcta a la palabra/pregunta/frase ${question}`,
          });
        },
      }),
    },
    messages,
  });

  return result.responseMessages;
};
