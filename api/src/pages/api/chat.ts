export const prerender = false;
import type { APIRoute } from "astro";
import { chatController } from "../../chat/chat.controller";

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();
  const result = await chatController({ messages, headers: request.headers });

  return new Response(
    JSON.stringify({
      data: {
        content: result,
      },
    })
  );
};
