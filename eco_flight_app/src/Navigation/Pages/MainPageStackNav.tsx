import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchFlight from "../../Components/SearchFlight/SearchFlight";
import ResultsPage from "../../Components/ResultList/Results";
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
      <Stack.Screen
        name="Results"
        component={ResultsPage}
        options={{ title: "Results", headerTitle: '' }}
      />
    </Stack.Navigator>
  );
};
