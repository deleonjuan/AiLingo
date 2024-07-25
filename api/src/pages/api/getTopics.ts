export const prerender = false;
import type { APIRoute } from "astro";
import { getTopicsController } from "../../getTopics/getTopics.controller";

export const POST: APIRoute = async (_props) => {
  const result = await getTopicsController({});

  return new Response(
    JSON.stringify({
      data: {
        content: result,
      },
    })
  );
};
