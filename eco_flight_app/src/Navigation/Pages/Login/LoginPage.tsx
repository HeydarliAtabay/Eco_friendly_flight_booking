import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { store } from "../../../store/store";
import { useStore } from "../../../store/storeHooks";
import { LoginState, updateField } from "./Login.slice";
import API from '../../../services/API'

// interface MainPageProps {
//     navigation: NativeStackNavigationProp<any, any>;
// }

export default function LoginPage() {
    const { user } = useStore(({ login }) => login)
    function onUpdateField(name: string, value: string) {
        store.dispatch(updateField({ name: name as keyof LoginState['user'], value }));
    }
    const doLogIn = async (credentials: { email: string, password: string }) => {
        try {
            const user = await API.logIn(credentials);

            alert(`Welcome, ${user}!`);

        } catch (err) {
            alert({ msg: err, type: 'danger' });
        }
    }
    // logout
    // const doLogOut = async () => {
    //     await API.logOut();
    //     // clean up everything
    // }

    const handleSubmit = () => {
        let valid = true;
        if (user.email === "" || user.password === "" || user.password.length < 6)
            valid = false;

        if (valid) {
            doLogIn(user).then(() => {
                alert('logged in succesfuly')
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            })

        }


    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image style={styles.image} source={require("../../../../assets/airplane.png")} />
            <Text style={{ fontSize: 20, marginBottom: 5 }}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(v: string) => {
                        onUpdateField('email', v)
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(v: string) => {
                        onUpdateField('password', v)
                    }}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}
                onPress={handleSubmit}
            >
                <Text>Login</Text>
            </TouchableOpacity>

            <Text> {user.email}</Text>
            <Text>{user.password}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        margin: 'auto',
        width: 270,
        height: 270,

        marginBottom: 50,
    },
    input: {
        height: 40,
        margin: 5,
        width: '60%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15
    },
    inputView: {
        backgroundColor: "#ADD8E6",
        borderRadius: 12,
        width: "85%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "85%",
        borderRadius: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ADD8E6",
    },

});
