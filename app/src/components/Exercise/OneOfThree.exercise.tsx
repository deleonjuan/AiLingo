import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@components/common/Text";

interface OneOfThreeProps {
  setValue: (value: string) => void;
  content: any;
  value: any;
}

export default function OneOfThree({
  setValue,
  content,
  value,
}: OneOfThreeProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {content.possibleAnswers.map((option: any) => (
        <View key={option}>
          <Pressable
            onPress={() => setValue(option)}
            style={[
              styles.imageCardBasic,
              option === value ? styles.imageCardSelected : {},
            ]}
            key={option}
          >
            <Text>{option}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginHorizontal: 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  imageCardBasic: {
    margin: 8,
    backgroundColor: theme.colors.bgGray,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderWidth: 4,
  },
  imageCardSelected: {
    backgroundColor: theme.colors.duoBlue,
    borderWidth: 4,
    borderColor: theme.colors.duoGreen,
  },
}));
