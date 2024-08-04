import { LayoutChangeEvent, Pressable, ScrollView, View } from "react-native";
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
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { isEmpty } from "lodash";
import { learningActions } from "src/store/slices/learning";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { initialTopics } = useAppSelector((state) => state.learningReducer);
  const { username } = useAppSelector((state) => state.authReducer);
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

  // uses topics stored in redux
  // if no topics call the api
  useEffect(() => {
    if (!isEmpty(initialTopics)) setTopics(initialTopics);
    else handleSubmit({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMsg = messages[messages.length - 1] as any;
    if (lastMsg?.content?.topics) {
      setTopics(lastMsg.content.topics);
      dispatch(learningActions.setInitialTopics(lastMsg.content.topics));
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
          <View style={styles.userCircle}>
            <Text>{username ? username[0] : ""}</Text>
          </View>
        </View>
        <View style={styles.headerTitleSection}>
          <Text style={styles.headerTitle}>Hola {username},</Text>
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
    backgroundColor: `${theme.colors.bgBlack}E`,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    height: UnistylesRuntime.screen.height + UnistylesRuntime.statusBar.height,
    display: "flex",
    backgroundColor: "#000",
  },
}));
