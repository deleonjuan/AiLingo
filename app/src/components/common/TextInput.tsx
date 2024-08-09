import { Control } from "react-hook-form";
import {
  TextInput as NativeTextInput,
  TextInputProps,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "./Text";

interface FormTextInputProps extends TextInputProps {
  label: string;
  field: any;
  error?: string;
}

export function FormTextInput(props: FormTextInputProps) {
  const { field } = props;
  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{props.label}</Text>
      <TextInput
        {...props}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        style={[{ marginTop: 5 }, props.style]}
        placeholderTextColor={"gray"}
      />
      {props.error && <Text style={{ color: "red" }}>{props.error}</Text>}
    </View>
  );
}

export default function TextInput(props: TextInputProps) {
  const { styles } = useStyles(stylesheet);
  return (
    <NativeTextInput
      {...props}
      style={[
        styles.input,
        props.editable === false && styles.disabled,
        props.style,
      ]}
    />
  );
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
  disabled: {
    opacity: 0.5,
  },
}));
