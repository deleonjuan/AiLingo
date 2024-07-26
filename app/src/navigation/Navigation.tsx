import { createComponentForStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens.names";

import HomeScreen from "@screens/home";
import ExerciseScreen from "@screens/excercise";
import LessonFinishedScreen from "@screens/LessonFinished";

const RootStack = createNativeStackNavigator({
  initialRouteName: SCREENS.HOME,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [SCREENS.HOME]: {
      screen: HomeScreen,
    },
    [SCREENS.EXCERCISE]: {
      screen: ExerciseScreen,
    },
    [SCREENS.LESSON_FINISHED]: {
      screen: LessonFinishedScreen,
    },
  },
});

const Navigator = createComponentForStaticNavigation(RootStack, "Stack");

export default Navigator;
