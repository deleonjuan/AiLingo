import { Text, Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ExerciseTemplateProps {
  setValue: (value: string) => void;
  content: any;
  value: any;
}

export default function ExerciseTemplate({
  setValue,
  content,
  value,
}: ExerciseTemplateProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {content.possibleAnswers.map((option: any) => (
        <View key={option}>
          <Pressable
            onPress={() => setValue(option)}
            style={[
              styles.imageCardBasic,
              option === value ? styles.imageCardSelected : {},
            ]}
            key={option}
          >
            <Text>{option}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    marginHorizontal: 8,
    flex: 1,
    flexDirection: "column",
  },
  imageCardBasic: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCardSelected: {
    backgroundColor: "red",
  },
}));
