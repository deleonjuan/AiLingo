import { useEffect, useState } from "react";
import { View } from "react-native";
import { useChat } from "react-native-vercel-ai";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import useExerciseInterpreter from "src/hooks/useExerciseInterpreter";
import useChatLog from "src/hooks/useChatLog";
import ExerciseFooter from "@screens/excercise/components/Footer";
import ExcerciseHeaeder from "@screens/excercise/components/Header";

import OneOfFour from "@screens/excercise/components/OneOfFour.exercise";
import OneOfThree from "@screens/excercise/components/OneOfThree.exercise";
import { StatusBar } from "expo-status-bar";
import Loading from "@components/common/Loading";

interface ExerciseScreenProps {
  route: any;
}

export default function ExerciseScreen({ route }: ExerciseScreenProps) {
  const { styles } = useStyles(stylesheet);
  const [questionsLeft, setQuestionsLeft] = useState<number>(3);
  const [userAnswer, setUseAnswer] = useState<any>("");

  const { topic } = route.params;
  const { messages, isLoading, handleSubmit, setMessages, setInput } = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + "domagic",
    initialInput: `iniciar leccion con tematica: ${topic}`,
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

  const ExerciseSelector = (props: any) => {
    const options = {
      "1OF4": () => <OneOfFour {...props} />,
      "1OF3": () => <OneOfThree {...props} />,
    } as any;

    return options[exercise.modality]();
  };

  return (
    <View style={styles.page}>
      <StatusBar style="light" translucent={true} />

      {isLoading && !exercise && answerStatus === "none" && <Loading />}

      {exercise && (
        <>
          <ExcerciseHeaeder exercise={exercise} />
          <View style={{ flex: 3, display: "flex" }}>
            <ExerciseSelector
              content={exercise}
              setValue={onSetValue}
              value={userAnswer}
            />

            <ExerciseFooter
              answerStatus={answerStatus}
              submitAnswer={handleSubmit}
              onContinue={onContinue}
              isLoading={isLoading}
            />
          </View>
        </>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  page: {
    height: UnistylesRuntime.screen.height + UnistylesRuntime.statusBar.height,
    // display: "flex",
    backgroundColor: theme.colors.bgBlack,
  },
}));
