import React from "react";
import { Text as OriginalText, TextProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function Text(props: TextProps) {
  const { styles } = useStyles(stylesheet);
  return <OriginalText {...props} style={[styles.colorText, props.style]} />;
}

const stylesheet = createStyleSheet((theme) => ({
  colorText: {
    color: theme.colors.text,
  },
}));
