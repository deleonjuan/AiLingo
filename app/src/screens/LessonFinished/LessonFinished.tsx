import Button from "@components/common/Button";
import Text from "@components/common/Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import { SCREENS } from "src/constants/screens.names";

export default function LessonFinishedScreen() {
  const { styles } = useStyles(stylesheet);
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const onFinish = () => navigate("RootTabs", { screen: SCREENS.HOME });

  return (
    <View style={styles.page}>
      <Text style={{ fontSize: 20 }}>Terminaste tu leccion de hoy</Text>
      <Text style={{ fontSize: 36 }}>Felicidades!!</Text>
      <Text>Super cool animation with confety here.</Text>

      <View style={{ width: "100%", marginTop: 56 }}>
        <Button onPress={onFinish} label="Continuar" />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  page: {
    height: UnistylesRuntime.screen.height + UnistylesRuntime.statusBar.height,
    backgroundColor: theme.colors.bgBlack,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
}));
