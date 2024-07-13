import { useState } from "react";
import { Text, Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ChooseTheImageProps {
  setValue: (value: string) => void;
  content: any;
}

export default function ChooseTheImage({
  setValue,
  content,
}: ChooseTheImageProps) {
  const { styles } = useStyles(stylesheet);
  const [selected, setSelected] = useState<string>("");

  const onPressOption = (option: string) => {
    setSelected(option);
    setValue(option);
  };

  return (
    <View style={styles.container}>
      {content.possibleAnswers.map((option: any) => (
        <View key={option} style={styles.imageContainer}>
          <Pressable
            onPress={() => onPressOption(option)}
            style={[
              styles.imageCardBasic,
              option === selected ? styles.imageCardSelected : {},
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

const stylesheet = createStyleSheet(() => ({
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
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCardSelected: {
    backgroundColor: "red",
  },
}));
