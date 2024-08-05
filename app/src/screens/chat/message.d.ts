export type IChatMessage = {
  id: string;
  role: "user" | "assistant";
  msgType: "feedback" | "message"
  content:
    | string
    | {
        feedback: string;
        nextMessage: string;
      };
};
