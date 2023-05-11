import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CreditCardAdd from './CreditCardAdd';
import PayPalAdd from './PaypallAdd';

export default function PaymentDetailsPage() {
    const [showCreditCardPage, setShowCreditCardPage] = useState(false)
    const [showPaypalAddPage, setShowPayPallAddPage] = useState(false)
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', marginTop: 10 }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Card style={styles.card}

                >
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                            setShowCreditCardPage(true)
                        }}
                    >
                        <Card.Content style={{ width: '100%' }}>
                            <Card.Cover
                                style={{ width: '100%' }}
                                source={require("../../../../assets/credit_cards.jpg")} />
                        </Card.Content>
                    </TouchableOpacity>
                </Card>
                {/* <Card style={styles.card}
                >
                    <TouchableOpacity
                        style={{ width: '100%' }}
                    >
                        <Card.Content style={{ width: '100%' }}>
                            <Card.Cover
                                style={{ width: '100%' }}
                                source={require("../../../../assets/contactless.jpg")} />
                        </Card.Content>
                    </TouchableOpacity>
                </Card> */}
                <Card style={styles.card}
                >
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                            setShowPayPallAddPage(true)
                        }}
                    >
                        <Card.Content style={{ width: '100%' }}>
                            <Card.Cover
                                style={{ width: '100%' }}
                                source={require("../../../../assets/paypal.jpg")} />
                        </Card.Content>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCreditCardPage}
                onRequestClose={() => {
                    setShowCreditCardPage(!showCreditCardPage);
                }}>
                <View style={styles.header}>
                    <Icon
                        name="chevron-down"
                        size={30}
                        onPress={() => setShowCreditCardPage(false)}
                    />
                    <Text style={styles.title}>Credit card info</Text>
                </View>
                <CreditCardAdd closeFunc={setShowCreditCardPage} />
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPaypalAddPage}
                onRequestClose={() => {
                    setShowPayPallAddPage(!showPaypalAddPage);
                }}>
                <View style={styles.header}>
                    <Icon
                        name="chevron-down"
                        size={30}
                        onPress={() => setShowPayPallAddPage(false)}
                    />
                    <Text style={styles.title}>Paypal account info</Text>
                </View>
                <PayPalAdd closeFunc={setShowPayPallAddPage} />
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
    card: {
        width: '100%',
        padding: 0,
        marginBottom: 10,
        backgroundColor: '#fff'
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