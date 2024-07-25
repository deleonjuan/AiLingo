import { LayoutChangeEvent, ScrollView, View } from "react-native";
import Text from "@components/common/Text";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useChat } from "react-native-vercel-ai";
import TopicsList from "./components/TopicsList";
import Loading from "@components/common/Loading";

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const [headerH, setHeaderH] = useState<number>(0);
  const [topics, setTopics] = useState<any[]>([]);
  const { messages, isLoading, handleSubmit } = useChat({
    api: process.env.EXPO_PUBLIC_API_URL + "getTopics",
    initialInput: "start",
  });

  const find_dimesions = (e: LayoutChangeEvent) => {
    setHeaderH(e.nativeEvent.layout.height);
  };

  // starts the chat automatically
  useEffect(() => {
    handleSubmit({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMsg = messages[messages.length - 1] as any;
    if (lastMsg?.content?.topics) {
      setTopics(lastMsg.content.topics);
    }
  }, [messages]);

  return (
    <View style={styles.page}>
      <StatusBar style="light" translucent={true} />

      <View onLayout={find_dimesions} style={styles.header}>
        <View style={styles.headerBarSection}>
          <View style={styles.languajeBadge}>
            <Text>English</Text>
          </View>
          <View style={styles.userCircle}></View>
        </View>
        <View style={styles.headerTitleSection}>
          <Text style={styles.headerTitle}>Hola John Doe,</Text>
          <Text style={styles.headerTitle}>Listo para aprender?</Text>
        </View>
      </View>
      {!isLoading && topics.length > 0 ? (
        <ScrollView
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: headerH + 50 }} />
          <TopicsList topicList={topics} />
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  header: {
    paddingTop: UnistylesRuntime.statusBar.height + 8,
    backgroundColor: `${theme.colors.bgBlack}f`,
    paddingHorizontal: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitleSection: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "poppins",
  },
  headerBarSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  languajeBadge: {
    backgroundColor: theme.colors.bgGray,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  userCircle: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.bgGray,
    borderRadius: 20,
  },
  page: {
    height: UnistylesRuntime.screen.height + UnistylesRuntime.statusBar.height,
    display: "flex",
    backgroundColor: "#000",
  },
}));
