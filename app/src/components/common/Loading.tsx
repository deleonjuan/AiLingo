import { View } from "react-native";
import Text from "./Text";

export default function Loading() {
  return (
    <View
      style={{
        height: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontSize: 24 }}>Super cool animation here</Text>
      <Text style={{ fontSize: 24 }}>Wait a moment...</Text>
    </View>
  );
}
