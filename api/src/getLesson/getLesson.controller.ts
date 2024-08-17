import { generateObject, generateText, tool } from "ai";
import { aiModel, getConnector } from "../lib/utils";
import z from "zod";
import { systemPrompt } from "./prompts";
import { questionSchema } from "./schemas";
import { type IControllerProps } from "../lib/controllerType";

export const getLessonController = async ({
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
        question: tool({
          description: "Generate a list of exercises",
          parameters: z.object({
            topic: z.string().describe("topic of the exercise"),
            numberOfExercises: z
            .string()
            .describe("number of exercises that must be generated"),
            nativeLanguage: z.string().describe("native language of the user"),
            languageToLearn: z.string().describe("language the user is trying to learn"),
            // wordsLearned: z.string().describe("words the user already know"),
            // initialTopics: z.string().describe("topics the user already know"),
          }),
          execute: async ({
            topic,
            numberOfExercises,
            nativeLanguage,
            languageToLearn,
            // wordsLearned,
            // initialTopics,
          }: any) => {
            return await generateObject({
              model: connector(aiModel),
              system: systemPrompt,
              schema: questionSchema,
              prompt:
                `Generate a list of ${numberOfExercises} exercises using the topic: ${topic}, ` +
                `The word(s) to be translated must be in ${nativeLanguage} and the answers in ${languageToLearn}, the other way around is also valid, ` +
                // `puedes utilizar palabras que el usuario ya sabe como: ${wordsLearned}, siempre que sigan la tematica. ` +
                // `puedes relacionar con topics que el usuario ya sabe como: ${initialTopics}, siempre que sigan la tematica. ` +
                // `Elige de entre las modalidades de: 1OF4 o 1OF3 aleatoreamente para los diferentes ejercicios. `,

                `avoid extra text, just the word(s) that must be translated by the user, ` +
                `eg. "say Hello in spanish"=wrong, "Hello"=correct.`,
            });
          },
        }),
      },
    });

    return result.responseMessages;
  } catch (error) {
    console.log("🚀 getLessonController ~ e:", error);
    return { error, isError: true };
  }
};
