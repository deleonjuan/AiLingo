export const prerender = false;
import type { APIRoute } from "astro";
import { doMagicController } from "../../domagic/domagic.controller";

/**
 * WARNING
 * this was a previous logic but due to a reeginering this was replaced by getLesson
 * if this logic isn't reused in the future it'll be deprecated and removed
 */

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();
  const result = await doMagicController({ messages });
  
  return new Response(
    JSON.stringify({
      data: {
        content: result,
      },
    })
  );
};
