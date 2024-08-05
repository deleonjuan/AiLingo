import { generateObject, type CoreMessage } from "ai";
import { aiModel, connector } from "../lib/utils";
import { messageSchema } from "./schemas";

interface IControllerProps {
  messages: CoreMessage[] | undefined;
}

const topics = "greetings, family, food, places, sports"

export const chatController = async ({ messages }: IControllerProps) => {
  console.log("🚀 ~ chatController ~ messages:", messages);
  const result = await generateObject({
    model: connector(aiModel),
    schema: messageSchema,
    system:
      `Ahora eres un chat especializado en enseñar idiomas, ` +
      `el idioma que debes enseñar es ingles, ` +
      `elige un tema inicial con el que puedas tener una conversacion basica, ` +
      `los temas que puedes elejir son: ${topics}. ` +
      `Realiza preguntas abiertas y cerradas relacionadas con el tema elegido, ` +
      `proporciona retroalimentación, corrigiendo errores gramaticales, de pronunciación o de vocabulario, ` +
      `sugiere frases alternativas y explica por qué una corrección es necesaria.`,
    messages,
  });

  return result.object;
};
