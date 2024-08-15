import { Pressable, View } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import Text from "@components/common/Text";
import TranslatableText from "@components/common/TranslatableText";
import TopBar from "./TopBar";

interface LessonHeaderProps {
  exercise: any;
  numberOfExercise: number
}

export default function LessonHeader({ exercise, numberOfExercise }: LessonHeaderProps) {
  const { styles } = useStyles(stylesheet);

  const OneOfFour = () => (
    <>
      <Text style={styles.headerTitle}>Traduce esta palabra:</Text>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <TranslatableText
          text={exercise.exercise}
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
          text={exercise.exercise}
          translations={exercise.translations}
        />
      </View>
    </>
  );

  return (
    <View style={styles.header}>
      <TopBar numberOfExercise={numberOfExercise}/>
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
