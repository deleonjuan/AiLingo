import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@components/common/Text";

interface OneOfFourProps {
  setValue: (value: string) => void;
  content: any;
  value: any;
}

export default function OneOfFour({
  setValue,
  content,
  value,
}: OneOfFourProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {content.possibleAnswers.map((option: any) => (
        <View key={option} style={styles.imageContainer}>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageContainer: {
    width: "50%",
    height: "50%",
  },
  imageCardBasic: {
    margin: 8,
    backgroundColor: theme.colors.bgGray,
    borderRadius: 20,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCardSelected: {
    backgroundColor: theme.colors.duoBlue,
    borderWidth: 4,
    borderColor: theme.colors.duoGreen,
  },
}));
