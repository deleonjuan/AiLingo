import Text from "@components/common/Text";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Tooltip from "rn-tooltip";

interface TranslatableTextProps {
  text: string;
  translations?: any[];
}

export default function TranslatableText({
  text,
  translations,
}: TranslatableTextProps) {
  const { styles } = useStyles(stylesheet);
  const words = text.split(" ");

  const TranslationBox = ({ word }: { word: string }) => {
    const { translation } = translations?.find((w) => w.word === word) || {
      translation: [],
    };

    return (
      <>
        {translation.map((w: string) => (
          <Text style={{ paddingVertical: 4 }} key={w}>
            {w}
          </Text>
        ))}
      </>
    );
  };

  return (
    <>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {words.map((word) => (
          <Tooltip
            key={word}
            popover={<TranslationBox word={word} />}
            actionType="press"
            withOverlay={false}
            containerStyle={styles.translationBox}
            toggleWrapperProps={{}}
          >
            <Text style={styles.text}>{word}</Text>
          </Tooltip>
        ))}
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  translationBox: {
    backgroundColor: theme.colors.duoBlue,
    borderColor: theme.colors.duoGreen,
    borderWidth: 2,
    height: "auto",
  },
  text: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: theme.colors.duoYellow,
  },
}));
