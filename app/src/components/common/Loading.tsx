import { Dimensions, View } from "react-native";
import { Image } from "expo-image";
import Text from "./Text";

const { width: sWidth } = Dimensions.get("screen");

export default function Loading() {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: "https://i.giphy.com/tA4R6biK5nlBVXeR7w.webp" }}
        style={{ width: sWidth / 2, height: sWidth / 2 }}
      />
      <Text style={{ fontSize: 24 }}>Wait a moment...</Text>
    </View>
  );
}
