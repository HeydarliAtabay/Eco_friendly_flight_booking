import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GRAY } from '../../helpers/styles';
import { Move_Modal } from '../../services/interfaces.ts/interfaces';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import SeatSelection from '../Booking/SeatSelection';
import PaymentPageForBooking from '../Payment/PaymentPage';
import EmptyResultPage from './EmptyResultPage';
import { changeActiveModalIndex } from './ResultList.slice';
import SearchInfo from './SearchInfo';
import SingleResultCard from './SingleResultCard';

export default function ResultsPage() {
    const { departureFlights, returnFlights, activeModalIndex } = useStore(({ search_results }) => search_results)
    const { returnDate } = useStore(({ search_flight }) => search_flight)
    const [openSeatModal, setOpenSeatModal] = useState(false)

    useEffect(() => {
        if (departureFlights.length !== 0 && returnFlights.length === 0 && returnDate !== null) {
            alert(`No return flights for ${returnDate?.format("DD MMM YYYY")}`)
        }
    }, [returnFlights])

    return (
            <View style={styles.container}>
                <SearchInfo />
                {departureFlights.length === 0 ?
                    <EmptyResultPage />
                    :
                    <SafeAreaView style={{ padding: 0, flex: 1 }}>
                        <FlatList
                            data={departureFlights}
                            initialNumToRender={5}
                            renderItem={({ item }) => (
                                <SingleResultCard flight={item} />
                            )}
                            keyExtractor={(item) => item.id as unknown as string}
                        // ItemSeparatorComponent={() => <View style={styles.divider} />}
                        />
                    </SafeAreaView>
                }

                <Modal
                    animationType="slide"
                    visible={activeModalIndex === 1 ? true : false}
                // onRequestClose={() => store.dispatch(changeActiveModalIndex(Move_Modal.back))}
                >
                    <View style={styles.header}>
                        <Icon
                            name="chevron-down"
                            size={30}
                            onPress={() => store.dispatch(changeActiveModalIndex(Move_Modal.back))}
                        />
                        <Text style={styles.title}>Seat Selection</Text>
                    </View>
                    <SeatSelection />
                </Modal>
                <Modal
                    animationType="fade"
                    visible={activeModalIndex === 2 ? true : false}
                // onRequestClose={() => store.dispatch(changeActiveModalIndex(Move_Modal.back))}
                >
                    <View style={styles.header}>
                        <Icon
                            name="chevron-down"
                            size={30}
                            onPress={() => store.dispatch(changeActiveModalIndex(Move_Modal.back))}
                        />
                        <Text style={styles.title}>Pay for The flight</Text>
                    </View>
                    <PaymentPageForBooking />
                </Modal>
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0
    },
    divider: {
        height: 1,
        backgroundColor: GRAY,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
    },
    header: {
        height: 60,
        backgroundColor: GRAY,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginTop: Platform.OS === "ios" ? "10%" : 0,
    },
    title: {
        fontSize: 20,
        marginLeft: 30,
    },
});