import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    return new Response(
      JSON.stringify({
        data: "Hello!, you shouldn't be here"
      })
    );
  };
  