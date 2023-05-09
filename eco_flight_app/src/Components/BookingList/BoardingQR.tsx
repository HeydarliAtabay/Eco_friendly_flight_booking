import React from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { GRAY } from "../../helpers/styles";
import { useStore } from "../../store/storeHooks";

export default function BoardingQR() {
    const { user } = useStore(({ app }) => app)
    const { selectedBookedFLight } = useStore(({ booking }) => booking)
    return (
        <View style={styles.QRcontainer}>
            <QRCode
                value={`${user?.username}+${user?.surname}+${selectedBookedFLight?.flight_info.flight_number}+${selectedBookedFLight?.flight_info.departure_date}+${selectedBookedFLight?.seat}`}
                size={250}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        height: '90%',
        width: '90%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },
    QRcontainer: {
        width: '100%',
        borderRadius: 8,
        marginTop: 15,
        borderColor: GRAY,
        alignItems: 'center', margin: 'auto'

    }
});