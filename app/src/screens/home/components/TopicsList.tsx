import { View, FlatList, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "@components/common/Text";

import Hexagon from "@assets/hexagon.svg";
import Star from "@assets/star.svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "src/constants/screens.names";
import { useAppSelector } from "src/hooks/hooks";

interface StepProps {
  topic: string;
  onPress: (topic: string) => void;
  isDone: boolean
}

const Step = ({ topic, onPress, isDone }: StepProps) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <Pressable onPress={() => onPress(topic)} style={styles.StepContainer}>
      <View style={styles.StepIconContainer}>
        <Hexagon color={theme.colors.duoGreen} width={120} height={120} />
        <View style={styles.StepInsideIcon}>
          <Star width={50} height={50} color={ isDone ? theme.colors.text : theme.colors.duoBlue} />
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
  const { lessonsDone } = useAppSelector((state) => state.learningReducer);
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
            <Step key={topic} topic={topic} onPress={onPress} isDone={lessonsDone.includes(topic)}/>
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
