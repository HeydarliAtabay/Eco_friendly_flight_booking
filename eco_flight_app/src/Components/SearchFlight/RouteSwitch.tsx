import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GRAY, GREEN } from "../../helpers/styles";
import { Flight_Mode } from "../../helpers";
import { useSelector } from "react-redux";
import { State, store } from "../../store/store";
import { loadFlightMode, loadReturnDate } from "./SearchFlight.slice";

export default function RouteSwitch() {
  const flightMode = useSelector(
    (state: State) => state.search_flight.flightMode
  );
  const isReturnSelected = flightMode === Flight_Mode.RETURN;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.switchButton, !isReturnSelected && styles.bgGreen]}
        onPress={() => {
          store.dispatch(loadFlightMode(Flight_Mode.ONE_WAY));
          store.dispatch(loadReturnDate(null));
        }}
      >
        ONE WAY
      </Text>
      <Text
        style={[styles.switchButton, isReturnSelected && styles.bgGreen]}
        onPress={() => store.dispatch(loadFlightMode(Flight_Mode.RETURN))}
      >
        RETURN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: GRAY,
    borderRadius: 50,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 17,
    overflow: "hidden",
  },
  bgGreen: {
    backgroundColor: GREEN,
    color: "white",
  },
});
