import Button from "@components/common/Button";
import Text from "@components/common/Text";
import TextInput from "@components/common/TextInput";
import { useState } from "react";
import { ToastAndroid, View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { authActions } from "src/store/slices/auth";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const { apiKey } = useAppSelector((state) => state.authReducer);
  const [newApiKey, setNewApiKey] = useState<string>("");

  const onSave = () => {
    if (apiKey.length > 35) {
      dispatch(authActions.setApiKey(apiKey));
      ToastAndroid.show("API KEY set correctly", ToastAndroid.SHORT);
      setNewApiKey("");
    } else {
      ToastAndroid.show("API KEY is incorrect", ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: UnistylesRuntime.statusBar.height,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 24 }}>DEV SETTINGS</Text>

      <Text>GOOGLE GEMINI API KEY</Text>
      <TextInput
        textContentType="password"
        onChangeText={setNewApiKey}
        value={newApiKey}
        placeholder={apiKey.length > 1 ? "***********************" : "api key"}
        placeholderTextColor={"gray"}
        style={{ marginTop: 5 }}
      />

      <Button style={{ marginTop: 24 }} onPress={onSave} label="Guardar" />
    </View>
  );
}
