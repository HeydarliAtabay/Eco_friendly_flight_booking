import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import API from '../../../services/API';


interface MainPageProps {
    navigation: NativeStackNavigationProp<any, any>;
}
interface userSignUpInterface {
    name: string,
    surname: string,
    phone_number: string,
    email: string,
    hashed_password: string
}
export default function SignupPage({ navigation }: MainPageProps) {
    const [userInfo, setUserInfo] = useState<userSignUpInterface>({
        name: '',
        surname: '',
        phone_number: '',
        email: '',
        hashed_password: ''
    })
    const [secondPassword, setSecondPassword] = useState('')
    const [paswordsAreSame, setPasswordsAreSame] = useState(false)

    async function handleSignUp() {
        if (userInfo.name !== '' && userInfo.surname !== '' && userInfo.phone_number !== '' && userInfo.email !== '' && userInfo.hashed_password !== '') {
            await API.userSignUp(userInfo).then(() => {
                navigation.navigate('Login')
            }).catch((error) => alert(error))
        }
    }
    return (
        <ScrollView style={styles.scroll} automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >

            <View style={styles.container}>
                <Text style={styles.titleText}>Create Account</Text>
                <TextInput

                    style={styles.TextInput}
                    label="Name"
                    returnKeyType="next"
                    underlineColor='transparent'
                    value={userInfo.name}
                    onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}

                // error={!!name.error}
                />
                <TextInput
                    style={styles.TextInput}
                    label="Surname"
                    returnKeyType="next"
                    underlineColor='transparent'
                    value={userInfo.surname}
                    onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
                // error={!!name.error}
                />
                <TextInput
                    style={styles.TextInput}

                    label="Telephone"
                    returnKeyType="next"
                    underlineColor='transparent'
                    value={userInfo.phone_number}
                    onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
                    // error={!!email.error}
                    // errorText={email.error}
                    autoCapitalize="none"
                    // autoCompleteType="email"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.TextInput}

                    label="Email"
                    returnKeyType="next"
                    underlineColor='transparent'
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                    // error={!!email.error}
                    // errorText={email.error}
                    autoCapitalize="none"
                    // autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.TextInput}

                    label="Password"
                    returnKeyType="done"
                    underlineColor='transparent'
                    value={userInfo.hashed_password}
                    onChangeText={(text) => setUserInfo({ ...userInfo, hashed_password: text })}
                    // error={!!password.error}
                    secureTextEntry
                />
                <TextInput
                    style={styles.TextInput}

                    label="Confirm Password"
                    returnKeyType="done"
                    underlineColor='transparent'
                    value={secondPassword}
                    onChangeText={(text) => {
                        if (text === userInfo.hashed_password) {
                            setPasswordsAreSame(true)
                        }
                        else {
                            setPasswordsAreSame(false)
                        }
                        setSecondPassword(text)

                    }}
                    error={secondPassword.length !== 0 && !paswordsAreSame}
                    secureTextEntry
                />
                <Button
                    onPress={handleSignUp}
                    mode="contained"
                    style={{ marginTop: 24 }}
                    disabled={!paswordsAreSame ? true : false}
                >
                    Sign Up
                </Button>

                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: '#800080',
    },
    TextInput: {
        width: '80%',
        marginBottom: 5,
        borderRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: 'lightblue'
    },
    scroll: {
        flexGrow: 1,
        backgroundColor: "#fff",
        display: 'flex',
        margin: 'auto',
        marginTop: 'auto'

    },
});