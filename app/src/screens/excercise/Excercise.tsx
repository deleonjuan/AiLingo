import { useChat } from "react-native-vercel-ai";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";
import ChooseTheImage from "@components/Exercise/ChooseTheImage.exercise";
import useExerciseInterpreter from "src/hooks/useExerciseInterpreter";

export default function ExerciseScreen() {
  const { styles } = useStyles(stylesheet);
  const { messages, handleInputChange, handleSubmit } = useChat({
    api: "http://192.168.1.70:4321/api/domagic",
    initialInput: "iniciar leccion con tematica: animales",
  });
  const { exercise } = useExerciseInterpreter({
    messages,
  });

  useEffect(() => {
    // envia automaticamante el primer mensaje seteado en initialInput
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
        <View style={{ marginBottom: 20, padding: 12 }}>
          <Button onPress={handleSubmit} title="comprobar" />
        </View>
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
