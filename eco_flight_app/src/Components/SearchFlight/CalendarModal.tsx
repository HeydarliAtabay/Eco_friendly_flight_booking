import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { DARK_GRAY, GRAY, GREEN } from "../../helpers/styles";
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { CalendarProps } from "../../helpers";

export default function CalendarModal(props: {
  isModalVisible: boolean;
  calendarProps: CalendarProps;
  setIsModalVisible: (val: boolean) => void;
  setDate: (date: Moment) => void;
}) {
  const { isModalVisible, calendarProps, setIsModalVisible, setDate } = props;
  const [selectedDate, setSelectedDate] = useState<Moment>(
    moment(calendarProps.selectedDate)
  );

  useEffect(() => {
    setSelectedDate(moment(calendarProps.selectedDate));
  }, [calendarProps.selectedDate]);

  const handleDone = () => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setIsModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.header}>
        <Icon
          name="chevron-down"
          size={30}
          onPress={() => setIsModalVisible(false)}
        />
        <Text style={styles.title}>Select Date</Text>
      </View>
      <View style={styles.directions_container}>
        <View style={styles.directions_inner_container}>
          <Text style={styles.directions_title} numberOfLines={1}>
            {calendarProps.departureAirport}
          </Text>
          <Icon name="airplane" size={15} style={{ marginHorizontal: 20 }} />
          <Text style={styles.directions_title} numberOfLines={1}>
            {calendarProps.arrivalAirport}
          </Text>
        </View>
        {selectedDate && (
          <Text style={styles.directions_date}>
            {selectedDate.format("DD MMM YYYY")}
          </Text>
        )}
      </View>
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          onDateChange={setSelectedDate}
          minDate={calendarProps.minDate}
          initialDate={calendarProps.initialDate}
          selectedStartDate={calendarProps.selectedDate}
        />
      </View>
      <View style={styles.footer}>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GRAY}
          onPress={handleDone}
        >
          <Text style={styles.footer_button}>Done</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    alignItems: "center",
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
  directions_container: {
    minWidth: 330,
    margin: 30,
    alignItems: "center",
  },
  directions_inner_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  directions_title: {
    fontSize: 20,
    width: 150,
    textAlign: "center",
  },
  directions_date: {
    fontSize: 17,
    color: DARK_GRAY,
    textAlign: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: GRAY,
    padding: 5,
    borderRadius: 17,
    overflow: "hidden",
    width: 170,
  },
  footer: {
    padding: 15,
    backgroundColor: GRAY,
  },
  footer_button: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: GREEN,
    paddingVertical: 11,
    borderRadius: 8,
  },
});
