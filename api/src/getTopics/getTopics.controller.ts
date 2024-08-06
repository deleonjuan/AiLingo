import { generateObject } from "ai";
import { aiModel, getConnector } from "../lib/utils";
import { systemPrompt } from "./prompts";
import { topicsSchema } from "./schemas";
import { type IControllerProps } from "../lib/controllerType";

export const getTopicsController = async ({ headers }: IControllerProps) => {
  const connector = getConnector(headers);

  const result = await generateObject({
    model: connector(aiModel),
    schema: topicsSchema,
    system: systemPrompt,
    prompt:
      `Genera una lista de 4 a 7 arrays que contengan entre 1 y 2 topics, ` +
      `al menos 30% de los arrays deben tener 2 topics` +
      `si tiene 2 topics ambos deben estar relacionados de alguna forma, `,
  });

  return result.object;
};
