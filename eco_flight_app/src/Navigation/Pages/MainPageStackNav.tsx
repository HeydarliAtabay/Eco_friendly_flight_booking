import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchFlight from "../../Components/SearchFlight/SearchFlight";
import ResultsPage from "../../Components/ResultList/Results";
import MainPage from "./MainPage";
import { Image, TouchableHighlight } from "react-native";
import { MainPageProps } from "../../services/interfaces.ts/interfaces";
import { CHEVRON_BACK } from "../../helpers/images";
import FlightClassSelection from "../../Components/Booking/FlightClassSelection";
import SeatSelection from "../../Components/Booking/SeatSelection";
import PaymentPageForBooking from "../../Components/Payment/PaymentPage";

const Stack = createNativeStackNavigator();

export const MainPageStackNavigator = ({ navigation }: MainPageProps) => {
  const BackButton = (backTo: string) => (
    <TouchableHighlight
      activeOpacity={0.7}
      underlayColor={"transparent"}
      onPress={() => navigation.navigate(backTo)}
    >
      <Image
        source={CHEVRON_BACK}
        style={{ width: 20, height: 20, marginRight: 30 }}
      />
    </TouchableHighlight>
  );

  return (
    <Stack.Navigator initialRouteName="Main Page">
      <Stack.Screen
        name="Main Page"
        component={MainPage}
        options={{ title: "Eco Flight" }}
      />
      <Stack.Screen
        name="Search Flight"
        component={SearchFlight}
        options={{
          title: "Search Flight",
          headerLeft: () => BackButton("Main Page"),
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsPage}
        options={{
          title: "Results",
          headerTitle: "Available Flights",
          headerLeft: () => BackButton("Search Flight"),
        }}
      />
      <Stack.Screen
        name="Flight Class"
        component={FlightClassSelection}
        options={{
          title: "Flight Class",
          headerTitle: "Select your flight class",
          headerLeft: () => BackButton("Results"),
        }}
      />
      <Stack.Screen
        name="Seat Selection"
        component={SeatSelection}
        options={{
          title: "Seat Selection",
          headerTitle: "Select your seat",
          headerLeft: () => BackButton("Flight Class"),
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentPageForBooking}
        options={{
          title: "Payment",
          headerTitle: "Select payment method",
          headerLeft: () => BackButton("Seat Selection"),
        }}
      />
    </Stack.Navigator>
  );
};
