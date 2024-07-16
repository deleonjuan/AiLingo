export const prerender = false;
import type { APIRoute } from "astro";
import { generateObject, generateText, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import z from "zod";

const openai = createOpenAI({
  apiKey: import.meta.env.OPEN_API_KEY ?? process.env.OPEN_API_KEY,
});

const systemPropmp =
  "a partir de ahora actuaras como una api, no agregaras texto plano a tus respuestas. " +
  "seras usado para lecciones de ingles y deberas generar preguntas de traduccion." +
  "lanzaras una pregunta, yo te dare la respuesta y me diras si es correcta o no. " +
  "si el usuario escribe 'next' vas a generar una pregunta/palabra/frase differente a la anterior. " +
  "cuando el usuario responda tu responderas dependiendo si la respuesta es correcta o no con la tool check. " +
  "las preguntas de cada leccion tendran una tematica como saludos, deportes, colores, etc. " +
  "yo escribire 'iniciar leccion con tematica: <tematica>', y tu empezaras a darme las preguntas. ";

const questionSystemPromp =
  "las modalidades de juego son las siguientes: " +
  "1. 1de4: Genera una sola palabra relacionada a la tematica que el usuario debera traducir y 4 posibles respuestas, incluyendo la correcta. Asegúrate de que la traducción correcta esté incluida en las posibles respuestas.";

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
          "Genera una pregunta/palabra/frase que el usuario debera traducir respetando la tematica y la modalidad.",
        parameters: z.object({
          tematica: z.string().describe("la tematica de la pregunta"),
          lastQuestion: z
            .string()
            .describe("la palabra/frase/pregunta que hiciste antes"),
        }),
        execute: async ({ tematica, lastQuestion }) => {
          return await generateObject({
            model: openai("gpt-3.5-turbo"),
            system: questionSystemPromp,
            schema: questionSchema,
            prompt:
              `Usa una modalidad para generar un ejercicio de traduccion con la tematica ${tematica} ` +
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
