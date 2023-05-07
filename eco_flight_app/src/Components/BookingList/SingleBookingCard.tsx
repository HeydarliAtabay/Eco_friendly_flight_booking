import React from "react";
import { Button, Card } from "react-native-paper";
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { ECO, getLogoFromAirlineId, getLogoFromAirlineName, RYANAIR } from "../../helpers/images";
import { DARKER_GRAY, DARK_GRAY, GRAY, GREEN } from "../../helpers/styles";
import { BookedFlightInfo, Checkin_Status, Move_Modal, Payment_Status, SearchFlightResultSingle, SelectedFlight } from "../../services/interfaces.ts/interfaces";
import { useStore } from "../../store/storeHooks";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { store } from "../../store/store";
import { selectBookedFlight } from "./Booking.slice";


interface CardInterface {
    flight: BookedFlightInfo
}
export default function SingleBookingCard(props: CardInterface) {
    const { passengers } = useStore(({ search_flight }) => search_flight)
    const { user } = useStore(({ app }) => app)
    const findDuration = () => {
        let startTime = moment(props.flight.flight_info.departure_time, 'HH:mm');
        let endTime = moment(props.flight.flight_info.arrival_time, 'HH:mm');
        let duration = moment.duration(endTime.diff(startTime));
        let hours = parseInt(duration.asHours().toString());
        let minutes = parseInt(duration.asMinutes().toString()) % 60;
        return hours + 'h ' + minutes + 'min';
    }
    const filghtDuration = findDuration()

    const handleFlightSelection = () => {
        if (props.flight !== undefined && user !== undefined) {
            store.dispatch(selectBookedFlight(props.flight))
        }
    }
    return (
        <Card style={styles.container}>
            <Card.Content style={{ display: 'flex', flexDirection: 'column' }}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>{moment(props.flight.flight_info.departure_date).format('DD MMM YYYY')}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image style={{ width: 60, height: 40, resizeMode: 'contain' }} source={{ uri: getLogoFromAirlineId(props.flight.flight_info.airline) }} />
                    </View>
                    <View style={{ marginLeft: 'auto' }}>
                        {/* <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={ECO} /> */}
                        <Text
                            style={{
                                color: props.flight.checkin_status === "DONE" ? GREEN :
                                    props.flight.checkin_status === "NOT" ? "red" :
                                        "purple"
                            }}
                        >{props.flight.checkin_status === "DONE" ? 'Checked-id' :
                            props.flight.checkin_status === 'NOT' ? 'Check-in not available' :
                                'Check-in available'
                            }</Text>
                    </View>
                </View>

                <View style={styles.datetimeBox}>
                    <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10 }}>
                        <Text style={styles.timeText}>{props.flight.flight_info.departure_time}</Text>
                        <Text style={{ color: DARK_GRAY, fontSize: 16, marginTop: 'auto', marginBottom: 'auto' }} >{` - ${filghtDuration} - `}</Text>
                        <Text style={styles.timeText}>{props.flight.flight_info.arrival_time}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: 'row', paddingLeft: 10 }}>
                        <Text style={styles.airportNameTxt}>{`${props.flight.departureAirport.name} (${props.flight.departureAirport.code})`}</Text>
                        <Text style={styles.airportNameTxt}>{`${props.flight.arrivalAirport.name} (${props.flight.arrivalAirport.code})`}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 5, justifyContent: 'flex-end' }}>
                    <Button mode='contained-tonal' style={{ borderRadius: 10, backgroundColor: 'lightblue' }}
                        labelStyle={{}}
                        disabled={props.flight.checkin_status === 'NOT' ? true : false}
                        onPress={handleFlightSelection}
                    >
                        {props.flight.checkin_status === 'DONE' ? 'Boarding Pass' : 'Check in'}
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 20,
        padding: 1,
        shadowColor: GREEN,
    },
    datetimeBox: {
        width: '100%'
    },
    timeText: {
        fontWeight: 'bold',
        fontSize: 22
    },
    airportNameTxt: {
        fontSize: 14,
        color: DARKER_GRAY,
        maxWidth: '50%',
        textAlign: 'left',
        marginRight: 15
    },
});