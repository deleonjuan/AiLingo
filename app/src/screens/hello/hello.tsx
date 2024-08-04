import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function HelloScreen() {
  return (
    <View
      style={{
        marginTop: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
