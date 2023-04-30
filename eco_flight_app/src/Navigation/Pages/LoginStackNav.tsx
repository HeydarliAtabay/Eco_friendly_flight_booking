import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupPage from "./Login/SignupPage";
import LoginPage from "./Login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const LoginPageStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{ title: "Login", headerShown:false }}
                />
                <Stack.Screen
                    name="Sign up"
                    component={SignupPage}
                    options={{ title: "Sign up" }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
};
