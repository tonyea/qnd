import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SnatchPage } from "./pages/snatch";

// This type will define all the possible parameters for each route
export type RootStackParamList = {
  Splash: { test: number };
  Snatch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Snatch"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Snatch"
          component={SnatchPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
