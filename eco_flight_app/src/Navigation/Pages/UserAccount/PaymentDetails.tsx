import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

interface MainPageProps {
    navigation: NativeStackNavigationProp<any, any>;
}
export default function PaymentDetailsPage({ navigation }: MainPageProps) {
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', marginTop: 10 }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Card style={styles.card}
                    onPress={() => {
                        navigation.navigate('CreditAdd')
                    }}
                >
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                            navigation.navigate('CreditAdd')
                        }}
                    >
                        <Card.Content style={{ width: '100%' }}>
                            <Card.Cover
                                style={{ width: '100%' }}
                                source={require("../../../../assets/credit_cards.jpg")} />
                        </Card.Content>
                    </TouchableOpacity>
                </Card>
                <Card style={styles.card}
                    onPress={() => {
                        navigation.navigate('CreditAdd')
                    }}
                >
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                            navigation.navigate('CreditAdd')
                        }}
                    >
                        <Card.Content style={{ width: '100%' }}>
                            <Card.Cover
                                style={{ width: '100%' }}
                                source={require("../../../../assets/contactless.jpg")} />
                        </Card.Content>
                    </TouchableOpacity>
                </Card>
                <Card style={styles.card}
                    onPress={() => {
                        navigation.navigate('CreditAdd')
                    }}
                >
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                            navigation.navigate('CreditAdd')
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
    }
});