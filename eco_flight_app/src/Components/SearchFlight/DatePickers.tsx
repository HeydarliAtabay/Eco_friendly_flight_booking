import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DARK_GRAY, GRAY } from "../../helpers/styles";
import moment, { Moment } from "moment";
import CalendarModal from "./CalendarModal";
import { CalendarProps, Flight_Mode } from "../../helpers";
import { useSelector } from "react-redux";
import { State, store } from "../../store/store";
import { loadDepartureDate, loadReturnDate } from "./SearchFlight.slice";

export default function DatePickers() {
  const flightMode = useSelector(
    (state: State) => state.search_flight.flightMode
  );
  const departureDate = useSelector(
    (state: State) => state.search_flight.departureDate
  );
  const returnDate = useSelector(
    (state: State) => state.search_flight.returnDate
  );
  const airports = useSelector((state: State) => state.search_flight.airports);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestor, setRequestor] = useState<"Departure" | "Return">();
  const [calendarProps, setCalendarProps] = useState<CalendarProps>({});

  const openCalendar = (req: "Departure" | "Return") => {
    setRequestor(req);
    setIsModalVisible(true);
    if (req === "Departure") {
      setCalendarProps({
        minDate: moment().toDate(),
        initialDate: departureDate.toDate(),
        selectedDate: departureDate.toDate(),
        departureAirport: airports.from?.city as string,
        arrivalAirport: airports.to?.city as string,
      });
    }
    if (req === "Return") {
      setCalendarProps({
        minDate: departureDate.toDate(),
        initialDate: returnDate?.toDate(),
        selectedDate: returnDate?.toDate(),
        departureAirport: airports.to?.city as string,
        arrivalAirport: airports.from?.city as string,
      });
    }
  };

  const setDate = (date: Moment) => {
    if (requestor === "Departure") {
      store.dispatch(loadDepartureDate(date));
      if (!returnDate || date.isAfter(returnDate)) {
        store.dispatch(loadReturnDate(date));
      }
    }
    if (requestor === "Return") {
      store.dispatch(loadReturnDate(date));
    }
  };

  return (
    <View style={styles.container}>
      <CalendarModal
        isModalVisible={isModalVisible}
        calendarProps={calendarProps}
        setIsModalVisible={setIsModalVisible}
        setDate={setDate}
      />
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={GRAY}
        onPress={() => openCalendar("Departure")}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Departure date</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {departureDate.format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
      </TouchableHighlight>

      {flightMode === Flight_Mode.RETURN && (
        <>
          <View style={styles.divider} />
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={GRAY}
            onPress={() => openCalendar("Return")}
          >
            <View style={styles.innerContainer}>
              <Text style={[styles.title, { textAlign: "right" }]}>
                Return date
              </Text>
              <View
                style={[styles.dateContainer, { justifyContent: "flex-end" }]}
              >
                {returnDate ? (
                  <Text style={styles.date}>
                    {returnDate.format("DD MMM YYYY")}
                  </Text>
                ) : (
                  <Text style={{ color: DARK_GRAY, fontSize: 17 }}>
                    Select Date
                  </Text>
                )}
              </View>
            </View>
          </TouchableHighlight>
        </>
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerContainer: {
    // inner container styles
  },
  title: {
    color: DARK_GRAY,
    fontSize: 13,
  },
  dateContainer: {
    marginTop: 2,
    flexDirection: "row",
  },
  date: {
    fontSize: 18,
    maxWidth: 220,
  },
  divider: {
    height: 25,
    width: 1,
    backgroundColor: DARK_GRAY,
    marginVertical: 10,
  },
});
