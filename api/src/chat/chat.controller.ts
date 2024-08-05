import { generateObject, generateText, tool, type CoreMessage } from "ai";
import { aiModel, connector } from "../lib/utils";
import z from "zod";

interface IControllerProps {
  messages: CoreMessage[] | undefined;
}

export const messageSchema = z.object({
  feedback: z
    .string()
    .optional()
    .nullable()
    .describe("retroalimentación o correccion de errores gramaticales, de pronunciación o de vocabulario, evita hacer nuevas preguntas aqui"),
  nextMessage: z
    .string()
    .describe("siguiente mensaje para continuar con la conversacion"),
});

export const chatController = async ({ messages }: IControllerProps) => {
  console.log("🚀 ~ chatController ~ messages:", messages)
  const result = await generateObject({
    model: connector(aiModel),
    schema: messageSchema,
    system:
      `Ahora eres un chat especializado en enseñar idiomas, ` +
      `el idioma que debes enseñar es ingles, ` +
      `realiza preguntas abiertas y cerradas relacionadas con el tema elegido, ` +
      `proporciona retroalimentación, corrigiendo errores gramaticales, de pronunciación o de vocabulario, ` +
      `sugiere frases alternativas y explica por qué una corrección es necesaria.`,
    messages
  });

  return result.object;
};
