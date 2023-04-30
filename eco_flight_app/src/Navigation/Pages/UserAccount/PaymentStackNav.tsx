import * as React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import PaymentDetailsPage from "./PaymentDetails";
import UserProfilePage from "./UserProfilePage";
import CreditCardAdd from "./CreditCardAdd";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();



export const PaymentStackNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Payment" >
                <Stack.Screen
                    name="Payment"
                    component={PaymentDetailsPage}
                    options={{ title: "Payment", headerShown:false }}
                />
                <Stack.Screen
                    name="CreditAdd"
                    component={CreditCardAdd}
                    options={{ title: "Add Credit card details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
};
