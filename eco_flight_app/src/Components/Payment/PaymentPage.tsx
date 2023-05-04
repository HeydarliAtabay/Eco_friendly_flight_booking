import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import API from '../../services/API';
import { Payment_Status } from '../../services/interfaces.ts/interfaces';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import { payForFlight } from '../ResultList/ResultList.slice';
import SearchInfo from '../ResultList/SearchInfo';


// interface MainPageProps {
//     navigation: NativeStackNavigationProp<any, any>;
// }
export default function PaymentPageForBooking() {
    const { selectedFlight } = useStore(({ search_results }) => search_results)

    async function bookAFlight() {
        if (selectedFlight) {
            await API.bookFlight(selectedFlight).then(() => {
                alert('Succesfully booked')
                // navigation.navigate('Main Page')
            }).catch((error) => alert(error))
        }
    }

    const handleFlightBooking = () => {
        store.dispatch(payForFlight(Payment_Status.paid))
        if (selectedFlight !== undefined) {
            bookAFlight()
        }
    }

    return (
        <View style={styles.container}>
            <SearchInfo />
            <Button
                onPress={handleFlightBooking}
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