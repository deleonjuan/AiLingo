import { View } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import Text from "@components/common/Text";
import TranslatableText from "./TranslatableText";

interface ExcerciseHeaederProps {
  exercise: any;
}

export default function ExcerciseHeader({ exercise }: ExcerciseHeaederProps) {
  const { styles } = useStyles(stylesheet);

  const OneOfFour = () => (
    <>
      <Text style={styles.headerTitle}>Traduce esta palabra:</Text>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <TranslatableText
          text={exercise.question}
          translations={exercise.translations}
        />
      </View>
    </>
  );

  const OneOfThree = () => (
    <>
      <Text style={styles.headerTitle}>Traduce lo siguiente:</Text>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <TranslatableText
          text={exercise.question}
          translations={exercise.translations}
        />
      </View>
    </>
  );

  return (
    <View style={styles.header}>
      <View>
        <Text>X =====--------</Text>
      </View>
      {exercise.modality === "1OF4" && <OneOfFour />}
      {exercise.modality === "1OF3" && <OneOfThree />}
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  header: {
    flex: 1,
    paddingTop: UnistylesRuntime.statusBar.height,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
  },
}));
