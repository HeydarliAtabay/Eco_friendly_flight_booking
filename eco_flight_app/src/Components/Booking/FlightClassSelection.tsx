import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import {
  DARK_GRAY,
  DARK_GRAY_2,
  GRAY,
  GREEN,
  LIGHT_GRAY,
} from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Move_Modal } from "../../services/interfaces.ts/interfaces";
import { State, store } from "../../store/store";
import {
  changeActiveModalIndex,
  selectFlightClass,
} from "../ResultList/ResultList.slice";
import SearchInfo from "../ResultList/SearchInfo";
import { BAGGAGE, HANDBAGGAGE, MONEY_REFUND, SEAT } from "../../helpers/images";
import { FlightClass } from "../../helpers";
import {
  FlightClass_To_SelectedClass,
  SelectedClass_To_FlightClass,
} from "../../services/interactions";
import { useSelector } from "react-redux";

export default function FlightClassSelection(props: {
  isModalVisible: boolean;
}) {
  const { isModalVisible } = props;

  const { selectedFlightDetailedIngo, selectedFlight } = useSelector(
    (state: State) => state.search_results
  );
  const [isSelectedClass, setIsSelectedClass] = useState<FlightClass>(
    selectedFlight?.selected_class !== undefined
      ? SelectedClass_To_FlightClass(selectedFlight.selected_class)
      : FlightClass.ECONOMY_CLASS
  );

  const getSelectedClass = () => {
    if (isSelectedClass === FlightClass.FIRST_CLASS) return "FIRST CLASS";
    if (isSelectedClass === FlightClass.BUSINESS_CLASS) return "BUSINESS CLASS";
    return "ECONOMY CLASS";
  };

  return (
    <Modal
      animationType="none"
      visible={isModalVisible}
      onRequestClose={() =>
        store.dispatch(changeActiveModalIndex(Move_Modal.back))
      }
    >
      <View style={styles.header}>
        <Icon
          name="chevron-back"
          size={30}
          onPress={() =>
            store.dispatch(changeActiveModalIndex(Move_Modal.back))
          }
        />
        <Text style={styles.title}>Select your seat</Text>
      </View>
      <SearchInfo />
      <ScrollView>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GRAY}
          style={styles.card_touch}
          onPress={() => setIsSelectedClass(FlightClass.ECONOMY_CLASS)}
        >
          <View
            style={[
              styles.class_card,
              isSelectedClass === FlightClass.ECONOMY_CLASS &&
                styles.selected_card,
            ]}
          >
            {isSelectedClass === FlightClass.ECONOMY_CLASS && (
              <Text style={styles.selected_card_badge}>Selected</Text>
            )}
            <View style={styles.card_header}>
              <Text style={styles.card_header_price}>
                {selectedFlightDetailedIngo.econom_price}
                <Icon name="logo-euro" size={15} />
              </Text>
              <Text style={styles.card_header_class}>Economy Class</Text>
            </View>
            <View style={styles.card_row}>
              <Image source={BAGGAGE} style={styles.icon} />
              <Text style={styles.card_row_text}>23 kg checked-in baggage</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={SEAT} style={styles.icon} />
              <Text style={styles.card_row_text}>Free seat selection</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={HANDBAGGAGE} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Free carry-on bag on board
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GRAY}
          style={styles.card_touch}
          onPress={() => setIsSelectedClass(FlightClass.BUSINESS_CLASS)}
        >
          <View
            style={[
              styles.class_card,
              isSelectedClass === FlightClass.BUSINESS_CLASS &&
                styles.selected_card,
            ]}
          >
            {isSelectedClass === FlightClass.BUSINESS_CLASS && (
              <Text style={styles.selected_card_badge}>Selected</Text>
            )}
            <View style={styles.card_header}>
              <Text style={styles.card_header_price}>
                {selectedFlightDetailedIngo.business_price}
                <Icon name="logo-euro" size={15} />
              </Text>
              <Text style={styles.card_header_class}>Business Class</Text>
            </View>
            <View style={styles.card_row}>
              <Image source={BAGGAGE} style={styles.icon} />
              <Text style={styles.card_row_text}>32 kg checked-in baggage</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={SEAT} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Free extra legroom seat selection
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={HANDBAGGAGE} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Free carry-on bag on board
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={MONEY_REFUND} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Refund 72 hours before flight
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GRAY}
          style={styles.card_touch}
          onPress={() => setIsSelectedClass(FlightClass.FIRST_CLASS)}
        >
          <View
            style={[
              styles.class_card,
              isSelectedClass === FlightClass.FIRST_CLASS &&
                styles.selected_card,
            ]}
          >
            {isSelectedClass === FlightClass.FIRST_CLASS && (
              <Text style={styles.selected_card_badge}>Selected</Text>
            )}
            <View style={styles.card_header}>
              <Text style={styles.card_header_price}>
                {selectedFlightDetailedIngo.first_class_price}
                <Icon name="logo-euro" size={15} />
              </Text>
              <Text style={styles.card_header_class}>First Class</Text>
            </View>
            <View style={styles.card_row}>
              <Image source={BAGGAGE} style={styles.icon} />
              <Text style={styles.card_row_text}>
                2x 32 kg checked-in baggage
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={SEAT} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Free premium seat selection
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={HANDBAGGAGE} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Free carry-on bag on board
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.card_row}>
              <Image source={MONEY_REFUND} style={styles.icon} />
              <Text style={styles.card_row_text}>
                Refund 48 hours before flight
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footer_text_container}>
          <Text style={{ fontSize: 17, margin: 3, color: GREEN }}>
            {getSelectedClass()}
          </Text>
          <Text style={{ fontSize: 14, color: DARK_GRAY }}>
            Selected flight class
          </Text>
        </View>
        <View style={styles.footer_button_container}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={GRAY}
            onPress={() => {
              store.dispatch(
                selectFlightClass(FlightClass_To_SelectedClass(isSelectedClass))
              );
              store.dispatch(changeActiveModalIndex(Move_Modal.forward));
            }}
          >
            <Text style={styles.footer_button}>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    alignItems: "center",
  },
  header: {
    height: 60,
    // backgroundColor: GRAY,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    // paddingTop: 25,
    marginTop: Platform.OS === "ios" ? "10%" : 0,
    // shadowOffset: { width: 0, height: 10 },
    // shadowColor: DARK_GRAY,
    // shadowRadius: 6,
    // shadowOpacity: 0.7,
    // elevation: 3,
    // top: -10,
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    marginLeft: 30,
  },
  card_touch: {
    marginHorizontal: 30,
    marginVertical: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  class_card: {
    backgroundColor: LIGHT_GRAY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 15,
  },
  card_header: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 10,
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  card_header_class: {
    color: DARK_GRAY_2,
    fontSize: 18,
    margin: 5,
    width: "50%",
    borderLeftWidth: 1,
    borderLeftColor: GRAY,
    textAlign: "center",
  },
  card_header_price: {
    color: GREEN,
    fontSize: 18,
    margin: 5,
    width: "50%",
    textAlign: "center",
  },
  card_row: {
    marginHorizontal: 30,
    marginVertical: 5,
    flexDirection: "row",
  },
  card_row_text: {
    fontSize: 15,
    padding: 5,
    marginLeft: 15,
    color: DARK_GRAY,
  },
  selected_card: {
    borderWidth: 1.5,
    borderColor: GREEN,
    position: "relative",
    overflow: "hidden",
  },
  selected_card_badge: {
    position: "absolute",
    bottom: -1,
    right: -1,
    fontSize: 19,
    backgroundColor: GREEN,
    color: "white",
    paddingHorizontal: 35,
    paddingVertical: 7,
    fontStyle: "italic",
    zIndex: 999,
    borderTopLeftRadius: 35,
  },
  divider: {
    borderTopColor: GRAY,
    borderTopWidth: 1,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  footer: {
    padding: 15,
    // backgroundColor: LIGHT_GRAY,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: GREEN,
    borderTopWidth: 1,
  },
  footer_text_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  footer_button_container: {
    width: "50%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  footer_button: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: GREEN,
    paddingVertical: 7,
    borderRadius: 8,
    color: "white",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
