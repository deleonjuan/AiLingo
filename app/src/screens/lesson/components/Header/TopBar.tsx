import Icon from "@components/common/Icon";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SCREENS } from "src/constants/screens.names";
import { useAppSelector } from "src/hooks/hooks";

interface TopBarProps {
  numberOfExercise: number;
}

export default function TopBar({ numberOfExercise }: TopBarProps) {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { styles } = useStyles(stylesheet);
  const {
    settings: { excercisesPerLesson },
  } = useAppSelector((state) => state.settingsReducer);

  let progress = (100 / Number(excercisesPerLesson)) * numberOfExercise;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 8,
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => navigate("RootTabs", { screen: SCREENS.HOME })}
        style={{ paddingRight: 8 }}
      >
        <Icon name="x" color="white" size={28} />
      </Pressable>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]}></View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  progressBarContainer: {
    height: 14,
    flex: 1,
    backgroundColor: theme.colors.bgGray,
    borderRadius: 20,
  },
  progressBar: {
    backgroundColor: theme.colors.duoGreen,
    height: "100%",
    borderRadius: 20,
  },
}));
