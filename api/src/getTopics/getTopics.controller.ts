import { generateObject, type CoreMessage } from "ai";
import { connector, aiModel } from "../lib/utils";
import { systemPropmp } from "./promps";
import { topicsSchema } from "./schemas";

interface IControllerProps {
  messages?: CoreMessage[] | undefined;
}

export const getTopicsController = async (_props: IControllerProps) => {
  const result = await generateObject({
    model: connector(aiModel),
    schema: topicsSchema,
    system: systemPropmp,
    prompt:
      `Genera una lista de 4 a 7 arrays que contengan entre 1 y 2 topics, ` +
      `si tiene 2 topics ambos deben estar relacionados de alguna forma, ` +
      `al menos 30% deben tener 2 topics`,
  });

  return result.object;
};
