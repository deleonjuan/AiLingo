export const prerender = false;
import type { APIRoute } from "astro";
import { getTopicsController } from "../../getTopics/getTopics.controller";

export const POST: APIRoute = async ({ request }) => {
  const { headers } = request;
  const result = await getTopicsController({ headers });

  return new Response(
    JSON.stringify({
      data: {
        content: result,
      },
    })
  );
};
