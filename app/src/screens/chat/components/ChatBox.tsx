import Text from "@components/common/Text";
import { FlatList, Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { IChatMessage } from "../message";
import { useEffect, useRef, useState } from "react";
import { TranslateIcon } from "@components/common/Icon";

const Answer = ({ item }: { item: IChatMessage }) => {
  const [isTranslationVisible, setTranslationVisible] =
    useState<boolean>(false);
  const { styles } = useStyles(stylesheet, {
    variant: item.role,
    bgColor: item.role,
  });
  if (typeof item.content === "string") return;
  return (
    <View style={{ flexDirection: "column" }}>
      {item.content.feedback !== "" && (
        <View style={[styles.msgBubble, styles.feedbackBubble]}>
          <Text>{item.content.feedback}</Text>
        </View>
      )}
      <View style={[styles.msgBubble]}>
        <Text>
          {!isTranslationVisible
            ? item.content.nextMessage
            : item.content.translation}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Pressable
            style={styles.msgButton}
            onPress={() => setTranslationVisible(!isTranslationVisible)}
          >
            <TranslateIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const Message = ({ item }: { item: IChatMessage }) => {
  const { styles } = useStyles(stylesheet, {
    variant: item.role,
    bgColor: item.role,
  });

  return (
    <View style={styles.messageContainer}>
      {typeof item.content === "string" ? (
        <View style={styles.msgBubble}>
          <Text>{item.content}</Text>
        </View>
      ) : (
        <Answer item={item} />
      )}
    </View>
  );
};

interface ChatBoxProps {
  messages: IChatMessage[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
  const flatListRef = useRef<FlatList<any>>(null);

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    console.log("🚀 ~ ChatBox ~ messages:", messages);
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      style={{ paddingHorizontal: 12 }}
      data={messages}
      keyExtractor={(message) => message.id}
      renderItem={({ item }) => <Message item={item} />}
      ListHeaderComponent={<View style={{ marginTop: 16 }} />}
      onContentSizeChange={scrollToEnd}
      onLayout={scrollToEnd}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    variants: {
      variant: {
        user: {
          justifyContent: "flex-end",
        },
        tool: {
          justifyContent: "flex-start",
        },
      },
    },
  },
  msgBubble: {
    backgroundColor: theme.colors.duoBlue,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxWidth: "90%",
    variants: {
      bgColor: {
        user: {
          backgroundColor: theme.colors.duoGreen,
        },
        tool: {
          backgroundColor: theme.colors.duoBlue,
        },
      },
    },
  },
  feedbackBubble: {
    opacity: 0.5,
    marginBottom: 8,
  },
  msgButton: {
    marginTop: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: theme.colors.bgLightGray,
    borderRadius: 4,
  },
}));
