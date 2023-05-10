import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchFlight from "../../Components/SearchFlight/SearchFlight";
import ResultsPage from "../../Components/ResultList/Results";
import MainPage from "./MainPage";
import Icon from "react-native-ionicons";
import { Button, Image, TouchableHighlight } from "react-native";
import { MainPageProps } from "../../services/interfaces.ts/interfaces";
import { CHEVRON_BACK } from "../../helpers/images";

const Stack = createNativeStackNavigator();

export const MainPageStackNavigator = ({ navigation }: MainPageProps) => {
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
        options={{
          title: "Search Flight",
          headerLeft: () => (
            <TouchableHighlight
              activeOpacity={0.7}
              underlayColor={"transparent"}
              onPress={() => navigation.navigate("Main Page")}
            >
              <Image
                source={CHEVRON_BACK}
                style={{ width: 20, height: 20, marginRight: 30 }}
              />
            </TouchableHighlight>
          ),
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsPage}
        options={{
          title: "Results",
          headerTitle: "Flights",
          headerLeft: () => (
            <TouchableHighlight
              activeOpacity={0.7}
              underlayColor={"transparent"}
              onPress={() => navigation.navigate("Search Flight")}
            >
              <Image
                source={CHEVRON_BACK}
                style={{ width: 20, height: 20, marginRight: 30 }}
              />
            </TouchableHighlight>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
