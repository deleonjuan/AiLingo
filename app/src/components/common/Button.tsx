import { Pressable, StyleProp, ViewStyle } from "react-native";
import Text from "./Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ButtonProps {
  onPress: (e?: any) => void;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({ onPress, label, style }: ButtonProps) {
  const { styles } = useStyles(stylesheet);
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  button: {
    backgroundColor: theme.colors.duoGreen,
    borderRadius: 15,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
}));
