import { useChat } from "react-native-vercel-ai";
import { useEffect } from "react";
import { Text, View } from "react-native";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";
import ChooseTheImage from "@components/Exercise/ChooseTheImage.exercise";
import useExerciseInterpreter from "src/hooks/useExerciseInterpreter";
import ExerciseFooter from "@components/Exercise/Footer";

export default function ExerciseScreen() {
  const { styles } = useStyles(stylesheet);
  // TODO: move api url and initial input
  const { messages, handleInputChange, handleSubmit, setMessages } = useChat({
    api: "http://192.168.1.70:4321/api/domagic",
    initialInput: "iniciar leccion con tematica: animales",
  });
  const { exercise, answerStatus } = useExerciseInterpreter({
    messages,
    setMessages,
  });

  useEffect(() => {
    // starts the chat automatically
    handleSubmit(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSetValue = (userAnswer: string) => {
    handleInputChange(userAnswer as any);
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text>Hello from Exercise</Text>
        <Text>traduce la palabra: </Text>
        <Text>your answer is</Text>
      </View>
      <View style={{ flex: 3, display: "flex" }}>
        {exercise && (
          <ChooseTheImage content={exercise} setValue={onSetValue} />
        )}
        <ExerciseFooter
          answerStatus={answerStatus}
          submitAnswer={handleSubmit}
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
  header: {
    flex: 1,
    paddingTop: UnistylesRuntime.statusBar.height,
  },
}));
