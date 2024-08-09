import { useChat } from "react-native-vercel-ai";
import { useAppSelector } from "./hooks";

interface useAIChatProps {
  path: string;
  initialInput: string;
}

const useAIChat = ({ path, initialInput }: useAIChatProps) => {
  const {
    settings: { apiKey },
  } = useAppSelector((state) => state.settingsReducer);

  const options = {
    options: {
      headers: {
        apiKey,
      },
    },
  };

  const chat = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + path,
    initialInput,
  });

  const handleSubmit = () => chat.handleSubmit({}, options);

  return { ...chat, handleSubmit };
};

export default useAIChat;
