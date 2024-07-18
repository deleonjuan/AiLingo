import { useState } from "react";
import { View, LayoutChangeEvent, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@components/common/Text";

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
  const [footerH, setFooterH] = useState<number>(0);

  const find_dimesions = (e: LayoutChangeEvent) => {
    setFooterH(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      {answerStatus !== "none" && !isLoading && (
        <View style={[styles.answerContainer, { bottom: footerH }]}>
          <Text style={[{ fontSize: 24 }, styles[`answer${answerStatus}`]]}>
            {answerStatus === "correct" ? "Correcto!" : "Incorrecto!"}
          </Text>
        </View>
      )}

      <View onLayout={find_dimesions} style={styles.buttonContainer}>
        {isLoading ? (
          <View style={[styles.button, styles.disabled]}>
            <Text style={{ fontSize: 16 }}>Loading...</Text>
          </View>
        ) : (
          <Pressable
            onPress={answerStatus === "correct" ? onContinue : submitAnswer}
            style={styles.button}
          >
            <Text style={{ fontSize: 16 }}>
              {answerStatus === "correct" ? "continuar" : "comprobar"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.duoBlue,
  },
  answerContainer: {
    position: "absolute",
    backgroundColor: theme.colors.duoBlue,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: theme.colors.duoGreen,
    borderRadius: 15,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: { backgroundColor: theme.colors.bgLightGray },
  answercorrect: { color: theme.colors.duoGreen },
  answerincorrect: { color: theme.colors.danger },
}));
