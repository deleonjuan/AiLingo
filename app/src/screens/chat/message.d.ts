export type IChatMessage = {
  id: string;
  role: "user" | "tool";
  content:
    | string
    | {
        feedback: string;
        nextMessage: string;
        text?: string,
        type?: string,
        translation: string,
      };
};
