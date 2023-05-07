import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NOFLIGHT } from '../../helpers/images';

export default function EmptyBookingListpage() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>You don't have any booked flights</Text>
            <Image style={{ width: 120, height: 120, resizeMode: 'contain', marginTop: 15 }} source={NOFLIGHT} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});