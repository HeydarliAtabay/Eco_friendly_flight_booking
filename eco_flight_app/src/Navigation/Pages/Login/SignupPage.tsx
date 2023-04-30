import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


interface MainPageProps {
    navigation: NativeStackNavigationProp<any, any>;
}
export default function SignupPage({ navigation }: MainPageProps) {
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
                // value={name.value}
                // onChangeText={(text) => setName({ value: text, error: '' })}
                // error={!!name.error}
                />
                <TextInput
                    style={styles.TextInput}
                    label="Surname"
                    returnKeyType="next"
                    underlineColor='transparent'
                // value={name.value}
                // onChangeText={(text) => setName({ value: text, error: '' })}
                // error={!!name.error}
                />
                <TextInput
                    style={styles.TextInput}

                    label="Telephone"
                    returnKeyType="next"
                    underlineColor='transparent'

                    // value={email.value}
                    // onChangeText={(text) => setEmail({ value: text, error: '' })}
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

                    // value={email.value}
                    // onChangeText={(text) => setEmail({ value: text, error: '' })}
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

                    // value={password.value}
                    // onChangeText={(text) => setPassword({ value: text, error: '' })}
                    // error={!!password.error}
                    secureTextEntry
                />
                <Button
                    mode="contained"
                    // onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
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
        borderBottomWidth: 0
    },
    scroll: {
        flexGrow: 1,
        backgroundColor: "#fff",
        display: 'flex',
        margin: 'auto',
        marginTop: 'auto'

    },
});