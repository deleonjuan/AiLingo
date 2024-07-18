import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UnistylesRegistry } from "react-native-unistyles";
import Navigator from "./src/navigation";
import { gemini } from "src/utils/theme";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // load theme
  UnistylesRegistry.addThemes({
    gemini: gemini,
  });

  //load fonts
  const [loaded, error] = useFonts({
    poppins: require("@assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
