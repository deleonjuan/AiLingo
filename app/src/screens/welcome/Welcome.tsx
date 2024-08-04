import Text from "@components/common/Text";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
// import { SCREENS } from "src/constants/screens.names";
import { useAppDispatch } from "src/hooks/hooks";
import { authActions } from "src/store/slices/auth";

export default function WelcomeScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const [username, setUsername] = useState<string>("");
  const [isUserValid, setIsUserValid] = useState<boolean>(false);
  // const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  
  const onContinue = () => {
    dispatch(authActions.setUserName(username));
    // navigate(SCREENS.HOME);
  };

  useEffect(() => {
    if (username.length > 2) setIsUserValid(true);
    else setIsUserValid(false);
  }, [username]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.page}>
        <StatusBar style="light" translucent={true} />
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          <Text style={{ fontSize: 32 }}>Bienvenido!</Text>
          <Text>Listo para aprender otro idioma?</Text>

          <TextInput
            onChangeText={setUsername}
            value={username}
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Tu nombre"
          />

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onContinue}
              style={[
                styles.nextButton,
                {
                  backgroundColor: isUserValid
                    ? theme.colors.duoGreen
                    : theme.colors.bgGray,
                },
              ]}
            >
              <Text
                style={{
                  color: isUserValid
                    ? theme.colors.text
                    : theme.colors.bgLightGray,
                }}
              >
                continuar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  page: {
    display: "flex",
    backgroundColor: "#000",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    backgroundColor: theme.colors.duoBlue,
    borderColor: theme.colors.duoGreen,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 16,
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: 24,
  },
  nextButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: theme.colors.duoGreen,
    borderRadius: 50,
  },
}));
