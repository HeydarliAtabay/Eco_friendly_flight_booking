import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, View } from 'react-native'
import { GREEN, WHITE_SMOKE } from "../../helpers/styles";


const departureCity = 'Milan'
const arrivalCity = 'London'
const date = 'Mon, May 5, 1 adult'
export default function SearchInfo() {
    return (
        <View style={styles.container}>
            <View style={styles.smallContainer} >
                <View style={{ margin: 'auto', display: 'flex' }}>
                    <Text style={styles.citiesTxt}>{`${departureCity} - ${arrivalCity}`}</Text>
                    <Text style={styles.citiesTxt}>{`${date}`}</Text>
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
        height: '10%'
    },
    smallContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: 'auto',
        marginBottom: 10
    },
    citiesTxt: {
        color: WHITE_SMOKE,
        fontSize: 16,
        textAlign: 'center'
    }
});