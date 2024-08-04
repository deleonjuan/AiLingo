import { createComponentForStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens.names";

import HomeScreen from "@screens/home";
import LessonScreen from "@screens/lesson";
import LessonFinishedScreen from "@screens/LessonFinished";
import HelloScreen from "@screens/hello";
import WelcomeScreen from "@screens/welcome";
import { createContext, useContext } from "react";

export const SignInContext = createContext(false);
function useIsSignedIn() {
  const isSignedIn = useContext(SignInContext);
  return isSignedIn;
}
function useIsSignedOut() {
  const isSignedIn = useContext(SignInContext);
  return !isSignedIn;
}

const RootStack = createNativeStackNavigator({
  // initialRouteName: SCREENS.HOME,
  screenOptions: {
    headerShown: false,
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        [SCREENS.HOME]: {
          screen: HomeScreen,
        },
        [SCREENS.LESSON]: {
          screen: LessonScreen,
        },
        [SCREENS.LESSON_FINISHED]: {
          screen: LessonFinishedScreen,
        },
      },
    },
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        [SCREENS.WELCOME]: {
          screen: WelcomeScreen,
        },
      },
    },
  },
  screens: {
    [SCREENS.HELLO]: {
      screen: HelloScreen,
    },
  },
});

const Navigator = createComponentForStaticNavigation(RootStack, "Stack");

export default Navigator;
