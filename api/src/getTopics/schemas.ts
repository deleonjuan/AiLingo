import z from "zod";

export const topicsSchema = z.object({
  topics: z.string().array().describe("topic list").array(),
});
