import { useEffect, useState } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";

import useExerciseHandler from "src/hooks/useExerciseHandler";
import useChatLog from "src/hooks/useChatLog";
import useAIChat from "src/hooks/useAIChat";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { learningActions } from "src/store/slices/learning";

import ExerciseFooter from "@screens/lesson/components/Footer";
import Loading from "@components/common/Loading";
import LessonHeader from "./components/Header";
import ExerciseSelector from "./components/Excercises";
import Error from "@components/common/Error";

interface LessonScreenProps {
  route: any;
}

export default function LessonScreen({ route }: LessonScreenProps) {
  const dispatch = useAppDispatch();
  // const { wordsLearned, initialTopics } = useAppSelector(
  //   (state) => state.learningReducer
  // );
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { styles } = useStyles(stylesheet);
  const { topic } = route.params;
  const [userAnswer, setUseAnswer] = useState<any>("");
  const { messages, isLoading, handleSubmit, setMessages, error } = useAIChat({
    path: "getLesson",
    initialInput:
      `start lesson with the theme: ${topic}, ` +
      `the number of exercises should be ${settings.excercisesPerLesson}, ` +
      `The native language is ${settings.language}, and they are learning ${settings.languageLearning}, `,
    // `learned words so far: ${wordsLearned.toString()}, ` +
    // `topics the user already know: ${initialTopics.toString()}`,
  });
  const {
    exercise,
    answerStatus,
    isLast,
    numberOfExercise,
    getNextExcercise,
    onCheckAnswer,
  } = useExerciseHandler({
    messages,
    setMessages,
  });
  useChatLog(messages);

  // starts the chat automatically
  useEffect(() => {
    handleSubmit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onContinue = () => {
    dispatch(learningActions.AddWordsLearned(exercise.question));
    if (isLast) {
      dispatch(learningActions.addFinishedLesson(topic));
      navigate(SCREENS.LESSON_FINISHED);
      return;
    }
    setUseAnswer("");
    getNextExcercise();
  };

  return (
    <View style={styles.page}>
      {isLoading && !exercise && answerStatus === "none" && <Loading />}

      {!isLoading && error && <Error />}

      {!error && exercise && (
        <>
          <LessonHeader
            exercise={exercise}
            numberOfExercise={numberOfExercise}
          />
          <View style={{ flex: 3, display: "flex" }}>
            <ExerciseSelector
              content={exercise}
              setValue={setUseAnswer}
              value={userAnswer}
              modality={exercise.modality}
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
    flex: 1,
    backgroundColor: theme.colors.bgBlack,
  },
}));
