import { View, Text, Button } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ExerciseFooterProps {
  answerStatus: "correct" | "incorrect" | "none";
  submitAnswer: (e: any) => void;
  onContinue: () => void;
  isLoading: boolean;
}

export default function ExerciseFooter({
  answerStatus,
  submitAnswer,
  onContinue,
  isLoading,
}: ExerciseFooterProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>loading</Text>
      ) : (
        <View>
          {answerStatus === "correct" && <Text>Correcto!</Text>}
          {answerStatus === "incorrect" && <Text>Incorrecto!</Text>}
          <Button
            onPress={answerStatus === "correct" ? onContinue : submitAnswer}
            title={answerStatus === "correct" ? "continuar" : "comprobar"}
          />
        </View>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: { marginBottom: 20, padding: 12 },
}));
