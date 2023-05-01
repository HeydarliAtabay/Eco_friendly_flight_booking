import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DARK_GRAY, GRAY } from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { State, store } from "../../store/store";
import { Airport } from "../../helpers";
import AirportPicker from "./AirportPicker";
import { loadAirport } from "./SearchFlight.slice";

export default function AirportSelect() {
  const airportList = useSelector(
    (state: State) => state.search_flight.airportList
  );
  const departureAirport = useSelector(
    (state: State) => state.search_flight.airports.from
  );
  const landingAirport = useSelector(
    (state: State) => state.search_flight.airports.to
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestor, setRequestor] = useState<"Departure" | "Return">();
  const [selectorTitle, setSelectorTitle] = useState<string>("");

  const swapAirports = () => {
    if (departureAirport && landingAirport) {
      const airport = departureAirport;
      store.dispatch(
        loadAirport({ airport: landingAirport, direction: "From" })
      );
      store.dispatch(loadAirport({ airport: airport, direction: "To" }));
    }
  };

  const openSelector = (req: "Departure" | "Return") => {
    setRequestor(req);
    setIsModalVisible(true);
    if (req === "Departure") {
      setSelectorTitle("Select your origin");
    }
    if (req === "Return") {
      setSelectorTitle("Select your destination");
    }
  };

  const setAirport = (airport: Airport) => {
    store.dispatch(
      loadAirport({
        airport: airport,
        direction: requestor === "Departure" ? "From" : "To",
      })
    );
  };

  return (
    <View style={styles.container}>
      <AirportPicker
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setAirport={setAirport}
        title={selectorTitle}
      />
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={GRAY}
        onPress={() => openSelector("Departure")}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.directionText}>From</Text>
          <View style={styles.nameContainer}>
            {departureAirport ? (
              <Text style={styles.name} numberOfLines={1}>
                {departureAirport.city}
              </Text>
            ) : (
              <Text style={styles.placeholder}>Select departure airport</Text>
            )}
            <Text style={styles.name} numberOfLines={1}>
              {departureAirport?.code}
            </Text>
          </View>
        </View>
      </TouchableHighlight>

      <View style={styles.separatorContainer}>
        <View style={styles.divider} />
        <Icon
          name="swap-vertical"
          style={styles.swap}
          onPress={() => swapAirports()}
        />
      </View>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={GRAY}
        onPress={() => openSelector("Return")}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.directionText}>To</Text>
          <View style={styles.nameContainer}>
            {landingAirport ? (
              <Text style={styles.name} numberOfLines={1}>
                {landingAirport.city}
              </Text>
            ) : (
              <Text style={styles.placeholder}>Select destination airport</Text>
            )}

            <Text style={styles.name} numberOfLines={1}>
              {landingAirport?.code}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
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
  placeholder: {
    color: DARK_GRAY,
    fontSize: 18,
  },
});
