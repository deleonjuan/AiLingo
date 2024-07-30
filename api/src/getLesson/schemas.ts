import z from "zod";

export const questionSchema = z
  .object({
    modality: z.string().describe("modalidad de la pregunta"),
    question: z
      .string()
      .describe("palabra/frase que el usuario debera traducir"),
    answer: z.string().array().describe("traducción o traducciones correctas"),
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
        "lista de las palabras usadas en la pregunta y las posibles traducciones correctas de cada palabra"
      ),
  })
  .array();
