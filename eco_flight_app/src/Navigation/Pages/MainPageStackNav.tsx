import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchFlight from "../../Components/SearchFlight";
import MainPage from "./MainPage";

const Stack = createNativeStackNavigator();

export const MainPageStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main Page">
      <Stack.Screen
        name="Main Page"
        component={MainPage}
        options={{ title: "Main Page" }}
      />
      <Stack.Screen
        name="Search Flight"
        component={SearchFlight}
        options={{ title: "Search Flight" }}
      />
    </Stack.Navigator>
  );
};
