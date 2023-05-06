import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Move_Modal } from '../../services/interfaces.ts/interfaces';
import { store } from '../../store/store';
import { useStore } from '../../store/storeHooks';
import { changeActiveModalIndex, selectSeat } from '../ResultList/ResultList.slice';
import SearchInfo from '../ResultList/SearchInfo';

export default function SeatSelection() {
    const { selectedFlight } = useStore(({ search_results }) => search_results)
    console.log(selectedFlight)
    return (
        <View style={styles.container}>
            <SearchInfo />

            <Text>Select your seat</Text>
            <TextInput
                style={styles.TextInput}
                label="Seat"
                returnKeyType="next"
                underlineColor='transparent'
                value={selectedFlight?.seat ? selectedFlight.seat : ''}
                onChangeText={(text) => store.dispatch(selectSeat(text))}
            />
            <Button
                onPress={() => {
                    store.dispatch(changeActiveModalIndex(Move_Modal.forward))
                }}
            >
                Go for payment
            </Button>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    TextInput: {
        width: '40%',
        marginBottom: 5,
        borderRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 0,
        borderBottomWidth: 0
    },
});