import Text from "@components/common/Text";
import { isString } from "lodash";
import { FlatList, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { IChatMessage } from "../message";

const Message = ({ item }: { item: IChatMessage }) => {
  const { styles } = useStyles(stylesheet, {
    variant: item.role,
    bgColor: item.role,
    opacity: item.msgType,
  });

  return (
    <View style={styles.messageContainer}>
      <View style={styles.msgBubble}>
        <Text>{item.content.toString()}</Text>
      </View>
    </View>
  );
};

interface ChatBoxProps {
  messages: IChatMessage[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
  return (
    <FlatList
      style={{ paddingHorizontal: 12 }}
      data={messages}
      keyExtractor={(message) => message.id}
      renderItem={({ item }) => <Message item={item} />}
      ListHeaderComponent={<View style={{marginTop: 16}}/>}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    variants: {
      variant: {
        user: {
          justifyContent: "flex-end",
        },
        assistant: {
          justifyContent: "flex-start",
        },
      },
    },
  },
  msgBubble: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 5,
    maxWidth: '90%',
    variants: {
      bgColor: {
        user: {
          backgroundColor: theme.colors.duoGreen,
        },
        assistant: {
          backgroundColor: theme.colors.duoBlue,
        },
      },
      opacity: {
        feedback: {
          opacity: 0.5,
          marginBottom: 8,
        },
        message: {
          opacity: 1,
          marginBottom: 16,
        },
      },
    },
  },
}));
