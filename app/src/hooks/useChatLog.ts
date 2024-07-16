import { useEffect } from "react";

const useChatLog = (messages: any) => {
  useEffect(() => {
    if (messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];

    if (lastMsg.role === "user") {
      console.log("user:", lastMsg.content);
      return;
    }

    if (lastMsg.content[0].type === "tool-result") {
      console.log("🚀 ~ tool-result:", lastMsg.content[0]?.result?.object);
      return;
    }
  }, [messages]);
};

export default useChatLog;
