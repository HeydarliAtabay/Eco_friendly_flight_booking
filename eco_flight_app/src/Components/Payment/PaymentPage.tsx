import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import API from '../../services/API';
import { Payment_Status, Selected_class } from '../../services/interfaces.ts/interfaces';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import { payForFlight } from '../ResultList/ResultList.slice';
import SearchInfo from '../ResultList/SearchInfo';


// interface MainPageProps {
//     navigation: NativeStackNavigationProp<any, any>;
// }
export default function PaymentPageForBooking() {
    const { selectedFlight, selectedFlightDetailedIngo } = useStore(({ search_results }) => search_results)
    const { passengers } = useStore(({ search_flight }) => search_flight)
    console.log(selectedFlight)

    async function bookAFlight() {
        if (selectedFlight) {
            await API.bookFlight(selectedFlight).then(() => {
                alert('Succesfully booked')
                // navigation.navigate('Main Page')
            }).catch((error) => alert(error))
        }
    }

    const handleFlightBooking = () => {
        let paidPrice: number = 0
        if (selectedFlight !== undefined) {

            if (selectedFlight?.selected_class === Selected_class.econom) {
                paidPrice = Number(selectedFlightDetailedIngo.econom_price) * (passengers.adults + (passengers.childen * 0.75))
                store.dispatch(payForFlight(paidPrice))
                bookAFlight()

            }
            if (selectedFlight?.selected_class === Selected_class.business) {
                paidPrice = Number(selectedFlightDetailedIngo.business_price) * (passengers.adults + (passengers.childen * 0.75))
                store.dispatch(payForFlight(paidPrice))
                bookAFlight()

            }
            if (selectedFlight?.selected_class === Selected_class.first) {
                paidPrice = Number(selectedFlightDetailedIngo.first_class_price) * (passengers.adults + (passengers.childen * 0.75))
                store.dispatch(payForFlight(paidPrice))
                bookAFlight()

            }
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