import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import RouteSwitch from "./RouteSwitch";
import AirportSelect from "./AirportSelect";
import DatePickers from "./DatePickers";
import PassengerCounter from "./PassengerCounter";
import { GRAY, GREEN } from "../../helpers/styles";
import API from "../../services/API";
import { store } from "../../store/store";
import { loadAirportList, loadReturnDate } from "./SearchFlight.slice";
import { Flight_Mode } from "../../helpers";
import {
  FlighSearchFullResult,
  MainPageProps,
  SearchBody,
  SearchFlightResultSingle,
} from "../../services/interfaces.ts/interfaces";
import { useStore } from "../../store/storeHooks";
import moment from "moment";
import {
  initializeFlightResults,
  loadDepartureFlights,
  loadReturnFlights,
} from "../ResultList/ResultList.slice";

export default function SearchFlight({ navigation }: MainPageProps) {
  const { airports, departureDate, returnDate, flightMode } = useStore(
    ({ search_flight }) => search_flight
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      API.getAirportList()
        .then((list) => {
          if (list) {
            store.dispatch(loadAirportList(list));
          }
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          alert(error.message);
          throw error;
        });
    } catch (err) {
      alert({ msg: err, type: "danger" });
    }
  }, []);

  async function searchFlights() {
    store.dispatch(initializeFlightResults());
    if (flightMode === Flight_Mode.ONE_WAY) {
      store.dispatch(loadReturnDate(null));
    }
    if (departureDate !== undefined && airports.to && airports.from) {
      const newSearchBody: SearchBody = {
        departure_date: departureDate.format("YYYY-MM-DD").toString(),
        arrival_date: returnDate
          ? returnDate.format("YYYY-MM-DD").toString()
          : undefined,
        arrival_airport: airports.to?.code,
        departure_airport: airports.from.code,
      };

      await API.searchFlights(newSearchBody)
        .then((res: FlighSearchFullResult) => {
          if (res.Departure !== undefined) {
            store.dispatch(loadDepartureFlights(res.Departure));
          }
          if (res.Return !== undefined) {
            store.dispatch(loadReturnFlights(res.Return));
          }
          navigation.navigate("Results");
        })
        .catch((err) => alert(err));
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={GREEN} />
        </View>
      ) : (
        <>
          <RouteSwitch />
          <AirportSelect />
          <DatePickers />
          <PassengerCounter />
          <View style={styles.footer}>
            <TouchableHighlight
              activeOpacity={0.7}
              underlayColor={GRAY}
              onPress={searchFlights}
            >
              <Text style={styles.footer_button}>Search</Text>
            </TouchableHighlight>
          </View>
        </>
      )}
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
    // backgroundColor: GRAY,
    width: "100%",
  },
  footer_button: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: GREEN,
    paddingVertical: 11,
    borderRadius: 8,
    color: "white",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
