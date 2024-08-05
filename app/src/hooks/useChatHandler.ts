import { IChatMessage } from "@screens/chat/message";
import { useEffect, useState } from "react";

interface hookProps {
  messages: IChatMessage[];
  setMessages: (e: any) => void;
}

const useChatHandler = ({ messages, setMessages }: hookProps) => {
  const [messageList, setMessageList] = useState<IChatMessage[]>([]);

  const fixMessagesHistory = () => {
    const newArr = Array.from(messages);
    const lastMsg = messages[messages.length - 1];

    if (typeof lastMsg.content === "object") {
      newArr.pop();

      const { feedback } = lastMsg.content;

      newArr.push({
        ...lastMsg,
        content: `${feedback ? feedback + "," : ""} ${lastMsg.content.nextMessage}`,
      });
    }

    setMessages(newArr);
  };

  useEffect(() => {
    if (messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];

    // do nothing if message already exist
    const lastMessageAlreadyExist = messageList.find((m) =>
      m.id.includes(lastMsg.id)
    );
    if (lastMessageAlreadyExist) return;

    //
    if (
      typeof lastMsg.content === "object" &&
      "nextMessage" in lastMsg.content
    ) {
      let newMsgs: IChatMessage[] = [];
      if (lastMsg.content.feedback) {
        newMsgs.push({
          ...lastMsg,
          id: `${lastMsg.id}1`,
          msgType: "feedback",
          content: lastMsg.content.feedback,
        });
      }
      newMsgs.push({
        ...lastMsg,
        id: `${lastMsg.id}0`,
        msgType: "message",
        content: lastMsg.content.nextMessage,
      });
      setMessageList((list) => [...list, ...newMsgs]);
      fixMessagesHistory();
    }

    if (lastMsg.role === "user") {
      setMessageList((list) => [...list, { ...lastMsg, msgType: "message" }]);
    }

    return;
  }, [messages]);

  return { messageList };
};

export default useChatHandler;
