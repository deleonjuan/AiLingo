import { useEffect, useState } from "react";
import { Message } from "react-native-vercel-ai";

type IAnswerStatus = "correct" | "incorrect" | "none";
interface IMsg extends Omit<Message, "content"> {
  content: string | any[];
}
interface hookProps {
  messages: IMsg[];
}

const useExerciseInterpreter = ({ messages }: hookProps) => {
  const [exercise, setExercise] = useState<any>(null);
  const [answerStatus, setAnswerStatus] = useState<IAnswerStatus>("none");

  const parseQuestion = (tool: any) => {
    setExercise(tool.result.object);
    return;
  };

  const parseAnswerResult = (tool: any) => {
    setAnswerStatus(
      tool.result.object.isAnswerCorrect ? "correct" : "incorrect",
    );
    return;
  };

  useEffect(() => {
    if (messages.length < 1) return;
    const lastMsg = messages[messages.length - 1];
    // if last message role is user do nothing
    if (lastMsg.role === "user") return;
    // if lastMsg.role === "assistant"
    // checks if the response of the api is about the quesion
    // or the result of user's answer
    const tool = lastMsg.content[1].content[0];
    if (tool.toolName === "question") parseQuestion(tool);
    if (tool.toolName === "checkAnswer") parseAnswerResult(tool);
  }, [messages]);

  return { exercise, answerStatus };
};

export default useExerciseInterpreter;
