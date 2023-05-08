import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Card, TextInput } from "react-native-paper";
import { DARKER_GRAY, GREEN } from "../../helpers/styles";
import { useStore } from "../../store/storeHooks";

export default function Checkin() {
    const { selectedBookedFLight } = useStore(({ booking }) => booking)
    const [value, setValue] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, width: '88%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}> Add passenger info</Text>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <TextInput
                            style={styles.TextInput}
                            label="Name"
                            returnKeyType="next"
                            underlineColor='transparent'
                        />
                        <TextInput
                            style={styles.TextInput}
                            label="Surname"
                            returnKeyType="next"
                            underlineColor='transparent'
                        />
                        <TextInput
                            style={styles.TextInput}
                            label="Telephone"
                            returnKeyType="next"
                            underlineColor='transparent'
                            autoCapitalize="none"
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                        />

                        <View style={{
                            borderWidth: 2, borderColor: 'lightgreen', display: 'flex', flexDirection: 'column', width: '90%',
                            padding: 10, height: 150, borderRadius: 12

                        }}>
                            {selectedBookedFLight && selectedBookedFLight.seat === null ?
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text>You didn't select your seat</Text>
                                    <Button mode='outlined' buttonColor="lightgreen">
                                        Select Your seat
                                    </Button>
                                </View>

                                : selectedBookedFLight && selectedBookedFLight.seat !== null &&
                                <Text>{`Your seat is ${selectedBookedFLight?.seat}`}</Text>

                            }
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fff', marginTop: 10 }}>
                            <DropDownPicker

                                style={styles.TextInput}
                                containerStyle={{ width: '100%', alignItems: 'flex-start', marginRight: 'auto', marginLeft: 18, elevation: 1, zIndex: 9999 }}
                                labelStyle={{ width: '80%', fontSize: 16, marginLeft: 5 }}
                                placeholder={'Document type'}
                                placeholderStyle={{ fontSize: 16, marginLeft: 5 }}
                                dropDownContainerStyle={{ width: '90%', backgroundColor: '#fff', elevation: 1 }}
                                badgeStyle={{ backgroundColor: 'red' }}
                                open={open}
                                value={value}
                                items={[
                                    { label: 'Passport', value: 'Passport' },
                                    { label: 'ID card', value: 'ID' },
                                    { label: 'Residence card', value: 'Residence' }
                                ]}
                                setValue={setValue}
                                multiple={false}
                                setOpen={setOpen}
                            />
                        </View>
                        {value !== null && value?.length !== 0 && !open &&
                            <>
                                <TextInput
                                    style={styles.TextInput}
                                    label={value === 'Passport' ? "Passport number" : value === 'ID' ? "ID number" : value === 'Residence' ? 'Residence card number' : ''}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    textContentType="telephoneNumber"
                                    keyboardType="phone-pad"
                                    underlineColor='transparent'

                                />
                                <Button mode='elevated' style={{
                                    marginTop: 'auto', marginBottom: 10, width: '40%', backgroundColor: GREEN,
                                    marginLeft: 'auto', marginRight: 20, borderRadius: 12
                                }}
                                    labelStyle={{ color: 'white' }}
                                >
                                    Check-in
                                </Button>
                            </>
                        }

                    </View>

                </View>

            </Card>
            <Text>Check in here</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: "space-between",
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 1,
        shadowColor: GREEN,
    },
    cardContainer: {
        height: '90%',
        width: '95%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
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
    TextInput: {
        width: '90%',
        marginBottom: 5,
        borderRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: 'white',
        borderColor: 'lightgreen',
        elevation: 1,
        zIndex: 9999
    },
});