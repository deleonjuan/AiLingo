import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { Message } from "react-native-vercel-ai";
import { fixMessagesHistory } from "src/utils/helpers";

interface IMsg extends Omit<Message, "content"> {
  content: string | any[];
}

interface hookProps {
  messages: IMsg[];
  setMessages: (e: any) => void;
}

const useChatHandler = ({ messages, setMessages }: hookProps) => {
  const [messageList, setMessageList] = useState<any[]>([]);

  useEffect(() => {
    if (messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];

    // do nothing if message already exist
    const lastMessageAlreadyExist = messageList.find((m) =>
      m.id.includes(lastMsg.id)
    );
    if (lastMessageAlreadyExist) return;
    
    if (isArray(lastMsg.content) && !lastMsg.content[0].type) {
      setMessages(fixMessagesHistory(messages));
      return;
    }
    
    if (lastMsg.role === "user") {
      setMessageList(list => [...list, lastMsg])
    }else{
      setMessageList(list => [...list, {
        ...lastMsg,
        content: lastMsg.content[0].result.object
      }])
    };

    return;
  }, [messages]);

  return { messageList };
};

export default useChatHandler;
