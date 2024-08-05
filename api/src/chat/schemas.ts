import z from "zod";

export const messageSchema = z.object({
  feedback: z
    .string()
    .optional()
    .nullable()
    .describe(
      "retroalimentación o correccion de errores gramaticales, de pronunciación o de vocabulario."
    ),
  nextMessage: z
    .string()
    .describe("siguiente mensaje para continuar con la conversacion"),
});
