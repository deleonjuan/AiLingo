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
        .describe("traducción o traducciones correctas"),
      possibleAnswers: z
        .string()
        .array()
        .describe("seleccion de posibles respuestas"),
      translations: z
        .object({
          word: z.string(),
          translation: z.string().array(),
        })
        .array()
        .describe(
          "lista de palabras usadas en la pregunta/frase que el usuario debe traducir y las posibles traducciones correctas de cada palabra"
        ),
    })
    .array(),
});
