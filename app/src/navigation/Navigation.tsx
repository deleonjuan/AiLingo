import { StyleSheet, View } from "react-native";
import { createComponentForStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useContext } from "react";

import Icon from "@components/common/Icon";
import { gemini } from "src/utils/theme";
import { SCREENS } from "../constants/screens.names";
import HomeScreen from "@screens/home";
import LessonScreen from "@screens/lesson";
import LessonFinishedScreen from "@screens/LessonFinished";
import WelcomeScreen from "@screens/welcome";
import ChatScreen from "@screens/chat";

export const SignInContext = createContext(false);
function useIsSignedIn() {
  const isSignedIn = useContext(SignInContext);
  return isSignedIn;
}
function useIsSignedOut() {
  const isSignedIn = useContext(SignInContext);
  return !isSignedIn;
}

const HomeStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [SCREENS.HOME]: {
      screen: HomeScreen,
    },
  },
});

const RootTabs = createBottomTabNavigator({
  initialRouteName: "homeStack",
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: gemini.colors.duoGreen,
    tabBarBackground: () => (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "black" }]} />
    ),
  },
  screens: {
    homeStack: {
      screen: HomeStack,
      options: {
        tabBarLabel: "home",
        tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
      },
    },
    chatStack: {
      screen: ChatScreen,
      options: {
        tabBarLabel: "chat",
        tabBarIcon: ({ color }) => <Icon name="message-circle" color={color} />,
      },
      listeners: ({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate(SCREENS.CHAT);
        },
      }),
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        RootTabs,
        [SCREENS.LESSON]: {
          screen: LessonScreen,
        },
        [SCREENS.LESSON_FINISHED]: {
          screen: LessonFinishedScreen,
        },
        [SCREENS.CHAT]: {
          screen: ChatScreen,
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
});

const Navigator = createComponentForStaticNavigation(RootStack, "Stack");

export default Navigator;
