import { useEffect, useState } from "react";
import { View } from "react-native";
import { useChat } from "react-native-vercel-ai";
import { StatusBar } from "expo-status-bar";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";

import useExerciseHandler from "src/hooks/useExerciseHandler";
import useChatLog from "src/hooks/useChatLog";
import { useAppDispatch } from "src/hooks/hooks";

import ExerciseFooter from "@screens/lesson/components/Footer";
import OneOfFour from "@screens/lesson/components/OneOfFour.exercise";
import OneOfThree from "@screens/lesson/components/OneOfThree.exercise";
import Loading from "@components/common/Loading";
import { learningActions } from "src/store/slices/learning";
import LessonHeader from "./components/Header";

interface LessonScreenProps {
  route: any;
}

export default function LessonScreen({ route }: LessonScreenProps) {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { styles } = useStyles(stylesheet);
  const { topic } = route.params;
  const [userAnswer, setUseAnswer] = useState<any>("");
  const { messages, isLoading, handleSubmit, setMessages } = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + "getLesson",
    initialInput: `iniciar leccion con tematica: ${topic}`,
  });
  const { exercise, answerStatus, isLast, numberOfExercise, getNextExcercise, onCheckAnswer } =
    useExerciseHandler({
      messages,
      setMessages,
    });
  useChatLog(messages);

  // starts the chat automatically
  useEffect(() => {
    handleSubmit({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onContinue = () => {
    if (isLast) {
      dispatch(learningActions.addFinishedLesson(topic));
      navigate(SCREENS.LESSON_FINISHED);
      return;
    }
    setUseAnswer("");
    getNextExcercise();
  };

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
          <LessonHeader exercise={exercise} numberOfExercise={numberOfExercise}/>
          <View style={{ flex: 3, display: "flex" }}>
            <ExerciseSelector
              content={exercise}
              setValue={setUseAnswer}
              value={userAnswer}
            />

            <ExerciseFooter
              answerStatus={answerStatus}
              submitAnswer={() => onCheckAnswer(userAnswer)}
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
    backgroundColor: theme.colors.bgBlack,
  },
}));
