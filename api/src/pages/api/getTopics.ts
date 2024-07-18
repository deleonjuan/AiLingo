export const prerender = false;
import type { APIRoute } from "astro";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import z from "zod";

const openai = createOpenAI({
  apiKey: import.meta.env.OPEN_API_KEY ?? process.env.OPEN_API_KEY,
});

const topicsSchema = z.object({
  topics: z.string().array().describe("lista de topics").array(),
});

const systemPropmp =
  "A partir de ahora actuaras como una api, no agregaras texto plano a tus respuestas. " +
  "seras usado para lecciones de ingles y deberas generar diferentes topicos. " +
  "como por ejemplo saludos, palabras basicas, personas, colores, animales, etc. " +
  "a partir de los topicos que generes se crearan distintos ejercicios de traduccion relacionados. " +
  "";

export const POST: APIRoute = async (_props) => {
  const result = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: topicsSchema,
    system: systemPropmp,
    prompt:
      `Genera una lista de 8 a 12 arrays que contengan entre 1 y 2 topics, ` +
      `si tiene 2 topics ambos deben estar relacionados de alguna forma, ` +
      `al menos 30% deben tener 2 topics`,
  });

  return new Response(
    JSON.stringify({
      data: {
        content: result.object,
      },
    })
  );
};
