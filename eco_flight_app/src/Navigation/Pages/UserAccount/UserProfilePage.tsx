import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { initializeApp, loadUser, logout } from '../../../../App.slice';
import API from '../../../services/API';
// import API from '../../services/API';
import { store } from '../../../store/store';
import { useStore } from '../../../store/storeHooks';
import { initializeLogin } from '../Login/Login.slice';
import PaymentDetailsPage from './PaymentDetails';

interface UserUpdateInterface {
    name: string,
    surname: string,
    phone_number: string
}


export default function UserProfilePage() {
    const { user } = useStore(({ app }) => app)
    const [loading, setLoading] = useState(false)
    const [activeModify, setActiveModify] = useState(false)
    const [paymentDetailsShow, setPaymentDetailsShow] = useState(false)
    const [userInfo, setUserinfo] = useState<UserUpdateInterface>(
        {
            name: user ? user.name : ' ',
            surname: user ? user.surname : '',
            phone_number: user ? user.phone_number : ''
        }
    )
    const handleLogout = () => {
        API.logOut().then(() => {
            store.dispatch(logout())
            store.dispatch(initializeLogin())
            store.dispatch(initializeApp())
        })
    }

    const handleModify = () => {
        setActiveModify(!activeModify)
    }
    return (
        <View style={styles.container}>
            {loading ?
                <View style={{ display: 'flex', height: 450 }}>
                    <ActivityIndicator style={{ marginTop: 'auto', marginBottom: 'auto' }} size={56} animating={true} color={'black'} />
                </View>
                :
                <View style={styles.userInfoView}>
                    <Avatar.Text
                        style={{ marginTop: 25, marginRight: 'auto', position: 'relative', maxWidth: '35%' }}
                        size={130} label={user?.name[0] + '' + user?.surname[0]} />
                    <View style={styles.nameEmailBox}>
                        <Text style={styles.nameSurnameText}>{`${user?.name} ${user?.surname}`}</Text>
                        <Text style={styles.emailText}>{`${user?.username}`}</Text>
                    </View>
                </View>
            }
            <View style={{ height: 60, width: '100%', backgroundColor: '#ededed', display: 'flex', flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, marginTop: 'auto', marginBottom: 'auto', marginLeft: '5%' }}>Account</Text>

                {!activeModify ?
                    <Button style={{ marginTop: 'auto', marginBottom: 'auto', width: 50, marginLeft: 'auto' }}
                        labelStyle={{ fontSize: 30 }}
                        icon="pen"
                        onPress={handleModify}
                    >
                    </Button>
                    :
                    <View style={{ display: 'flex', flexDirection: 'row', width: 100, marginLeft: 'auto' }}>
                        <Button style={{ marginTop: 'auto', marginBottom: 'auto', width: 30, marginLeft: 'auto', marginRight: 20 }}
                            labelStyle={{ fontSize: 26 }}
                            icon="close"
                            onPress={handleModify}
                            textColor={'red'}
                        >
                        </Button>
                        <Button style={{ marginTop: 'auto', marginBottom: 'auto', width: 30, marginLeft: 'auto', marginRight: 20 }}
                            labelStyle={{ fontSize: 26 }}
                            icon="check"
                            onPress={handleModify}
                            textColor={'green'}
                        >
                        </Button>
                    </View>
                }
            </View>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <TextInput
                    style={styles.TextInput}

                    label="Name"
                    returnKeyType="next"
                    value={userInfo.name}
                    onChangeText={(text) => setUserinfo({ ...userInfo, name: text })}
                    // error={!!email.error}
                    // errorText={email.error}
                    autoCapitalize="none"
                    // autoCompleteType="email"
                    textContentType="name"
                    disabled={activeModify ? false : true}
                />
                <TextInput
                    style={styles.TextInput}

                    label="Surname"
                    returnKeyType="next"
                    value={userInfo.surname}
                    onChangeText={(text) => setUserinfo({ ...userInfo, surname: text })}
                    // error={!!email.error}
                    // errorText={email.error}
                    autoCapitalize="none"
                    // autoCompleteType="email"
                    textContentType="name"
                    disabled={activeModify ? false : true}
                />
                <TextInput
                    style={styles.TextInput}
                    label="Telephone"
                    returnKeyType="next"
                    value={userInfo.phone_number}
                    onChangeText={(text) => setUserinfo({ ...userInfo, phone_number: text })}
                    // error={!!email.error}
                    // errorText={email.error}
                    autoCapitalize="none"
                    // autoCompleteType="email"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    disabled={activeModify ? false : true}
                />

                <Button icon={'bank'} mode="contained"
                    buttonColor='#ededed'
                    textColor='black'
                    style={{ display: 'flex', marginTop: 'auto', borderRadius: 0, height: 50 }}
                    onPress={() => setPaymentDetailsShow(true)}>
                    Payment Details
                </Button>

            </View>
            <Text>{process.env.REACT_APP_LOCAL_IPv4_ADRESS}</Text>
            <Button icon={'close'} mode="contained"
                buttonColor='#FF6666'
                style={{ display: 'flex', marginTop: 'auto', marginBottom: 25 }}
                onPress={handleLogout}>
                Log out from account
            </Button>
            <Modal
                animationType="slide"
                transparent={true}
                visible={paymentDetailsShow}
                onRequestClose={() => {
                    setPaymentDetailsShow(!paymentDetailsShow);
                }}>
                <View style={styles.header}>
                    <Icon
                        name="chevron-down"
                        size={30}
                        onPress={() => setPaymentDetailsShow(false)}
                    />
                    <Text style={styles.title}>Payment details</Text>
                </View>
                <PaymentDetailsPage />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    nameSurnameText: {
        fontSize: 26,
        marginTop: 15,
        textAlign: 'left',
        flexWrap: 'wrap'

    },
    emailText: {
        fontSize: 25,
        flexWrap: 'wrap'
    },
    userInfoView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        position: 'relative'
    },
    nameEmailBox: {
        padding: 10,
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '65%'
    },
    TextInput: {
        width: '100%',
        borderWidth: 0,
        backgroundColor: '#fff',
        fontSize: 20

    },
    header: {
        height: 60,
        backgroundColor: '#ededed',
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginTop: 45
    },
    title: {
        fontSize: 20,
        marginLeft: 30,
    },
});

