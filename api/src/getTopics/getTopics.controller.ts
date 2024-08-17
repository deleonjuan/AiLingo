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
      `Generate a list of 4 to 7 arrays containing between 1 and 2 topics, ` +
      `at least 30% of the arrays must have 2 topics ` +
      `if there are 2 topics, both must be related in some way. `,
  });

  return result.object;
};
