import Text from "@components/common/Text";
import TextInput from "@components/common/TextInput";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useAppDispatch } from "src/hooks/hooks";
import { authActions } from "src/store/slices/auth";
import { settingsActions } from "src/store/slices/settings";

export default function WelcomeScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [isUserValid, setIsUserValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { styles } = useStyles(stylesheet, {
    bg: isUserValid,
    color: isUserValid,
  });

  const onContinue = () => {
    if (!username && !apiKey) return;
    dispatch(settingsActions.setApiKey(apiKey));
    dispatch(authActions.setUserName(username));
  };

  useEffect(() => {
    if (username && username.length > 2) setIsUserValid(true);
    else setIsUserValid(false);
  }, [username]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.page}>
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          <Text style={{ fontSize: 32 }}>Bienvenido!</Text>
          <Text>Listo para aprender otro idioma?</Text>

          <TextInput
            onChangeText={setUsername}
            value={username || ""}
            placeholderTextColor={"gray"}
            placeholder="Tu nombre"
          />

          <TextInput
            textContentType="password"
            secureTextEntry={true}
            onChangeText={setApiKey}
            value={apiKey || ""}
            placeholderTextColor={"gray"}
            placeholder="google gemini api key"
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onContinue} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>continuar</Text>
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
    variants: {
      bg: {
        true: {
          backgroundColor: theme.colors.duoGreen,
        },
        false: {
          backgroundColor: theme.colors.bgGray,
        },
      },
    },
  },
  nextButtonText: {
    variants: {
      color: {
        true: {
          color: theme.colors.text,
        },
        false: {
          color: theme.colors.bgLightGray,
        },
      },
    },
  },
}));
