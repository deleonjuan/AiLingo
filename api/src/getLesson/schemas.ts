import z from "zod";

export const questionSchema = z.object({
  exercises: z
    .object({
      modality: z
        .string()
        .describe("modality of the exercise that can be 1OF4 or 1OF3"),
      exercise: z.string().describe("exercise the user must translate"),
      answer: z
        .string()
        .array()
        .describe("correct translation"),
      possibleAnswers: z
        .string()
        .array()
        .describe("list of possible answers, including the correct translation of the exercise"),
      translations: z
        .object({
          word: z.string(),
          translation: z.string().array(),
        })
        .array()
        .describe(
          "list of the words used in the exercise and their corresponding translation"
        ),
    })
    .array(),
});
