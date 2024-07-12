import { createComponentForStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens.names";

import HomeScreen from "../screens/home";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [SCREENS.HOME]: {
      screen: HomeScreen,
    },
  },
});

const Navigator = createComponentForStaticNavigation(RootStack, "Stack");

export default Navigator;
