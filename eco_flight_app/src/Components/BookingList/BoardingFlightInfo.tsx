import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DARKER_GRAY, DARK_GRAY, GRAY } from '../../helpers/styles';
import { useStore } from '../../store/storeHooks';

export default function BoardingFLightInfo() {
    const { selectedBookedFLight } = useStore(({ booking }) => booking)
    const { user } = useStore(({ app }) => app)
    return (
        <View style={styles.detailedInfoBox}>

            <View style={{ display: 'flex', flexDirection: 'row', padding: 5, paddingBottom: 10 }} >
                <View style={{ display: 'flex', flexDirection: 'column', width: '40%' }} >
                    <Text style={styles.airportCodeTxt} >{selectedBookedFLight?.departureAirport.code}</Text>
                    <Text style={styles.airportNameTxt} >{`${selectedBookedFLight?.departureAirport.name}`} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', width: '20%' }} >
                    <Text style={{ fontSize: 14 }} >{selectedBookedFLight?.flight_info.flight_number}</Text>
                    <Icon style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        name='airplane'
                        size={50}
                        color={DARK_GRAY}
                    ></Icon>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', alignItems: 'flex-end', width: '40%' }} >
                    <Text style={styles.airportCodeTxt} >{selectedBookedFLight?.arrivalAirport.code}</Text>
                    <Text style={styles.airportNameTxt} >{`${selectedBookedFLight?.arrivalAirport.name}`} </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    },
    cardContainer: {
        height: '90%',
        width: '90%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 0
    },
    QRcontainer: {
        width: '90%',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: GRAY,
        alignItems: 'center', margin: 'auto'

    },
    detailedInfoBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 10
    },

    detailedInfoBoxColored: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        paddingLeft: 4
    },
    dottedLine: {
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'black',
        borderRadius: 10, // Adjust this value to change the dot size
        width: '100%',
    },
    airportCodeTxt: {
        fontSize: 44,
        fontWeight: '300',
        color: DARKER_GRAY
    },
    airportNameTxt: {
        fontSize: 18,
        color: DARK_GRAY,

    },
    verticalDivider: {
        width: 1,
        borderLeftColor: 'black',
        borderLeftWidth: 1,
        marginRight: 10,
    }
});