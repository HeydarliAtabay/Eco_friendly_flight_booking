import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DARK_GRAY, GRAY } from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

interface Airport {
  city: String;
  airportCode: String;
}

export default function AirportSelect() {
  const [departureAirport, setDepartureAirport] = useState<Airport>({
    city: "Milan",
    airportCode: "MXP",
  });
  const [landingAirport, setLandingAirport] = useState<Airport>({
    city: "Barcelona",
    airportCode: "BCN",
  });

  const swapAirports = () => {
    const airport = departureAirport;
    setDepartureAirport(landingAirport);
    setLandingAirport(airport);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.directionText}>From</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {departureAirport.city}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {departureAirport.airportCode}
          </Text>
        </View>
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.divider}></View>
        <Icon
          name="swap-vertical"
          style={styles.swap}
          onPress={() => swapAirports()}
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.directionText}>To</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {landingAirport.city}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {landingAirport.airportCode}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: GRAY,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  innerContainer: {
    width: 300,
  },
  separatorContainer: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
  },
  directionText: {
    color: DARK_GRAY,
    fontSize: 13,
  },
  nameContainer: {
    width: 270,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  name: {
    fontSize: 18,
    maxWidth: 220,
  },
  divider: {
    height: 1,
    width: 270,
    backgroundColor: DARK_GRAY,
    marginRight: 10,
  },
  swap: {
    fontSize: 23,
  },
});
