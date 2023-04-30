import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GRAY, GREEN } from "../../helpers/styles";
import { Flight_Mode } from "../../helpers";
import React from "react";

export default function RouteSwitch(props: {
  flightMode: Flight_Mode;
  setFlightMode: (mode: Flight_Mode) => void;
}) {
  const isReturnSelected = props.flightMode === Flight_Mode.RETURN;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.switchButton, !isReturnSelected && styles.bgGreen]}
        onPress={() => props.setFlightMode(Flight_Mode.ONE_WAY)}
      >
        ONE WAY
      </Text>
      <Text
        style={[styles.switchButton, isReturnSelected && styles.bgGreen]}
        onPress={() => props.setFlightMode(Flight_Mode.RETURN)}
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
    borderRadius: 50,
  },
  bgGreen: {
    backgroundColor: GREEN,
  },
});
