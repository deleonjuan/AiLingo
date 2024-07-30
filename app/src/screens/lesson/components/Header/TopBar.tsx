import Icon from "@components/common/Icon";
import Text from "@components/common/Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SCREENS } from "src/constants/screens.names";

interface TopBarProps {
  numberOfExercise: number;
}

export default function TopBar({ numberOfExercise }: TopBarProps) {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { styles } = useStyles(stylesheet);

  const total = 3;
  let progress = (100 / total) * numberOfExercise;

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
        onPress={() => navigate(SCREENS.HOME)}
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
