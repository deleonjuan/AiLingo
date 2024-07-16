import { useEffect, useState } from "react";
import { View } from "react-native";
import { useChat } from "react-native-vercel-ai";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import useExerciseInterpreter from "src/hooks/useExerciseInterpreter";
import useChatLog from "src/hooks/useChatLog";
import ChooseTheImage from "@components/Exercise/ChooseTheImage.exercise";
import ExerciseFooter from "@components/Exercise/Footer";
import ExcerciseHeaeder from "@components/Exercise/Header";

export default function ExerciseScreen() {
  const { styles } = useStyles(stylesheet);
  const [questionsLeft, setQuestionsLeft] = useState<number>(3);
  const [userAnswer, setUseAnswer] = useState<any>("");
  const { messages, isLoading, handleSubmit, setMessages, setInput } = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + "domagic",
    initialInput: "iniciar leccion con tematica: colores",
  });
  useChatLog(messages);
  const { exercise, answerStatus, resetValues } = useExerciseInterpreter({
    messages,
    setMessages,
  });

  // starts the chat automatically
  useEffect(() => {
    handleSubmit({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetValue = (userAnswer: string) => {
    setInput(userAnswer);
    setUseAnswer(userAnswer);
  };

  const onContinue = async () => {
    if (questionsLeft === 1) {
      console.log("FINAL");
      return;
    }
    setUseAnswer("");
    resetValues();
    setQuestionsLeft((n) => n - 1);
    handleSubmit({});
  };

  useEffect(() => {
    if (answerStatus === "correct") setInput("next");
  }, [answerStatus, setInput]);

  return (
    <View style={styles.page}>
      {exercise && <ExcerciseHeaeder exercise={exercise} />}
      <View style={{ flex: 3, display: "flex" }}>
        {exercise && (
          <ChooseTheImage
            content={exercise}
            setValue={onSetValue}
            value={userAnswer}
          />
        )}
        <ExerciseFooter
          answerStatus={answerStatus}
          submitAnswer={handleSubmit}
          onContinue={onContinue}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  page: {
    height: "100%",
    display: "flex",
  },
}));
