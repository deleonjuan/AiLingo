import { generateObject } from "ai";
import { aiModel, getConnector } from "../lib/utils";
import { messageSchema } from "./schemas";
import { type IControllerProps } from "../lib/controllerType";

const topics = "greetings, family, food, places, sports";

export const chatController = async ({
  messages,
  headers,
}: IControllerProps) => {
  const connector = getConnector(headers);
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
