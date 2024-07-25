export const prerender = false;
import type { APIRoute } from "astro";
import { doMagicController } from "../../domagic/domagic.controller";

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
