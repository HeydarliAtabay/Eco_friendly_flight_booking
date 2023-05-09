import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SEAT } from '../../helpers/images';
import { DARKER_GRAY, DARK_GRAY, GRAY, GREEN } from '../../helpers/styles';
import { useStore } from '../../store/storeHooks';

export default function BoardingPassengerInfo() {
    const { selectedBookedFLight } = useStore(({ booking }) => booking)
    const { user } = useStore(({ app }) => app)
    return (
        <View style={styles.detailedInfoBox}>

            <View style={{ display: 'flex', flexDirection: 'row', padding: 5, paddingBottom: 10 }} >
                <View style={{ display: 'flex', flexDirection: 'column', width: '60%' }} >
                    <Text style={{ color: DARK_GRAY, fontSize: 18 }}>{`${user?.name} ${user?.surname}`}</Text>
                    <Text style={{ color: DARK_GRAY, fontSize: 18 }}>EU</Text>
                </View>
                <View style={{
                    display: 'flex', flexDirection: 'row', width: '35%', alignItems: 'flex-end',
                    marginLeft: 'auto', marginRight: 0
                }} >
                    <Image source={SEAT}
                        style={{ width: 40, height: 40, marginLeft: 'auto' }}
                    />
                    <Text style={{ fontSize: 26, margin: 'auto', color: DARK_GRAY, marginBottom: 'auto', marginTop: 'auto' }} >{selectedBookedFLight?.seat}</Text>
                </View>


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
        paddingLeft: 4
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