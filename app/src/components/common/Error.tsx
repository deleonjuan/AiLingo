import { Dimensions, Pressable, View } from "react-native";
import { Image } from "expo-image";
import Text from "./Text";
import { useAppSelector } from "src/hooks/hooks";
import Icon from "./Icon";
import { useStyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";

const { width: sWidth } = Dimensions.get("screen");

interface ErrorProps {
  canGoBack?: boolean;
}

export default function Error({ canGoBack = false }: ErrorProps) {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { theme } = useStyles({});
  const {
    settings: { apiKey },
  } = useAppSelector((state) => state.settingsReducer);

  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={{ uri: "https://i.giphy.com/26DNfEyKEiWj4oYyQ.webp" }}
        style={{ width: sWidth / 2, height: sWidth / 3 }}
      />
      <Text style={{ fontSize: 24 }}>Diantres! algo malio sal</Text>
      {apiKey.length < 35 && (
        <>
          <Text>Parece que no tienes una api key valida</Text>
          <Text>Puedes proveer una en la pantalla de settings</Text>
        </>
      )}

      {canGoBack && (
        <Pressable
          onPress={() => navigate("RootTabs", { screen: SCREENS.HOME })}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Icon name="arrow-left" color={theme.colors.duoGreen} />
          <Text style={{ color: theme.colors.duoGreen, fontSize: 16 }}>
            Go Back
          </Text>
        </Pressable>
      )}
    </View>
  );
}
