import { useChat } from "react-native-vercel-ai";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ChooseTheImage from "@components/Exercise/ChooseTheImage.exercise";
import useExerciseInterpreter from "src/hooks/useExerciseInterpreter";
import ExerciseFooter from "@components/Exercise/Footer";
import ExcerciseHeaeder from "@components/Exercise/Header";

export default function ExerciseScreen() {
  const { styles } = useStyles(stylesheet);
  const [questionsLeft, setQuestionsLeft] = useState<number>(3);
  const { messages, isLoading, input, handleSubmit, setMessages, setInput } = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + "domagic",
    initialInput: "iniciar leccion con tematica: colores",
  });
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
  };

  const onContinue = async () => {
    if (questionsLeft === 1) {
      console.log("FINAL");
      return;
    }
    resetValues();
    setQuestionsLeft((n) => n - 1);
    handleSubmit({});
  };

  useEffect(() => {
    if (answerStatus === "correct") setInput("next");
  }, [answerStatus]);

  useEffect(() => {
    console.log("🚀 ~ ExerciseScreen ~ messages:", messages);
  }, [messages]);

  if (isLoading) return <Text>loading</Text>;

  return (
    <View style={styles.page}>
      {exercise && <ExcerciseHeaeder exercise={exercise} />}
      <View style={{ flex: 3, display: "flex" }}>
        {exercise && (
          <ChooseTheImage content={exercise} setValue={onSetValue} value={input} />
        )}
        <ExerciseFooter
          answerStatus={answerStatus}
          submitAnswer={handleSubmit}
          onContinue={onContinue}
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
