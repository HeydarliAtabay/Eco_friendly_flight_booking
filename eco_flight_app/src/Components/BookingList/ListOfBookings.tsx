import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import API from '../../services/API';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import { loadBookedFlights } from './Booking.slice';

export default function ListOfBookingsPage() {
    const { user } = useStore(({ app }) => app)
    const { bookedFlights } = useStore(({ booking }) => booking)

    async function getBookedFlightsOfUser() {
        if (user) {
            await API.getBookedFlights(user.id).then((res) => {
                store.dispatch(loadBookedFlights(res))
                console.log(bookedFlights)

            })
        }
    }
    useEffect(() => {
        if (user !== undefined) {
            getBookedFlightsOfUser()
        }
    }, [])
    return (
        <View style={styles.container}>
            <Text>List of bookings will be shown here</Text>
            <StatusBar style="auto" />
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
});