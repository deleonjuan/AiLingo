import { Dimensions, View } from "react-native";
import { Image } from "expo-image";
import Text from "./Text";
import { useAppSelector } from "src/hooks/hooks";

const { width: sWidth } = Dimensions.get("screen");

export default function Error() {
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
    </View>
  );
}
