import { View, FlatList, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@components/common/Text";

import Hexagon from "@assets/hexagon.svg";
import Star from "@assets/star.svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";

interface StepProps {
  topic: string;
  onPress: (topic: string) => void;
}

const Step = ({ topic, onPress }: StepProps) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <Pressable onPress={() => onPress(topic)} style={styles.StepContainer}>
      <View style={styles.StepIconContainer}>
        <Hexagon color={theme.colors.bgGray} width={120} height={120} />
        <View style={styles.StepInsideIcon}>
          <Star width={50} height={50} color={theme.colors.bgLightGray} />
        </View>
      </View>
      <Text style={{ fontSize: 18 }} key={topic}>
        {topic}
      </Text>
    </Pressable>
  );
};

interface TopicsListProps {
  topicList: string[][];
}

export default function TopicsList({ topicList }: TopicsListProps) {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onPress = (topic: string) => {
    navigation.navigate(SCREENS.EXCERCISE, { topic });
  };

  return (
    <FlatList
      data={topicList}
      scrollEnabled={false}
      keyExtractor={(topic) => topic[0]}
      renderItem={(topics) => (
        <View style={styles.container}>
          {topics.item.map((topic) => (
            <Step key={topic} topic={topic} onPress={onPress} />
          ))}
        </View>
      )}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginBottom: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  StepContainer: {
    alignItems: "center",
  },
  StepIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  StepInsideIcon: { position: "absolute" },
}));
