import z from "zod";

export const topicsSchema = z.object({
  topics: z.string().array().describe("lista de topics").array(),
});