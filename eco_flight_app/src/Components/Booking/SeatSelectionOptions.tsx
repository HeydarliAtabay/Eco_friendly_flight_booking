import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { DARK_GRAY, GRAY, GREEN, LIGHT_GRAY } from "../../helpers/styles";
import { Selected_class } from "../../services/interfaces.ts/interfaces";
import { State, store } from "../../store/store";
import { selectSeat } from "../ResultList/ResultList.slice";
import { useSelector } from "react-redux";
import { useStore } from "../../store/storeHooks";
import {
  changeSeatModalVisibility,
  changeSelectedSeat,
} from "../BookingList/Booking.slice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export default function SeatSelectionOptions(props: {
  isModalVisible: boolean;
  setIsModalVisible: (v: boolean) => void;
  bookedSeats: string[];
  checkinPage?: boolean;
  navigation?: NativeStackNavigationProp<any, any>;
}) {
  const { isModalVisible, setIsModalVisible, bookedSeats } = props;
  const selectedFlight = useSelector(
    (state: State) => state.search_results.selectedFlight
  );
  const { selectedBookedFLight } = useStore(({ booking }) => booking);
  const [randomSeat, setRandomSeat] = useState<string | null>(null);

  useEffect(() => {
    const seats: string[] = [];
    let row_limit = 3,
      row_start = 0;
    if (!props.checkinPage) {
      if (selectedFlight?.selected_class === Selected_class.business) {
        row_limit = 7;
        row_start = 3;
      }
      if (selectedFlight?.selected_class === Selected_class.econom) {
        row_limit = 30;
        row_start = 7;
      }
    } else {
      if (selectedBookedFLight?.selected_class === Selected_class.business) {
        row_limit = 7;
        row_start = 3;
      }
      if (selectedBookedFLight?.selected_class === Selected_class.econom) {
        row_limit = 30;
        row_start = 7;
      }
    }

    for (let i = row_start; i < row_limit; i++) {
      const letters = ["A", "B", "C", "D", "E", "F"];
      const let_index = i < 3 ? 2 : i < 7 ? 4 : 6;
      for (let j = 0; j < let_index; j++) {
        const seatRow = i + 1;
        if (!bookedSeats.includes(seatRow + letters[j]))
          seats.push(seatRow + letters[j]);
      }
    }
    const max_limit = seats.length;
    const index = Math.floor(Math.random() * max_limit);
    setRandomSeat(seats[index]);
  }, []);

  return (
    <Modal
      animationType="none"
      visible={isModalVisible}
      transparent={true}
      onRequestClose={() => {
        setIsModalVisible(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.footer}>
          <View style={styles.footer_text_container}>
            <Text style={{ fontSize: 17, color: DARK_GRAY }}>
              Suggested seat:
            </Text>
            <Text style={{ fontSize: 20, marginLeft: 7 }}>{randomSeat}</Text>
          </View>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={LIGHT_GRAY}
            style={styles.touchable}
            onPress={() => {
              if (props.checkinPage) {
                if (randomSeat !== null) {
                  store.dispatch(changeSelectedSeat(randomSeat));
                  store.dispatch(changeSeatModalVisibility(false));
                }
              } else {
                store.dispatch(selectSeat(randomSeat));
                props.navigation?.navigate("Payment");
                setIsModalVisible(false);
              }
            }}
          >
            <Text style={[styles.footer_button, styles.footer_button_accept]}>
              Accept Recommendation
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={LIGHT_GRAY}
            style={styles.touchable}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={[styles.footer_button, styles.footer_button_choose]}>
              Choose other seats
            </Text>
          </TouchableHighlight>

          {!props.checkinPage && (
            <>
              <View style={styles.divider} />
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor={LIGHT_GRAY}
                style={styles.touchable}
                onPress={() => {
                  store.dispatch(selectSeat(null));
                  props.navigation?.navigate("Payment");
                  setIsModalVisible(false);
                }}
              >
                <Text style={[styles.footer_button, styles.footer_button_skip]}>
                  Continue without a seat
                </Text>
              </TouchableHighlight>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(28, 176, 28, 0.15)",
  },
  footer: {
    padding: 15,
    backgroundColor: LIGHT_GRAY,
    borderTopColor: GREEN,
    borderTopWidth: 1,
  },
  footer_text_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  footer_button: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  footer_button_accept: {
    backgroundColor: GREEN,
    color: "white",
  },
  footer_button_choose: {
    color: GREEN,
    borderWidth: 1,
    borderColor: GREEN,
  },
  footer_button_skip: {
    color: GREEN,
    fontSize: 17,
  },
  touchable: {
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: GRAY,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
