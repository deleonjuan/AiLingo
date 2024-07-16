import { useEffect, useState } from "react";
import { Message } from "react-native-vercel-ai";
import { isArray } from "lodash";
import { fixMessagesHistory } from "src/utils/helpers";

type IAnswerStatus = "correct" | "incorrect" | "none";
interface IMsg extends Omit<Message, "content"> {
  content: string | any[];
}
interface hookProps {
  messages: IMsg[];
  setMessages: (e: any) => void;
}

const useExerciseInterpreter = ({ messages, setMessages }: hookProps) => {
  const [exercise, setExercise] = useState<any>(null);
  const [answerStatus, setAnswerStatus] = useState<IAnswerStatus>("none");

  const resetValues = () => {
    setAnswerStatus("none");
    setExercise(null);
  };

  const parseQuestion = (tool: any) => {
    setExercise(tool.result.object);
    return;
  };

  const parseAnswerResult = (tool: any) => {
    const isAnswerCorrect = tool.result.object.isAnswerCorrect
      ? "correct"
      : "incorrect";
    setAnswerStatus(isAnswerCorrect);
    return;
  };

  useEffect(() => {
    if (messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];
    // if last message role is user do nothing
    if (lastMsg.role === "user") return;
    // fix history chat
    if (isArray(lastMsg.content) && !lastMsg.content[0].type) {
      setMessages(fixMessagesHistory(messages));
      return;
    }
    // if lastMsg role is "assistant"
    // checks if the response of the api is about the quesion
    // or the result of user's answer
    const tool = lastMsg.content[0];
    if (tool.toolName === "question") parseQuestion(tool);
    if (tool.toolName === "checkAnswer") parseAnswerResult(tool);
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  return { exercise, answerStatus, resetValues };
};

export default useExerciseInterpreter;
