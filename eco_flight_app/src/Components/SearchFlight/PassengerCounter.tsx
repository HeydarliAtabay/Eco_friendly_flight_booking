import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DARK_GRAY, GRAY } from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { State, store } from "../../store/store";
import { loadPassengers } from "./SearchFlight.slice";

export default function PassengerCounter() {
  const passengers = useSelector(
    (state: State) => state.search_flight.passengers
  );

  const countPassenger = (ageGroup: "Adult" | "Child", count: number) => {
    if (ageGroup === "Adult") {
      let adults = passengers.adults + count;
      if (adults < 0) adults = 0;
      store.dispatch(loadPassengers({ count: adults, type: "Adult" }));
    }
    if (ageGroup === "Child") {
      let childen = passengers.childen + count;
      if (childen < 0) childen = 0;
      store.dispatch(loadPassengers({ count: childen, type: "Child" }));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passengers</Text>

      <View style={styles.innerContainer}>
        <View style={styles.innerContainer_details}>
          <Icon
            name="people"
            size={27}
            color={DARK_GRAY}
            style={{ marginRight: 8, width: 30 }}
          />
          <View>
            <Text style={{ fontSize: 17 }}>Adults</Text>
            <Text style={styles.title}>16+ years</Text>
          </View>
        </View>

        <View style={styles.innerContainer_counter}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={GRAY}
            onPress={() => countPassenger("Adult", -1)}
          >
            <Icon name="remove-circle-outline" size={25} color={DARK_GRAY} />
          </TouchableHighlight>
          <Text style={styles.counter_title}>{passengers.adults}</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={GRAY}
            onPress={() => countPassenger("Adult", 1)}
          >
            <Icon name="add-circle-outline" size={25} color={DARK_GRAY} />
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.innerContainer_details}>
          <Icon
            name="people"
            size={20}
            color={DARK_GRAY}
            style={{ marginRight: 8, width: 30 }}
          />
          <View>
            <Text style={{ fontSize: 17 }}>Children</Text>
            <Text style={styles.title}>0-15 years</Text>
          </View>
        </View>

        <View style={styles.innerContainer_counter}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={GRAY}
            onPress={() => countPassenger("Child", -1)}
          >
            <Icon name="remove-circle-outline" size={25} color={DARK_GRAY} />
          </TouchableHighlight>
          <Text style={styles.counter_title}>{passengers.childen}</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={GRAY}
            onPress={() => countPassenger("Child", 1)}
          >
            <Icon name="add-circle-outline" size={25} color={DARK_GRAY} />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: 330,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: GRAY,
  },
  title: {
    color: DARK_GRAY,
    fontSize: 13,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  innerContainer_details: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer_counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counter_title: {
    fontSize: 22,
    marginHorizontal: 15,
  },
});
