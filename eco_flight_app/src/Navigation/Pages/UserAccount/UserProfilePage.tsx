import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ActivityIndicator, Avatar, Button, Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { initializeApp, loadUser, logout } from '../../../../App.slice';
import { PAYMENTMETHODSICON, SUPPORT, TRAVELER } from '../../../helpers/images';
import { GRAY } from '../../../helpers/styles';
import API from '../../../services/API';
// import API from '../../services/API';
import { store } from '../../../store/store';
import { useStore } from '../../../store/storeHooks';
import { initializeLogin } from '../Login/Login.slice';
import FAQ from './FAQ';
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
    const [showSupport, setShowSupport] = useState(false)
    const [userInfo, setUserinfo] = useState<UserUpdateInterface>(
        {
            name: user ? user.name : '',
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

    function updateUserInfo() {
        if (user) {
            setLoading(true)
            API.updateUserPersonalData(userInfo, user?.id)
                .then(() => {
                    API.getUserInfo().then((result) => {
                        store.dispatch(loadUser(result))
                    }).catch(err => (err))
                }).catch(err => (err))
            setLoading(false)
        }
        setActiveModify(false)

    }

    async function handleDiscardChanges() {
        if (user) {
            setUserinfo({ ...userInfo, name: user?.name })
            setUserinfo({ ...userInfo, surname: user?.surname })
            setUserinfo({ ...userInfo, phone_number: user?.phone_number })
        }
        setActiveModify(false)

    }
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>

                <Button icon={'close'} mode="contained"
                    buttonColor='#FF6666'
                    style={{ display: 'flex', width: '30%', marginRight: 'auto', marginTop: 0 }}
                    labelStyle={{ fontSize: 14 }}
                    onPress={handleLogout}>
                    Log out
                </Button>
                {loading ?
                    <View style={{ display: 'flex', height: 450 }}>
                        <ActivityIndicator style={{ marginTop: 'auto', marginBottom: 'auto' }} size={56} animating={true} color={'black'} />
                    </View>
                    :
                    <View style={styles.userInfoView}>
                        {/* 
                        <Avatar.Text
                            style={{ marginRight: 'auto', position: 'relative', maxWidth: '35%' }}
                            size={100} label={user?.name[0] + '' + user?.surname[0]} /> */}
                        <View style={styles.nameEmailBox}>
                            <Text style={styles.nameSurnameText}>{`${user?.name} ${user?.surname}`}</Text>
                            <Text style={styles.emailText}>{`${user?.username}`}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', display: 'flex', marginLeft: 'auto' }}>
                            <Image source={TRAVELER} style={{ height: 140, width: 140, marginLeft: 'auto' }} />
                        </View>
                    </View>
                }
                <View style={{
                    height: 60, width: '100%', backgroundColor: '#ededed', display: 'flex', flexDirection: 'row',
                    borderTopLeftRadius: 12, borderTopRightRadius: 12
                }}>
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
                                onPress={handleDiscardChanges}
                                textColor={'red'}
                            >
                            </Button>
                            <Button style={{ marginTop: 'auto', marginBottom: 'auto', width: 30, marginLeft: 'auto', marginRight: 20 }}
                                labelStyle={{ fontSize: 26 }}
                                icon="check"
                                onPress={updateUserInfo}
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
                        autoCapitalize="none"
                        textContentType="name"
                        disabled={activeModify ? false : true}
                    />
                    <TextInput
                        style={styles.TextInput}
                        label="Surname"
                        returnKeyType="next"
                        value={userInfo.surname}
                        onChangeText={(text) => setUserinfo({ ...userInfo, surname: text })}
                        autoCapitalize="none"
                        textContentType="name"
                        disabled={activeModify ? false : true}
                    />
                    <TextInput
                        style={styles.TextInput}
                        label="Telephone"
                        returnKeyType="next"
                        value={userInfo.phone_number}
                        onChangeText={(text) => setUserinfo({ ...userInfo, phone_number: text })}
                        autoCapitalize="none"
                        textContentType="telephoneNumber"
                        keyboardType="phone-pad"
                        disabled={activeModify ? false : true}
                    />
                    <View style={{
                        display: 'flex', flexDirection: 'row', width: '95%', height: 200, borderRadius: 12, padding: 10, columnGap: 20,
                        rowGap: 20, alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: GRAY,
                            height: 140, borderRadius: 12, marginRight: 20, borderColor: 'black', borderWidth: 1
                        }}
                            onPress={() => setPaymentDetailsShow(true)}>

                            <Image style={{ width: 60, height: 60 }} source={PAYMENTMETHODSICON} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: GRAY,
                            height: 140, borderRadius: 12, borderColor: 'black', borderWidth: 1
                        }}
                            onPress={() => setShowSupport(true)}>

                            <Image style={{ width: 60, height: 60 }} source={SUPPORT} />
                        </TouchableOpacity>
                    </View>

                </View>

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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showSupport}
                    onRequestClose={() => {
                        setShowSupport(!showSupport);
                    }}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-down"
                            size={30}
                            onPress={() => setShowSupport(false)}
                        />
                        <Text style={styles.title}>Support</Text>
                    </View>
                    <FAQ closeFunc={setShowSupport} />
                </Modal>
            </Card>
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
    cardContainer: {
        width: '95%',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 15,

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
        fontSize: 22,
        marginTop: 15,
        textAlign: 'left',
        flexWrap: 'wrap'

    },
    emailText: {
        fontSize: 18,
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
        padding: 0,
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '75%'
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

