import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { ECO, getLogoFromAirlineId, getLogoFromAirlineName, RYANAIR } from "../../helpers/images";
import { DARKER_GRAY, DARK_GRAY, GRAY, GREEN } from "../../helpers/styles";
import { Checkin_Status, Move_Modal, Payment_Status, SearchFlightResultSingle, SelectedFlight, Selected_class } from "../../services/interfaces.ts/interfaces";
import { useStore } from "../../store/storeHooks";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { store } from "../../store/store";
import { changeActiveModalIndex, selectFlight, selectFlightDetailedInfo } from "./ResultList.slice";


interface CardInterface {
    flight: SearchFlightResultSingle
}
export default function SingleResultCard(props: CardInterface) {
    const { passengers } = useStore(({ search_flight }) => search_flight)
    const { user } = useStore(({ app }) => app)
    const findDuration = () => {
        let startTime = moment(props.flight.departure_time, 'HH:mm');
        let endTime = moment(props.flight.arrival_time, 'HH:mm');
        let duration = moment.duration(endTime.diff(startTime));
        let hours = parseInt(duration.asHours().toString());
        let minutes = parseInt(duration.asMinutes().toString()) % 60;
        return hours + 'h ' + minutes + 'min';
    }
    const filghtDuration = findDuration()

    return (
        <Card style={styles.container}>
            <Card.Content style={{ display: 'flex', flexDirection: 'column' }}>
                <TouchableOpacity
                    onPress={() => {
                        if (props.flight !== undefined && user !== undefined) {
                            const selectedFlight: SelectedFlight = {
                                user_id: user.id,
                                flight_id: props.flight.id,
                                seat: null,
                                payment_status: Payment_Status.unpaid,
                                checkin_status: Checkin_Status.not,
                                selected_class: Selected_class.econom,
                                paid_price: 0,
                                baggage: [{
                                    type: 'Hand',
                                    kg: 10,
                                    amount: 1
                                }]
                            }
                            store.dispatch(selectFlight(selectedFlight))
                            store.dispatch(selectFlightDetailedInfo(props.flight))
                            store.dispatch(changeActiveModalIndex(Move_Modal.forward))
                        }
                    }}
                >
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Image style={{ width: 60, height: 40, resizeMode: 'contain' }} source={{ uri: getLogoFromAirlineId(props.flight.airline) }} />
                        </View>
                        <View style={{ marginLeft: 'auto' }}>
                            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={ECO} />
                        </View>
                    </View>

                    <View style={styles.datetimeBox}>
                        <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={styles.timeText}>{props.flight.departure_time}</Text>
                            <Text style={{ color: DARK_GRAY, fontSize: 16, marginTop: 'auto', marginBottom: 'auto' }} >{` - ${filghtDuration} - `}</Text>
                            <Text style={styles.timeText}>{props.flight.arrival_time}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={styles.airportNameTxt}>{`${props.flight.departure_airport_name} (${props.flight.departure_airport_code})`}</Text>
                            <Text style={styles.airportNameTxt}>{`${props.flight.arrival_airport_name} (${props.flight.arrival_airport_code})`}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 5, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', marginLeft: 4, justifyContent: 'center', marginRight: 'auto' }}>
                            <Icon
                                name="people"
                                size={16}
                                style={{ justifyContent: 'center', color: DARK_GRAY }}
                            />
                            <Text style={{ color: DARK_GRAY, fontSize: 14, marginLeft: 2 }}>{(passengers.adults + passengers.childen)}</Text>

                        </View>
                        <Text style={styles.priceTxt}>{`${((passengers.adults + (passengers.childen) * 0.75) * props.flight.econom_price).toFixed(2)}€`}</Text>
                    </View>


                </TouchableOpacity>

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
    priceTxt: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});