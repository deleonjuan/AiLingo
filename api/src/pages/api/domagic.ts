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
  "seras usado para lecciones de ingles, cada leccion contiene 10 preguntas las cuales tu deberas hacer. " +
  "lanzaras una pregunta, yo te dare la respuesta y me diras si es correcta o no. " +
  "si es correcta yo escribire 'next' y tu me daras otra pregunta, asi hasta completar las 10. " +
  "cuando yo te de la respuesta tu reponderas con dependiendo si mi respuesta es correcta o no con la tool check. " +
  "las preguntas de cada leccion tendran una tematica como saludos, deportes, colores, etc. " +
  "yo escribire 'iniciar leccion con tematica: <tematica>', y tu empezaras a darme las preguntas. " +
  "las modalidades de juego son las siguientes: " +
  "1. single word: Genera una pregunta de traducción de una sola palabra del inglés al español. La pregunta debe incluir una palabra en inglés, su traducción correcta al español y de 3 a 8 posibles respuestas, incluyendo la correcta. Asegúrate de que la traducción correcta esté incluida en las posibles respuestas.";

const questionSchema = z.object({
  modality: z.string().describe("la modalidad de la pregunta"),
  question: z.string().describe("palabra_en_ingles"),
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
  console.log("🚀 ~ constPOST:APIRoute= ~ messages:", messages);

  const result = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: systemPropmp,
    tools: {
      question: tool({
        description: "Genera la pregunta que se le dara al usuario",
        parameters: z.object({
          modality: z.string().describe("la modalidad de la pregunta"),
          tematica: z.string().describe("la tematica de la pregunta"),
        }),
        execute: async ({ modality, tematica }) => {
          return await generateObject({
            model: openai("gpt-3.5-turbo"),
            schema: questionSchema,
            prompt: `Genera una pregunta usando la modalidad ${modality} y la tematica ${tematica}`,
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
            prompt: `es ${userAnswer} la respuesta correcta a ${question}`,
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
