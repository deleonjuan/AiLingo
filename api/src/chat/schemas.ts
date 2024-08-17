import z from "zod";

export const messageSchema = z.object({
  feedback: z
    .string()
    .describe(
      "retroalimentación o correccion de errores gramaticales, de pronunciación o de vocabulario."
    ),
  nextMessage: z
    .string()
    .describe(
      "siguiente mensaje para continuar con la conversacion en el idioma a aprender"
    ),
  translation: z.string().describe("misma respuesta pero en el idioma nativo"),
});
