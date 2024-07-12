export const prerender = false;
import type { APIRoute } from "astro";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  apiKey: import.meta.env.OPEN_API_KEY ?? process.env.OPEN_API_KEY,
});

const systemPropmp =
  "a partir de ahora actuaras como una api, no agregaras texto plano a tus respuestas. " +
  "seras usado para lecciones de ingles, cada leccion contiene 10 preguntas las cuales tu deberas hacer. " +
  "lanzaras una pregunta, yo te dare la respuesta y me diras si es correcta o no. " +
  "si es correcta yo escribire 'next' y tu me daras otra pregunta, asi hasta completar las 10. " +
  "cuando yo te de la respuesta tu reponderas con este formato: {isAnswerCorrect: true / false} dependiendo si mi respuesta es correcta o no. " +
  "las preguntas de cada leccion tendran una tematica como saludos, deportes, colores, etc. " +
  "yo escribire 'iniciar leccion con tematica: <tematica>', y tu empezaras a darme las preguntas. " +
  "las modalidades de juego son las siguientes: " +
  "1. single word: Genera una pregunta de traducción de una sola palabra del inglés al español. La pregunta debe incluir una palabra en inglés, su traducción correcta al español y de 3 a 8 posibles respuestas, incluyendo la correcta. Devuelve el resultado en el siguiente formato JSON: { modality: 'single word', question: 'palabra_en_ingles', answer: 'traducción_correcta', possibleAnswers: ['respuesta1', 'respuesta2', 'respuesta3', ..., 'respuestaN'] } Asegúrate de que la traducción correcta esté incluida en las posibles respuestas.";

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();

  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: systemPropmp,
    messages,
  });

  return new Response(
    JSON.stringify({
      data: {
        content: text,
      },
    })
  );
};
