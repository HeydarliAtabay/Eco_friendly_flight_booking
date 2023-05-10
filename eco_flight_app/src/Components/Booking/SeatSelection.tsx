import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { DARK_GRAY, GRAY, GREEN, LIGHT_GRAY } from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Selected_class } from "../../services/interfaces.ts/interfaces";
import { store } from "../../store/store";
import { useStore } from "../../store/storeHooks";
import { selectSeat } from "../ResultList/ResultList.slice";
import SearchInfo from "../ResultList/SearchInfo";
import API from "../../services/API";
import SeatSelectionOptions from "./SeatSelectionOptions";
import {
  changeSeatModalVisibility,
  changeSelectedSeat,
} from "../BookingList/Booking.slice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

const Seat = (props: {
  isBlocked: boolean;
  isSelected: boolean;
  selectSeat: () => void;
}) => {
  const seatStyles = [
    styles.seat,
    props.isBlocked ? styles.reservedSeat : styles.freeSeat,
    props.isSelected && { backgroundColor: GREEN },
  ];
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={GREEN}
      disabled={props.isBlocked}
      style={{ borderTopLeftRadius: 11, borderTopRightRadius: 11 }}
      onPress={props.selectSeat}
    >
      <View style={seatStyles}>
        {props.isBlocked && <Icon name="close" color={GRAY} size={25} />}
      </View>
    </TouchableHighlight>
  );
};

export default function SeatSelection(props: {
  checkinPage?: boolean;
  navigation?: NativeStackNavigationProp<any, any>;
}) {
  const { selectedFlight } = useStore(({ search_results }) => search_results);
  const { selectedBookedFLight } = useStore(({ booking }) => booking);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    seat: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const isSelected = (row: number, seat: string) => {
    return selectedSeat?.row === row && selectedSeat.seat === seat;
  };
  const isBlocked = (
    row: number,
    seat: string,
    flightClass: Selected_class
  ) => {
    const seatNumber = row + seat;
    return bookedSeats.includes(seatNumber) || !props.checkinPage
      ? selectedFlight?.selected_class !== flightClass
      : selectedBookedFLight?.selected_class !== flightClass;
  };
  const chooseSeat = (seat: string, row: number) => {
    setSelectedSeat({ row: row, seat: seat });
  };

  useEffect(() => {
    if (props.checkinPage) {
      try {
        API.getSeatsOfFlight(selectedBookedFLight?.flight_id)
          .then((list) => {
            setBookedSeats(list);
            setLoading(false);
            setOpenOptions(true);
          })
          .catch(function (error) {
            setLoading(false);
            alert(error.message);
            throw error;
          });
      } catch (err) {
        alert({ msg: err, type: "danger" });
      }
    } else {
      try {
        API.getSeatsOfFlight(selectedFlight?.flight_id)
          .then((list) => {
            setBookedSeats(list);
            setLoading(false);
            setOpenOptions(true);
          })
          .catch(function (error) {
            setLoading(false);
            alert(error.message);
            throw error;
          });
      } catch (err) {
        alert({ msg: err, type: "danger" });
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      {openOptions && (
        <SeatSelectionOptions
          isModalVisible={openOptions}
          setIsModalVisible={setOpenOptions}
          bookedSeats={bookedSeats}
          checkinPage={props.checkinPage}
          navigation={props.navigation}
        />
      )}
      {!props.checkinPage && <SearchInfo />}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={GREEN} />
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={[styles.airplainEdge, styles.airplainTop]}>
              <View style={[styles.wc, { top: -1, left: -2 }]}>
                <Icon
                  name="man"
                  size={30}
                  color={GRAY}
                  style={{ borderRightColor: GRAY, borderRightWidth: 1 }}
                />
                <Icon name="woman" size={30} color={GRAY} />
              </View>
              <View style={[styles.wc, { top: -1, right: -2 }]}>
                <Icon
                  name="woman"
                  size={30}
                  color={GRAY}
                  style={{ borderRightColor: GRAY, borderRightWidth: 1 }}
                />
                <Icon name="man" size={30} color={GRAY} />
              </View>
            </View>
            <View style={styles.doors}>
              <View style={styles.divider}>
                <Text style={{ color: DARK_GRAY }}>First Class</Text>
              </View>
            </View>
            <View style={styles.board}>
              {[...Array(3)].map((_data, _index) => (
                <View style={styles.seatRow} key={`F${_index}`}>
                  <Seat
                    key={"A"}
                    isBlocked={isBlocked(_index + 1, "A", Selected_class.first)}
                    isSelected={isSelected(_index + 1, "A")}
                    selectSeat={() => chooseSeat("A", _index + 1)}
                  />
                  <Text style={styles.rowNumber}>{_index + 1}</Text>
                  <Seat
                    key={"B"}
                    isBlocked={isBlocked(_index + 1, "B", Selected_class.first)}
                    isSelected={isSelected(_index + 1, "B")}
                    selectSeat={() => chooseSeat("B", _index + 1)}
                  />
                </View>
              ))}
              <View style={styles.divider}>
                <Text style={{ color: DARK_GRAY }}>Business Class</Text>
              </View>
              {[...Array(4)].map((_data, _index) => (
                <View style={styles.seatRow} key={`B${_index}`}>
                  <Seat
                    key={"A"}
                    isBlocked={isBlocked(
                      _index + 4,
                      "A",
                      Selected_class.business
                    )}
                    isSelected={isSelected(_index + 4, "A")}
                    selectSeat={() => chooseSeat("A", _index + 4)}
                  />
                  <Seat
                    key={"B"}
                    isBlocked={isBlocked(
                      _index + 4,
                      "B",
                      Selected_class.business
                    )}
                    isSelected={isSelected(_index + 4, "B")}
                    selectSeat={() => chooseSeat("B", _index + 4)}
                  />
                  <Text style={styles.rowNumber}>{_index + 4}</Text>
                  <Seat
                    key={"C"}
                    isBlocked={isBlocked(
                      _index + 4,
                      "C",
                      Selected_class.business
                    )}
                    isSelected={isSelected(_index + 4, "C")}
                    selectSeat={() => chooseSeat("C", _index + 4)}
                  />
                  <Seat
                    key={"D"}
                    isBlocked={isBlocked(
                      _index + 4,
                      "D",
                      Selected_class.business
                    )}
                    isSelected={isSelected(_index + 4, "D")}
                    selectSeat={() => chooseSeat("D", _index + 4)}
                  />
                </View>
              ))}
              <View style={styles.divider}>
                <Text style={{ color: DARK_GRAY }}>Economy Class</Text>
              </View>
              {[...Array(23)].map((_data, _index) => (
                <View style={styles.seatRow} key={`E${_index}`}>
                  <Seat
                    key={"A"}
                    isBlocked={isBlocked(
                      _index + 8,
                      "A",
                      Selected_class.econom
                    )}
                    isSelected={isSelected(_index + 8, "A")}
                    selectSeat={() => chooseSeat("A", _index + 8)}
                  />
                  <Seat
                    key={"B"}
                    isBlocked={isBlocked(
                      _index + 8,
                      "B",
                      Selected_class.econom
                    )}
                    isSelected={isSelected(_index + 8, "B")}
                    selectSeat={() => chooseSeat("B", _index + 8)}
                  />
                  <Seat
                    key={"C"}
                    isBlocked={isBlocked(
                      _index + 8,
                      "C",
                      Selected_class.econom
                    )}
                    isSelected={isSelected(_index + 8, "C")}
                    selectSeat={() => chooseSeat("C", _index + 8)}
                  />
                  <Text style={styles.rowNumber}>{_index + 8}</Text>
                  <Seat
                    key={"D"}
                    isBlocked={isBlocked(
                      _index + 8,
                      "D",
                      Selected_class.econom
                    )}
                    isSelected={isSelected(_index + 8, "D")}
                    selectSeat={() => chooseSeat("D", _index + 8)}
                  />
                  <Seat
                    key={"E"}
                    isBlocked={isBlocked(
                      _index + 8,
                      "E",
                      Selected_class.econom
                    )}
                    isSelected={isSelected(_index + 8, "E")}
                    selectSeat={() => chooseSeat("E", _index + 8)}
                  />
                  <Seat
                    key={"F"}
                    isBlocked={isBlocked(
                      _index + 8,
                      "F",
                      Selected_class.econom
                    )}
                    isSelected={isSelected(_index + 8, "F")}
                    selectSeat={() => chooseSeat("F", _index + 8)}
                  />
                </View>
              ))}
            </View>
            <View style={styles.doors} />
            <View style={[styles.airplainEdge, styles.airplainBottom]}>
              <View style={[styles.wc, { marginTop: 11, left: -2 }]}>
                <Icon
                  name="woman"
                  size={30}
                  color={GRAY}
                  style={{ borderRightColor: GRAY, borderRightWidth: 1 }}
                />
                <Icon name="man" size={30} color={GRAY} />
              </View>
              <View style={[styles.wc, { marginTop: 11, right: -2 }]}>
                <Icon
                  name="man"
                  size={30}
                  color={GRAY}
                  style={{ borderRightColor: GRAY, borderRightWidth: 1 }}
                />
                <Icon name="woman" size={30} color={GRAY} />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footer_text_container}>
              <Text style={{ fontSize: 17, color: DARK_GRAY }}>Seat: </Text>
              <Text style={{ fontSize: 20, marginLeft: 7 }}>
                {selectedSeat && selectedSeat?.row + selectedSeat?.seat}
              </Text>
            </View>
            <View style={styles.footer_button_container}>
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor={GRAY}
                disabled={!selectedSeat}
                onPress={() => {
                  const seat = selectedSeat
                    ? selectedSeat?.row + selectedSeat?.seat
                    : null;
                  if (props.checkinPage && seat !== null) {
                    store.dispatch(changeSelectedSeat(seat));
                    store.dispatch(changeSeatModalVisibility(false));
                  } else if (!props.checkinPage) {
                    store.dispatch(selectSeat(seat));
                    props.navigation?.navigate("Payment");
                  }
                }}
              >
                <Text style={styles.footer_button}>Select</Text>
              </TouchableHighlight>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

// constants
const seatSize = {
  height: 30,
  width: 30,
  heightBusiness: 30 * 1.1,
  widthBusiness: 30 * 1.5,
  heightFirstClass: 30 * 1.1,
  widthFirstClass: 30 * 2.5,
};
const seatRow = { marginVertical: 3, marginHorizontal: 10 };
const divider = { height: 30, marginBottom: 3 };

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  airplainEdge: {
    height: 90,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderColor: GRAY,
    marginHorizontal: 30,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  airplainTop: {
    marginTop: 5,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  airplainBottom: {
    marginBottom: 5,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  wc: {
    width: 100,
    height: 80,
    borderWidth: 1,
    borderColor: GRAY,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  doors: {
    height: 30,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: DARK_GRAY,
    marginHorizontal: 32,
    marginVertical: 5,
  },
  board: {
    flex: 1,
    height:
      23 * (seatSize.height + 2 * seatRow.marginVertical) +
      4 * (seatSize.heightBusiness + 2 * seatRow.marginVertical) +
      3 * (seatSize.heightFirstClass + 2 * seatRow.marginVertical) +
      2 * (divider.height + divider.marginBottom),
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderColor: GRAY,
    marginHorizontal: 30,
    display: "flex",
  },
  seatRow: {
    marginHorizontal: seatRow.marginHorizontal,
    marginVertical: seatRow.marginVertical,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowNumber: {
    fontSize: 18,
    color: DARK_GRAY,
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: "center",
  },
  seat: {
    width: seatSize.width,
    height: seatSize.height,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderWidth: 2,
    borderColor: GRAY,
    alignItems: "center",
    justifyContent: "center",
  },
  seatFirstClass: {
    width: seatSize.widthFirstClass,
    height: seatSize.heightFirstClass,
  },
  seatBusiness: {
    width: seatSize.widthBusiness,
    height: seatSize.heightBusiness,
  },
  reservedSeat: {
    borderColor: GRAY,
  },
  freeSeat: {
    borderColor: GREEN,
  },
  divider: {
    height: divider.height,
    marginBottom: divider.marginBottom,
    marginHorizontal: seatRow.marginHorizontal,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  footer: {
    padding: 15,
    backgroundColor: LIGHT_GRAY,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footer_text_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // margin: 8,
  },
  footer_button_container: {
    width: "50%",
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
