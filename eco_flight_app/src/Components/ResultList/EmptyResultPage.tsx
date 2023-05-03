import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NOFLIGHT } from '../../helpers/images';

export default function EmptyResultPage() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>No flights for these dates..</Text>
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