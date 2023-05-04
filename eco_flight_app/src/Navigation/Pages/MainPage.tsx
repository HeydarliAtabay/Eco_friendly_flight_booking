import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useStore } from "../../store/storeHooks";
import SeatSelection from "../../Components/Booking/SeatSelection";
import { GRAY } from "../../helpers/styles";
import { FlightClass } from "../../helpers";

interface MainPageProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function MainPage({ navigation }: MainPageProps) {
  const { user } = useStore(({ app }) => app);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text
        style={{ fontWeight: "bold", fontSize: 20 }}
      >{`Welcome ${user?.name} ${user?.surname}`}</Text>
      <Text>Main Page will be shown here</Text>

      <Button
        title="Search a flight"
        onPress={() => navigation.navigate("Search Flight")}
      />

      <View style={{ marginTop: 13 }}>
        <Button
          title="Seat Selection"
          onPress={() => setIsModalVisible(true)}
        />
        <SeatSelection
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          flightClass={FlightClass.BUSINESS_CLASS}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
