export const prerender = false;
import type { APIRoute } from "astro";
import { getLessonController } from "../../getLesson/getLesson.controller";

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();
  const result = await getLessonController({ messages });

  return new Response(
    JSON.stringify({
      data: {
        content: result,
      },
    })
  );
};
