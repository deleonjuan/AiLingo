import { useEffect, useState } from "react";
import { Message } from "react-native-vercel-ai";
import { isArray } from "lodash";
import { fixMessagesHistory } from "src/utils/helpers";

type IAnswerStatus = "correct" | "incorrect" | "none";
interface IMsg extends Omit<Message, "content"> {
  content: string | any[];
}
interface hookProps {
  messages: IMsg[] | any[];
  setMessages: (e: any) => void;
}

const useExerciseHandler = ({ messages, setMessages }: hookProps) => {
  const [exerciseList, setExercises] = useState<any>([]);
  const [exercise, setExercise] = useState<any>(undefined);
  const [excerciseNum, setExercisesNum] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<IAnswerStatus>("none");

  const onCheckAnswer = (userAnswer: string) => {
    const isAnswerCorrect = exercise.answer.includes(userAnswer)
      ? "correct"
      : "incorrect";
    setAnswerStatus(isAnswerCorrect);
    return;
  };

  const getNextExcercise = () => {
    setAnswerStatus("none");
    setExercisesNum((e) => {
      setExercise(exerciseList[e + 1]);
      return e + 1;
    });
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
    const tool = lastMsg.content[0];
    setExercises(tool.result.object);
    setExercise(tool.result.object[excerciseNum]);
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    exercise,
    answerStatus,
    onCheckAnswer,
    getNextExcercise,
    isLast: exerciseList.length === excerciseNum + 1,
  };
};

export default useExerciseHandler;
