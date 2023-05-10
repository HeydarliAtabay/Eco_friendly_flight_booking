import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens

import ListOfBookingsPage from "../Components/BookingList/ListOfBookings";
import BookingPage from "./Pages/BookingPage";
// import UserProfilePage from "./Pages/UserAccount/UserProfilePage";
import UserProfilePage from "./Pages/UserAccount/UserProfilePage";
import { MainPageStackNavigator } from "./Pages/MainPageStackNav";
import { GREEN } from "../helpers/styles";

// Screen names
const MainName = "Main";
const ListName = "My flights";
const UserProfileName = "Profile";

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
              } else if (rn === ListName) {
                iconName = focused ? "list" : "list-outline";
              } else if (rn === UserProfileName) {
                iconName = focused ? "person" : "person-outline";
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
            options={{ headerShown: false, tabBarActiveTintColor: GREEN }}
          />
          <Tab.Screen
            name={ListName}
            component={ListOfBookingsPage}
            options={{ tabBarActiveTintColor: GREEN }}
          />
          <Tab.Screen
            name={UserProfileName}
            component={UserProfilePage}
            options={{ tabBarActiveTintColor: GREEN }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
