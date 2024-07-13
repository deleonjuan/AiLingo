import { createComponentForStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens.names";

import HomeScreen from "@screens/home";
import ExerciseScreen from "@screens/excercise";

const RootStack = createNativeStackNavigator({
  initialRouteName: SCREENS.EXCERCISE,
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
  },
});

const Navigator = createComponentForStaticNavigation(RootStack, "Stack");

export default Navigator;
