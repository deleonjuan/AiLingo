import { View, Text } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

interface ExcerciseHeaederProps {
  exercise: any;
}

export default function ExcerciseHeaeder({ exercise }: ExcerciseHeaederProps) {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.header}>
      <Text>Traduce esta palabra: {exercise.question}</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  header: {
    flex: 1,
    paddingTop: UnistylesRuntime.statusBar.height,
  },
}));
