import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import RouteSwitch from "./RouteSwitch";
import AirportSelect from "./AirportSelect";
import DatePickers from "./DatePickers";
import PassengerCounter from "./PassengerCounter";
import { GRAY, GREEN } from "../../helpers/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import API from "../../services/API";
import { store } from "../../store/store";
import { loadAirportList } from "./SearchFlight.slice";
import { Flight_Mode } from "../../helpers";
interface MainPageProps {
  navigation: NativeStackNavigationProp<any, any>;
}
export default function SearchFlight({ navigation }: MainPageProps) {
  const [flightMode, setFlightMode] = useState<Flight_Mode>(
    Flight_Mode.ONE_WAY
  );
    useEffect(() => {
      try {
        API.getAirportList()
          .then((list) => {
            if (list) {
              store.dispatch(loadAirportList(list));
            }
          })
          .catch(function (error) {
            alert(error.message);
            throw error;
          });
      } catch (err) {
        alert({ msg: err, type: "danger" });
      }
    }, []);
  
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <RouteSwitch />
        <AirportSelect />
        <DatePickers />
        <PassengerCounter />
        <View style={styles.footer}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={GRAY}
            onPress={() => navigation.navigate('Results')}
          >
            <Text style={styles.footer_button}>Search</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    } 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 30,
    },
    footer: {
      padding: 15,
      backgroundColor: GRAY,
      width: "100%",
    },
    footer_button: {
      fontSize: 18,
      textAlign: "center",
      backgroundColor: GREEN,
      paddingVertical: 11,
      borderRadius: 8,
      // color: "white",
    },
  })
