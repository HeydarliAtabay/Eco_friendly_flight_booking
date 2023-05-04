import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, View } from 'react-native'
import { GREEN, WHITE_SMOKE } from "../../helpers/styles";
import { useStore } from "../../store/storeHooks";


const departureCity = 'Milan'
const arrivalCity = 'London'
const date = 'Mon, May 5, 1 adult'
export default function SearchInfo() {
    const { departureDate, airports, passengers } = useStore(({ search_flight }) => search_flight)
    return (
        <View style={styles.container}>
            <View style={styles.smallContainer} >
                <View style={{ margin: 'auto', display: 'flex' }}>
                    <Text style={styles.citiesTxt}>{`${airports.from?.city} - ${airports.to?.city}`}</Text>
                    <Text style={styles.citiesTxt}>{`${departureDate.format("DD MMM YYYY")}, ${passengers.adults} adults, ${passengers.childen} children
                    `}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: GREEN,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        height: '10%',
    },
    smallContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop:'auto'

    },
    citiesTxt: {
        color: WHITE_SMOKE,
        fontSize: 16,
        textAlign: 'center'
    }
});