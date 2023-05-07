import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import API from "../../services/API";
import {
  Move_Modal,
  Payment_Status,
  Selected_class,
} from "../../services/interfaces.ts/interfaces";
import { store } from "../../store/store";
import { useStore } from "../../store/storeHooks";
import {
  changeActiveModalIndex,
  payForFlight,
} from "../ResultList/ResultList.slice";
import { DARK_GRAY_2, GRAY, GREEN, LIGHT_GRAY } from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { PayPal } from "../../helpers/images";
import SearchInfo from "../ResultList/SearchInfo";

export default function PaymentPageForBooking(props: {
  isModalVisible: boolean;
}) {
  const { selectedFlight, selectedFlightDetailedIngo } = useStore(
    ({ search_results }) => search_results
  );
  const { passengers } = useStore(({ search_flight }) => search_flight);
  console.log(selectedFlight);

  async function bookAFlight() {
    if (selectedFlight) {
      await API.bookFlight(selectedFlight)
        .then(() => {
          alert("Succesfully booked");
          // navigation.navigate('Main Page')
        })
        .catch((error) => alert(error));
    }
  }

  const handleFlightBooking = () => {
    let paidPrice: number = 0;
    if (selectedFlight !== undefined) {
      if (selectedFlight?.selected_class === Selected_class.econom) {
        paidPrice =
          Number(selectedFlightDetailedIngo.econom_price) *
          (passengers.adults + passengers.childen * 0.75);
        store.dispatch(payForFlight(paidPrice));
        bookAFlight();
      }
      if (selectedFlight?.selected_class === Selected_class.business) {
        paidPrice =
          Number(selectedFlightDetailedIngo.business_price) *
          (passengers.adults + passengers.childen * 0.75);
        store.dispatch(payForFlight(paidPrice));
        bookAFlight();
      }
      if (selectedFlight?.selected_class === Selected_class.first) {
        paidPrice =
          Number(selectedFlightDetailedIngo.first_class_price) *
          (passengers.adults + passengers.childen * 0.75);
        store.dispatch(payForFlight(paidPrice));
        bookAFlight();
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={props.isModalVisible}
      onRequestClose={() =>
        store.dispatch(changeActiveModalIndex(Move_Modal.back))
      }
    >
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Icon
          name="chevron-back"
          size={30}
          onPress={() =>
            store.dispatch(changeActiveModalIndex(Move_Modal.back))
          }
        />
        <Text style={styles.title}>Select payment method</Text>
      </View>
      <View style={styles.container}>
        <SearchInfo />
        {/* <Button onPress={handleFlightBooking}>Pay for the flight</Button> */}

        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GREEN}
          style={styles.touchable}
          onPress={() => {
            //   store.dispatch(selectSeat(null));
            //   store.dispatch(changeActiveModalIndex(Move_Modal.forward));
          }}
        >
          <View style={styles.payment_method}>
            <Icon name="card" size={25} />
            <Text style={styles.payment_method_title}>
              Credit or Debit card
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GREEN}
          style={styles.touchable}
          onPress={() => {
            //   store.dispatch(selectSeat(null));
            //   store.dispatch(changeActiveModalIndex(Move_Modal.forward));
          }}
        >
          <View style={styles.payment_method}>
            <Image source={PayPal} style={styles.icon} />
            <Text style={styles.payment_method_title}>PayPal</Text>
          </View>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
    // alignItems: "center",
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
  touchable: {
    marginHorizontal: 40,
    marginVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  payment_method: {
    backgroundColor: LIGHT_GRAY,
    borderWidth: 1,
    borderColor: GRAY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: "row",
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  payment_method_title: {
    color: DARK_GRAY_2,
    fontSize: 19,
    marginLeft: 13,
  },
  icon: {
    width: 27,
    height: 27,
  },
});
