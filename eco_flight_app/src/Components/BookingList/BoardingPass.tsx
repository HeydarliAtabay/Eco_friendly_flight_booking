import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { BAGGAGE, HANDBAGGAGE, SEAT } from '../../helpers/images';
import { DARKER_GRAY, DARK_GRAY, GRAY, GREEN } from '../../helpers/styles';
import { useStore } from '../../store/storeHooks';
import BoardingFLightInfo from './BoardingFlightInfo';
import BoardingPassengerInfo from './BoardingPassengerInfo';
import BoardingQR from './BoardingQR';
import BoardingTimeInfo from './BoardingTimeInfo';

export default function BoardingPass() {
    const { selectedBookedFLight } = useStore(({ booking }) => booking)
    console.log(selectedBookedFLight)
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                <Card.Content>
                    <BoardingFLightInfo />
                    <View style={styles.dottedLine} />
                    <BoardingPassengerInfo />
                    <View style={styles.dottedLine} />
                    <BoardingTimeInfo />
                    <View style={styles.dottedLine} />

                    {selectedBookedFLight?.checkin_status === 'DONE' ?
                        <BoardingQR />
                        : selectedBookedFLight?.checkin_status === "PENDING" ?
                            <View>
                                <Text> Do check-in </Text>
                            </View>
                            :
                            <View>
                                <Text>Check-in is not available. It will open 48 hours before flight's departure time</Text>
                            </View>
                    }
                    <View style={{ height: 15 }} />
                    <View style={styles.dottedLine} />
                    <View style={styles.baggageImagesBox}>
                        {selectedBookedFLight?.baggage !== null && selectedBookedFLight?.baggage.length !== 0 && selectedBookedFLight?.baggage.map((baggage, index) => {
                            if (baggage.type === 'Hand') return (
                                <View key={index} style={{ display: 'flex', flexDirection: 'row', marginRight: 15 }}>
                                    <Text style={{ color: DARK_GRAY, marginTop: 'auto', fontSize: 18, marginBottom: 17 }} >{`${baggage.amount}x`}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'column' }} >
                                        <Image source={HANDBAGGAGE}
                                            style={{ width: 40, height: 40 }}
                                        />
                                        <Text style={{ marginLeft: 'auto', color: DARK_GRAY, marginRight: 'auto' }}>{`${baggage.kg}kg`}</Text>
                                    </View>

                                </View>

                            )
                            if (baggage.type === 'Checkin') return (
                                <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ color: DARK_GRAY, marginTop: 'auto', fontSize: 18, marginBottom: 17 }} >{`${baggage.amount}x`}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'column' }} >
                                        <Image source={BAGGAGE}
                                            style={{ width: 40, height: 40 }}
                                        />
                                        <Text style={{ marginLeft: 'auto', color: DARK_GRAY, marginRight: 'auto' }}>{`${baggage.kg}kg`}</Text>
                                    </View>

                                </View>
                            )
                        })}


                    </View>
                </Card.Content>
            </Card>
        </View >
    );
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
    baggageImagesBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        paddingLeft: 4, marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
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