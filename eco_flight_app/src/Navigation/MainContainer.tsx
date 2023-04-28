import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens

import MainPage from "./Pages/MainPage";
import ListOfBookingsPage from "./Pages/ListOfBookings";
import BookingPage from "./Pages/BookingPage";
import { MainPageStackNavigator } from "./Pages/MainPageStackNav";

// Screen names
const MainName = "Main";
const BookingName = "Booking";
const ListName = "List of Bookings";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={MainName}
          screenOptions={({ route }) => ({
            // headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              if (rn === MainName) {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === BookingName) {
                iconName = focused ? "camera" : "camera-outline";
              } else if (rn === ListName) {
                iconName = focused ? "list" : "list-outline";
              }

              return (
                <Ionicons
                  name={iconName !== undefined ? iconName : ""}
                  size={size}
                  color={color}
                />
              );
            },
          })}
          // tabBarOptions={{
          //     activeTintColor: '#385399',
          //     inactiveTintColor: 'grey',
          //     labelStyle: { paddingBottom: 5, fontSize: 10 },
          // }}
        >
          <Tab.Screen
            name={MainName}
            component={MainPageStackNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen name={BookingName} component={BookingPage} />
          <Tab.Screen name={ListName} component={ListOfBookingsPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
