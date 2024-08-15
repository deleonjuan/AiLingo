import Icon from "@components/common/Icon";
import Text from "@components/common/Text";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import ChatBox from "./components/ChatBox";
import useChatHandler from "src/hooks/useChatHandler";
import { useEffect } from "react";
import { IChatMessage } from "./message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";
import Error from "@components/common/Error";
import useAIChat from "src/hooks/useAIChat";
import { useAppSelector } from "src/hooks/hooks";

const marginBottomAdaptable = Platform.OS === "ios" ? 16 : 0;
export default function ChatScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const {settings: {language, languageLearning}} = useAppSelector(state => state.settingsReducer)
  const {
    messages,
    isLoading,
    handleSubmit,
    setInput,
    input,
    setMessages,
    error,
  } = useAIChat({
    path: "chat",
    initialInput: `Hello! I speak ${language} but I want to learn ${languageLearning}`,
  });
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

  const { messageList } = useChatHandler({
    messages: messages as any[],
    setMessages,
  });

  const onSendMessage = () => {
    if (!isLoading) handleSubmit();
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => navigate("RootTabs", { screen: SCREENS.HOME })}
            style={{
              paddingBottom: 6,
              marginRight: 8,
            }}
          >
            <Icon size={32} name="chevron-left" color="white" />
          </Pressable>
          <Text style={{ fontSize: 32, textAlignVertical: "center" }}>
            Lingo
          </Text>
        </View>
      </View>

      {!isLoading && error && <Error canGoBack />}

      {!error && <ChatBox messages={messageList} />}

      {/*TEXT INPUT */}
      {!error && (
        <View style={styles.bottomActionsContainer}>
          <TextInput
            onChangeText={setInput}
            value={input}
            style={styles.textInput}
            placeholderTextColor={theme.colors.bgLightGray}
            placeholder="mensaje"
          />
          <Pressable onPress={onSendMessage} style={styles.sendButton}>
            <Icon name="send" color="white" />
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  header: {
    borderBottomColor: theme.colors.bgGray,
    borderBottomWidth: 2,
    paddingTop: UnistylesRuntime.statusBar.height,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomActionsContainer: {
    borderTopColor: theme.colors.bgGray,
    borderTopWidth: 2,
    marginBottom: UnistylesRuntime.navigationBar.height + marginBottomAdaptable,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  textInput: {
    backgroundColor: theme.colors.duoBlue,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    flex: 1,
    color: theme.colors.text,
  },
  sendButton: {
    backgroundColor: theme.colors.duoGreen,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
}));
