import { useEffect, useState } from "react";
import { View } from "react-native";
import { useChat } from "react-native-vercel-ai";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import useExerciseHandler from "src/hooks/useExerciseHandler";
import useChatLog from "src/hooks/useChatLog";
import ExerciseFooter from "@screens/excercise/components/Footer";
import ExcerciseHeaeder from "@screens/excercise/components/Header";

import OneOfFour from "@screens/excercise/components/OneOfFour.exercise";
import OneOfThree from "@screens/excercise/components/OneOfThree.exercise";
import { StatusBar } from "expo-status-bar";
import Loading from "@components/common/Loading";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";
import { useAppDispatch } from "src/hooks/hooks";
import { learningActions } from "src/store/slices/learning";

interface ExerciseScreenProps {
  route: any;
}

export default function ExerciseScreen({ route }: ExerciseScreenProps) {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { styles } = useStyles(stylesheet);
  const { topic } = route.params;
  const [userAnswer, setUseAnswer] = useState<any>("");
  const { messages, isLoading, handleSubmit, setMessages } = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + "getLesson",
    initialInput: `iniciar leccion con tematica: ${topic}`,
  });
  const { exercise, answerStatus, isLast, getNextExcercise, onCheckAnswer } =
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
      dispatch(learningActions.addFinishedLesson(topic))
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
          <ExcerciseHeaeder exercise={exercise} />
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
