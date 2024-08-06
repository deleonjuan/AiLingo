import Button from "@components/common/Button";
import Text from "@components/common/Text";
import TextInput from "@components/common/TextInput";
import { useState } from "react";
import { Platform, ToastAndroid, View } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { authActions } from "src/store/slices/auth";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const { apiKey } = useAppSelector((state) => state.authReducer);
  const [newApiKey, setNewApiKey] = useState<string>("");

  const onSave = () => {
    console.log("API KEY log", newApiKey.length);
    if (newApiKey.length > 35) {
      dispatch(authActions.setApiKey(newApiKey));

      if(Platform.OS === "android") {
        ToastAndroid.show("API KEY set correctly", ToastAndroid.SHORT)
      }else{
        console.log("API KEY set correctly");
        
      }
      setNewApiKey("");
    } else {
      if(Platform.OS === "android") {
        ToastAndroid.show("API KEY is incorrect", ToastAndroid.SHORT);
      }
      console.log("API KEY NOT set correctly");
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
        secureTextEntry={true}
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
