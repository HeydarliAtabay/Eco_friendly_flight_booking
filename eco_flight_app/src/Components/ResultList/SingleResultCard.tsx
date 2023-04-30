import React from "react";
import { Card } from "react-native-paper";
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { ECO, getLogoFromAirlineName, RYANAIR } from "../../helpers/images";
import { DARKER_GRAY, DARK_GRAY, GRAY } from "../../helpers/styles";


interface CardInterface {
    airline: string
}



export default function SingleResultCard(props: CardInterface) {
    return (
        <Card style={styles.container}>
            <Card.Content style={{ display: 'flex', flexDirection: 'column', padding: 0, width: '100%' }}>
                <TouchableOpacity>
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Image style={{ width: 60, height: 40, resizeMode: 'contain' }} source={getLogoFromAirlineName(props.airline)} />
                        </View>
                        <View style={{marginLeft:'auto' }}>
                            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={ECO} />
                        </View>
                    </View>

                    <View style={styles.datetimeBox}>
                        <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={styles.timeText}>12:00</Text>
                            <Text style={{ color: DARK_GRAY, fontSize: 16, marginTop: 'auto', marginBottom: 'auto' }} > - 3h 21m - </Text>
                            <Text style={styles.timeText}>15:21</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={styles.airportNameTxt}>{'Orio al serio Airport Bergamo (BGY)'}</Text>
                            <Text style={styles.airportNameTxt}>{'London city Airport (LCY)'}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.priceTxt}>52 $</Text>
                    </View>

                </TouchableOpacity>

            </Card.Content>
        </Card>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '95%',
        marginBottom: 10,
        height: '22%',
        padding: 0,
        display: 'flex'
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
        maxWidth: '40%',
        textAlign: 'left',
        marginRight: 15
    },
    priceTxt: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20
    }
});