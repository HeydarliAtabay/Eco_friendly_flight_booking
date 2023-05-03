import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Move_Modal, Payment_Status } from '../../services/interfaces.ts/interfaces';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import { changeActiveModalIndex, payForFlight } from '../ResultList/ResultList.slice';
import SearchInfo from '../ResultList/SearchInfo';

export default function PaymentPageForBooking() {


    return (
        <View style={styles.container}>
            <SearchInfo />
            <Button
                onPress={() => {
                    store.dispatch(payForFlight(Payment_Status.paid))
                    store.dispatch(changeActiveModalIndex(Move_Modal.back))
                }}
            >
                Pay for the flight
            </Button>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    TextInput: {
        width: '40%',
        marginBottom: 5,
        borderRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 0,
        borderBottomWidth: 0
    },
});