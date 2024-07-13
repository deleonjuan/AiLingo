import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" translucent={true} />
      <Navigator />
    </NavigationContainer>
  );
}
