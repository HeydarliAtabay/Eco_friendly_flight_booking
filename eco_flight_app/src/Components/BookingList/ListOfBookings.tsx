import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { GRAY } from '../../helpers/styles';
import API from '../../services/API';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import { initializeBookedFlightResults, loadBookedFlights, selectBookedFlight } from './Booking.slice';
import DetailedInfoOfBookedFlight from './DetailedInfoOfBookedFlight';
import EmptyBookingListpage from './EmptyBookingListPage';
import SingleBookingCard from './SingleBookingCard';

export default function ListOfBookingsPage() {
    const [loading, setLoading] = useState(true)
    const { user } = useStore(({ app }) => app)
    const { bookedFlights, selectedBookedFLight } = useStore(({ booking }) => booking)
    const [openModal, setOpenModal] = useState(false)

    async function getBookedFlightsOfUser() {
        store.dispatch(initializeBookedFlightResults())
        store.dispatch(selectBookedFlight(undefined))
        if (user) {
            setLoading(true)
            await API.getBookedFlights(user.id).then((res) => {
                store.dispatch(loadBookedFlights(res))
                setLoading(false)
            }).catch((err) => alert(err))
        }
    }
    useEffect(() => {
        if (user !== undefined) {
            getBookedFlightsOfUser()
        }
    }, [])

    useEffect(() => {
        if (selectedBookedFLight !== undefined) {
            setOpenModal(true)
        }
    }, [selectedBookedFLight])
    return (
        <View style={styles.container}>
            {bookedFlights.length === 0 && !loading ?
                <EmptyBookingListpage />
                : bookedFlights.length !== 0 && !loading ?
                    <SafeAreaView style={{ padding: 0, flex: 1 }}>
                        <FlatList
                            data={bookedFlights}
                            initialNumToRender={5}
                            renderItem={({ item }) => (
                                <SingleBookingCard flight={item} />
                            )}
                            keyExtractor={(item) => item.id as unknown as string}
                        // ItemSeparatorComponent={() => <View style={styles.divider} />}
                        />
                    </SafeAreaView>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator animating={true} color={'Black'} size='large' />
                    </View>
            }
            <Modal
                animationType="slide"
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
            >
                <View style={styles.header}>
                    <Icon
                        name="chevron-down"
                        size={30}
                        onPress={() => setOpenModal(false)}
                    />
                    <Text style={styles.title}>Booking details</Text>
                </View>
                <DetailedInfoOfBookedFlight />
            </Modal>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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