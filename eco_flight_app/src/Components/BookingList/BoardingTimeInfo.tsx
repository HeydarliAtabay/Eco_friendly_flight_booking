import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DARKER_GRAY, DARK_GRAY, GRAY, GREEN } from '../../helpers/styles';
import { useStore } from '../../store/storeHooks';

export default function BoardingTimeInfo() {
    const { selectedBookedFLight } = useStore(({ booking }) => booking)
    const inputMoment = moment(selectedBookedFLight?.flight_info.departure_time, 'HH:mm');
    const outputMoment = inputMoment.subtract(30, 'minutes');
    const outputTime = outputMoment.format('HH:mm');
    return (
        <View style={styles.detailedInfoBoxColored}>
            <View style={{ display: 'flex', flexDirection: 'column', width: '26%' }} >
                <Text style={{ color: DARK_GRAY, fontSize: 18 }}>Date</Text>
                <Text style={{ color: 'black', fontSize: 18 }}>{moment(selectedBookedFLight?.flight_info.departure_date).format('DD MMM')}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={{ display: 'flex', flexDirection: 'column', width: '37%' }} >
                <Text style={{ color: DARK_GRAY, fontSize: 18 }}>Gate Closes</Text>
                <Text style={{ color: 'black', fontSize: 18 }}>{outputTime}</Text>
            </View>
            <View style={styles.verticalDivider} />

            <View style={{ display: 'flex', flexDirection: 'column', width: '37%' }} >
                <Text style={{ color: DARK_GRAY, fontSize: 18 }}>Departure</Text>
                <Text style={{ color: 'black', fontSize: 18 }}>{selectedBookedFLight?.flight_info.departure_time}</Text>
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
        paddingLeft: 4,
        paddingTop: 10,
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