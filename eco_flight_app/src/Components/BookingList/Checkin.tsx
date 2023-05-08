import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Modal, Platform, SafeAreaView, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, Button, Card, TextInput } from "react-native-paper";
import { BAGGAGE, SEAT, HANDBAGGAGE, MONEY_REFUND } from "../../helpers/images";
import { DARKER_GRAY, DARK_GRAY, DARK_GRAY_2, GRAY, GREEN, LIGHT_GRAY } from "../../helpers/styles";
import { useStore } from "../../store/storeHooks";
import { changeBoardingBassVisibility, changeCheckinVisibility, changeSeatModalVisibility, changeSelectedClass, changeSelectedSeat, loadBookedFlights } from "./Booking.slice";
import SeatSelection from "../Booking/SeatSelection";
import { store } from "../../store/store";
import API from "../../services/API";

export default function Checkin() {
    const { selectedBookedFLight, showSeatSelection, checkinState } = useStore(({ booking }) => booking)
    const [value, setValue] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    console.log('selectedbookeflight.seat::', selectedBookedFLight?.seat)
    console.log('checkinState::seat', checkinState.seat)


    useEffect(() => {
        if (checkinState.seat === '' && selectedBookedFLight?.seat) {
            store.dispatch(changeSelectedSeat(selectedBookedFLight.seat))
        }
        if (checkinState.selected_class === null && selectedBookedFLight) {
            store.dispatch(changeSelectedClass(selectedBookedFLight?.selected_class))
        }
    }, [])


    async function makeCheckIn() {
        if (checkinState) {
            setLoading(true)
            await API.updateCheckinInformation(checkinState, selectedBookedFLight?.id).then(() => {
                //
            }).catch((e) => alert(e.message))
            await API.getBookedFlights(selectedBookedFLight?.user_id).then((res) => {
                alert('Succesfully checked id')
                store.dispatch(loadBookedFlights(res))
                setLoading(false)
                store.dispatch(changeCheckinVisibility(false))
                store.dispatch(changeBoardingBassVisibility(false))

            }).catch((e) => alert(e))
        }
    }
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                {loading ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator animating={true} color={GREEN} size='large' />
                    </View>
                    :
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            data={[]}
                            renderItem={null}
                            ListHeaderComponent={() => (


                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ textAlign: 'left', fontSize: 18, width: '88%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}> Add passenger info</Text>
                                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <TextInput
                                                style={[styles.TextInput, { width: '45%' }]}
                                                label="Name"
                                                returnKeyType="next"
                                                underlineColor='transparent'
                                            />
                                            <TextInput
                                                style={[styles.TextInput, { width: '45%' }]}
                                                label="Surname"
                                                returnKeyType="next"
                                                underlineColor='transparent'
                                            />
                                        </View>

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
                                            padding: 10, height: 80, borderRadius: 12

                                        }}>
                                            {checkinState && (checkinState.seat === null || checkinState?.seat === '') ?
                                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Text style={{ textAlign: 'center' }}>You didn't select your seat</Text>
                                                    <Button mode='text' buttonColor="transparent" labelStyle={{ color: GREEN, fontSize: 18 }}
                                                        onPress={() => {
                                                            store.dispatch(changeSeatModalVisibility(true))
                                                        }}
                                                    >
                                                        Select Your seat
                                                    </Button>
                                                </View>

                                                : checkinState && checkinState.seat !== null &&
                                                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 18, color: DARK_GRAY, marginTop: 'auto', marginBottom: 'auto', marginRight: 10 }}>
                                                            {`Your seat is`}</Text>
                                                        <Text style={{ fontSize: 22 }}>{checkinState.seat}</Text>
                                                        <Image source={SEAT} style={styles.icon} />
                                                    </View>
                                                    <Button mode='text' buttonColor="transparent" labelStyle={{ color: GREEN, fontSize: 16 }}
                                                        onPress={() => {
                                                            store.dispatch(changeSeatModalVisibility(true))
                                                        }}
                                                    >
                                                        Change your seat
                                                    </Button>

                                                </View>


                                            }
                                        </View>
                                        <View>
                                            {selectedBookedFLight && (selectedBookedFLight.selected_class === null) ?
                                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Text style={{ textAlign: 'center' }}>You didn't choose your class</Text>
                                                    <Button mode='text' buttonColor="transparent" labelStyle={{ color: GREEN, fontSize: 18 }}>
                                                        Choose a class
                                                    </Button>
                                                </View>

                                                : selectedBookedFLight && selectedBookedFLight.selected_class !== null && selectedBookedFLight.selected_class === 'ECONOM' ?
                                                    <View
                                                        style={[
                                                            styles.class_card
                                                        ]}
                                                    >
                                                        <View style={styles.card_header}>
                                                            <Text style={styles.card_header_price}>
                                                                {selectedBookedFLight.flight_info.econom_price}
                                                                <Icon name="logo-euro" size={15} />
                                                            </Text>
                                                            <Text style={styles.card_header_class}>Economy Class</Text>
                                                        </View>
                                                        <View style={styles.card_row}>
                                                            <Image source={BAGGAGE} style={styles.icon} />
                                                            <Text style={styles.card_row_text}>23 kg checked-in baggage</Text>
                                                        </View>
                                                        <View style={styles.divider} />
                                                        <View style={styles.card_row}>
                                                            <Image source={SEAT} style={styles.icon} />
                                                            <Text style={styles.card_row_text}>Free seat selection</Text>
                                                        </View>
                                                        <View style={styles.divider} />
                                                        <View style={styles.card_row}>
                                                            <Image source={HANDBAGGAGE} style={styles.icon} />
                                                            <Text style={styles.card_row_text}>
                                                                Free carry-on bag on board
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    : selectedBookedFLight && selectedBookedFLight.selected_class !== null && selectedBookedFLight.selected_class === 'BUSINESS' ?
                                                        <View
                                                            style={[
                                                                styles.class_card,

                                                            ]}
                                                        >
                                                            <View style={styles.card_header}>
                                                                <Text style={styles.card_header_price}>
                                                                    {selectedBookedFLight.flight_info.business_price}
                                                                    <Icon name="logo-euro" size={15} />
                                                                </Text>
                                                                <Text style={styles.card_header_class}>Business Class</Text>
                                                            </View>
                                                            <View style={styles.card_row}>
                                                                <Image source={BAGGAGE} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>32 kg checked-in baggage</Text>
                                                            </View>
                                                            <View style={styles.divider} />
                                                            <View style={styles.card_row}>
                                                                <Image source={SEAT} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    Free extra legroom seat selection
                                                                </Text>
                                                            </View>
                                                            <View style={styles.divider} />
                                                            <View style={styles.card_row}>
                                                                <Image source={HANDBAGGAGE} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    Free carry-on bag on board
                                                                </Text>
                                                            </View>
                                                            <View style={styles.divider} />
                                                            <View style={styles.card_row}>
                                                                <Image source={MONEY_REFUND} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    Refund 72 hours before flight
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View style={styles.class_card}
                                                        >

                                                            <View style={styles.card_header}>
                                                                <Text style={styles.card_header_price}>
                                                                    {selectedBookedFLight?.flight_info.first_class_price}
                                                                    <Icon name="logo-euro" size={15} />
                                                                </Text>
                                                                <Text style={styles.card_header_class}>First Class</Text>
                                                            </View>
                                                            <View style={styles.card_row}>
                                                                <Image source={BAGGAGE} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    2x 32 kg checked-in baggage
                                                                </Text>
                                                            </View>
                                                            <View style={styles.divider} />
                                                            <View style={styles.card_row}>
                                                                <Image source={SEAT} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    Free premium seat selection
                                                                </Text>
                                                            </View>
                                                            <View style={styles.divider} />
                                                            <View style={styles.card_row}>
                                                                <Image source={HANDBAGGAGE} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    Free carry-on bag on board
                                                                </Text>
                                                            </View>
                                                            <View style={styles.divider} />
                                                            <View style={styles.card_row}>
                                                                <Image source={MONEY_REFUND} style={styles.icon} />
                                                                <Text style={styles.card_row_text}>
                                                                    Refund 48 hours before flight
                                                                </Text>
                                                            </View>
                                                        </View>
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
                                                    onPress={() => {
                                                        makeCheckIn()
                                                    }}
                                                >
                                                    Check-in
                                                </Button>
                                            </>
                                        }

                                    </View>

                                </View>
                            )}>

                        </FlatList>
                    </SafeAreaView>
                }


            </Card>
            <SeatSelection isModalVisible={showSeatSelection} checkinPage={true} />
        </View >
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
        height: '95%',
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
    class_card: {
        backgroundColor: LIGHT_GRAY,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingBottom: 15,
        marginTop: 10,
        borderColor: 'lightregen',
        borderWidth: 2,
        width: '90%'
    },
    card_header: {
        paddingHorizontal: 13,
        paddingVertical: 11,
        marginBottom: 5,
        borderBottomColor: GRAY,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    card_header_class: {
        color: DARK_GRAY_2,
        fontSize: 18,
        margin: 5,
        width: "50%",
        borderLeftWidth: 1,
        borderLeftColor: GRAY,
        textAlign: "center",
    },
    card_header_price: {
        color: GREEN,
        fontSize: 18,
        margin: 5,
        width: "50%",
        textAlign: "center",
    },
    card_row: {
        marginHorizontal: 30,
        marginVertical: 5,
        flexDirection: "row",
    },
    card_row_text: {
        fontSize: 15,
        padding: 5,
        marginLeft: 15,
        color: DARK_GRAY,
    },
    selected_card: {
        borderWidth: 1.5,
        borderColor: GREEN,
        position: "relative",
        overflow: "hidden",
    },
    selected_card_badge: {
        position: "absolute",
        bottom: -1,
        right: -1,
        fontSize: 19,
        backgroundColor: GREEN,
        color: "white",
        paddingHorizontal: 35,
        paddingVertical: 7,
        fontStyle: "italic",
        zIndex: 999,
        borderTopLeftRadius: 35,
    },
    divider: {
        borderTopColor: GRAY,
        borderTopWidth: 1,
        marginHorizontal: 20,
        marginVertical: 8,
    },
    footer: {
        padding: 15,
        backgroundColor: LIGHT_GRAY,
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopColor: GREEN,
        borderTopWidth: 1,
    },
    footer_text_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    footer_button_container: {
        width: "50%",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    footer_button: {
        fontSize: 18,
        textAlign: "center",
        backgroundColor: GREEN,
        paddingVertical: 7,
        borderRadius: 8,
        color: "white",
    },
    icon: {
        width: 30,
        height: 30,
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