import z from "zod";

export const questionSchema = z.object({
  modality: z.string().describe("la modalidad de la pregunta"),
  question: z.string().describe("palabra_a_traducir"),
  answer: z.string().describe("traducción_correcta"),
  possibleAnswers: z
    .string()
    .array()
    .describe("una seleccion de posibles respuestas"),
  transaltions: z
    .object({
      word: z.string(),
      transaltion: z.string().array(),
    })
    .array()
    .describe(
      "una lista de las palabras usadas en la pregunta y las posibles traducciones correctas de cada palabra"
    ),
});

export const checkSchema = z.object({
  isAnswerCorrect: z
    .boolean()
    .describe("indica si la respuesta del usuario fue correcta o incorrecta"),
});
