import { Button, Platform, Text, TextInput, View } from "react-native";
// import {useChat} from "ai/react"
import { useChat } from "react-native-vercel-ai";

export default function HomeScreen() {
  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat({
      api: "http://192.168.1.70:4321/api/domagic",
    });

  return (
    <View>
      <Text>Hello from home</Text>

      <View style={{ display: "flex", flexDirection: "column" }}>
        {messages.length > 0
          ? messages.map((m) => (
              <Text key={m.id}>
                {m.role === "user" ? "🧔 User: " : "🤖 AI: "}
                {m.content}
              </Text>
            ))
          : null}
      </View>

      {isLoading && Platform.OS !== "web" && (
        <View>
          <Text>Loading...</Text>
        </View>
      )}

      <TextInput
        placeholder="hello"
        value={input}
        onChangeText={(e) => {
          handleInputChange(
            Platform.OS === "web" ? { target: { value: e } } : (e as any)
          );
        }}
      />

      <Button onPress={handleSubmit} title="Send" />
    </View>
  );
}
