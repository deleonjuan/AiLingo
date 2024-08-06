import { TextInput as NativeTextInput, TextInputProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function TextInput(props: TextInputProps) {
  const { styles } = useStyles(stylesheet);
  return <NativeTextInput {...props} style={[styles.input, props.style]} />;
}

const stylesheet = createStyleSheet((theme) => ({
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
}));
