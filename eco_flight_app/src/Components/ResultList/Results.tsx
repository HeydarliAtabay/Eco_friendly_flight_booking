import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchInfo from './SearchInfo';
import SingleResultCard from './SingleResultCard';

interface FlightDetailsInterace {
    airline: string
}

const flights: FlightDetailsInterace[] = [{
    airline: 'ryanair'
},
{
    airline: 'wizzair'
}
]

export default function ResultsPage() {
    return (
        <View style={styles.container}>
            <SearchInfo />
            {flights.map((flight) => {
                return (
                    <SingleResultCard airline={flight.airline} />
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});