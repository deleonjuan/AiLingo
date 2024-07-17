export const prerender = false;
import type { APIRoute } from "astro";
import { generateObject, generateText, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import z from "zod";

const openai = createOpenAI({
  apiKey: import.meta.env.OPEN_API_KEY ?? process.env.OPEN_API_KEY,
});

const systemPropmp =
  "A partir de ahora actuaras como una api, no agregaras texto plano a tus respuestas. " +
  "seras usado para lecciones de ingles y deberas generar ejercicios de traduccion." +
  "generaras un ejercicio y el usuario te dara la respuesta y diras si es correcta o no. " +
  "si el usuario escribe 'next' vas a generar un nuevo ejercicio de tracuccion. " +
  "cuando el usuario responda tu responderas dependiendo si la respuesta es correcta o no con la tool check. " +
  "los ejercicios tendran una tematica como saludos, deportes, colores, etc. " +
  "el usuario escribira 'iniciar leccion con tematica: <tematica>', y tu empezaras a generar los ejercicios. ";

const questionSystemPromp =
  "Las modalidades de juego que puedes elegir son las siguientes: " +
  "1. 1OF4: Genera una sola palabra relacionada a la tematica que el usuario debera traducir y 4 posibles respuestas, incluyendo la correcta. Asegúrate de que la traducción correcta esté incluida en las posibles respuestas." +
  "2. 1OF3: Genera una sola palabra relacionada a la tematica que el usuario debera traducir y 3 posibles respuestas, incluyendo la correcta. Asegúrate de que la traducción correcta esté incluida en las posibles respuestas." +
  "";

const questionSchema = z.object({
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

const checkSchema = z.object({
  isAnswerCorrect: z
    .boolean()
    .describe("indica si la respuesta del usuario fue correcta o incorrecta"),
});

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();

  const result = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: systemPropmp,
    tools: {
      question: tool({
        description:
          "Genera un ejercicio de traduccion respetando la tematica.",
        parameters: z.object({
          tematica: z.string().describe("la tematica de la pregunta"),
          lastModality: z.string().describe("la modalidad usada anteriormente"),
          lastQuestion: z
            .string()
            .describe("la palabra/frase/pregunta que hiciste antes"),
        }),
        execute: async ({ tematica, lastQuestion, lastModality }) => {
          return await generateObject({
            model: openai("gpt-3.5-turbo"),
            system: questionSystemPromp,
            schema: questionSchema,
            prompt:
              `Elige una modalidad de la lista para generar un ejercicio de traduccion con la tematica ${tematica} ` +
              `la modalidad debe ser diferente a ${lastModality}. ` +
              `y que sea diferente al ejercicio de traduccion anterior que fue traducir o responder: ${lastQuestion}`,
          });
        },
      }),
      checkAnswer: tool({
        description: "validacion de la respuesta del usuario",
        parameters: z.object({
          question: z.string().describe("pregunta"),
          userAnswer: z.string().describe("respuesta del usuario"),
        }),
        execute: async ({ userAnswer, question }) => {
          return await generateObject({
            model: openai("gpt-3.5-turbo"),
            schema: checkSchema,
            prompt: `es ${userAnswer} la respuesta o traduccion correcta a la palabra/pregunta/frase ${question}`,
          });
        },
      }),
    },
    messages,
  });

  return new Response(
    JSON.stringify({
      data: {
        content: result.responseMessages,
      },
    })
  );
};
