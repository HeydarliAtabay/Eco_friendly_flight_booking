import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import API from "../../services/API";
import { Selected_class } from "../../services/interfaces.ts/interfaces";
import { store } from "../../store/store";
import { useStore } from "../../store/storeHooks";
import { payForFlight } from "../ResultList/ResultList.slice";
import {
  DARK_GRAY,
  DARK_GRAY_2,
  GRAY,
  GREEN,
  LIGHT_GRAY,
} from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { PayPal } from "../../helpers/images";
import moment from "moment";
import CardPaymentPage from "./CardPaymentPage";
import PayPalPaymentPage from "./PayPalPaymentPage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export default function PaymentPageForBooking(props: {
  navigation: NativeStackNavigationProp<any, any>;
}) {
  const { selectedFlight, selectedFlightDetailedIngo } = useStore(
    ({ search_results }) => search_results
  );
  const { passengers } = useStore(({ search_flight }) => search_flight);
  const [visibleModal, setVisibleModal] = useState<"Card" | "PayPal" | "None">(
    "None"
  );

  async function bookAFlight() {
    if (selectedFlight) {
      await API.bookFlight(selectedFlight)
        .then(() => {
          // props.navigation.navigate("Main Page");
        })
        .catch((error) => alert(error));
    }
  }

  useEffect(() => {
    let paidPrice: number = 0;
    if (selectedFlight !== undefined) {
      if (selectedFlight?.selected_class === Selected_class.econom) {
        paidPrice =
          Number(selectedFlightDetailedIngo.econom_price) *
          (passengers.adults + passengers.childen * 0.75);
        store.dispatch(payForFlight(paidPrice));
      }
      if (selectedFlight?.selected_class === Selected_class.business) {
        paidPrice =
          Number(selectedFlightDetailedIngo.business_price) *
          (passengers.adults + passengers.childen * 0.75);
        store.dispatch(payForFlight(paidPrice));
      }
      if (selectedFlight?.selected_class === Selected_class.first) {
        paidPrice =
          Number(selectedFlightDetailedIngo.first_class_price) *
          (passengers.adults + passengers.childen * 0.75);
        store.dispatch(payForFlight(paidPrice));
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.payment_details}>
        <View style={styles.directions_container}>
          <View style={styles.directions_inner_container}>
            <Text style={styles.directions_title} numberOfLines={1}>
              {selectedFlightDetailedIngo.departure_airport_name}
            </Text>
            <Icon name="airplane" size={15} style={{ marginHorizontal: 20 }} />
            <Text style={styles.directions_title} numberOfLines={1}>
              {selectedFlightDetailedIngo.arrival_airport_name}
            </Text>
          </View>

          <Text style={styles.directions_date}>
            {moment(selectedFlightDetailedIngo.departure_date).format(
              "DD MMM YYYY"
            )}
          </Text>
        </View>
        <View style={styles.payment_details_row}>
          <Icon
            name="people"
            size={27}
            color={DARK_GRAY}
            style={{ marginRight: 8, width: 30 }}
          />
          <Text style={{ color: DARK_GRAY_2, fontSize: 17 }}>Passengers:</Text>
          <Text style={{ color: DARK_GRAY_2, fontSize: 18, marginLeft: 7 }}>
            {passengers.adults + passengers.childen}
          </Text>
        </View>
        <View style={[styles.payment_details_row, styles.payment_amount]}>
          <Text style={{ color: DARK_GRAY_2, fontSize: 17 }}>
            Total amount:
          </Text>
          <Text style={{ color: GREEN, fontSize: 18, marginLeft: 7 }}>
            {selectedFlight?.paid_price}
          </Text>
          <Icon name="logo-euro" size={15} color={GREEN} />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GREEN}
          style={styles.touchable}
          onPress={() => setVisibleModal("Card")}
        >
          <View style={styles.payment_method}>
            <Icon name="card" size={25} />
            <Text style={styles.payment_method_title}>
              Credit or Debit card
            </Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 50,
            marginVertical: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderTopColor: GRAY,
              borderTopWidth: 1,
              flex: 1,
            }}
          />
          <Text
            style={{ color: DARK_GRAY, fontSize: 17, marginHorizontal: 20 }}
          >
            OR
          </Text>
          <View style={{ borderTopColor: GRAY, borderTopWidth: 1, flex: 1 }} />
        </View>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GREEN}
          style={styles.touchable}
          onPress={() => setVisibleModal("PayPal")}
        >
          <View style={styles.payment_method}>
            <Image source={PayPal} style={styles.icon} />
            <Text style={styles.payment_method_title}>PayPal</Text>
          </View>
        </TouchableHighlight>
        {visibleModal === "Card" && (
          <CardPaymentPage
            isModalVisible={visibleModal === "Card"}
            setHide={setVisibleModal}
            onSuccess={bookAFlight}
            navigation={props.navigation}
          />
        )}
        {visibleModal === "PayPal" && (
          <PayPalPaymentPage
            isModalVisible={visibleModal === "PayPal"}
            setHide={setVisibleModal}
            onSuccess={bookAFlight}
            navigation={props.navigation}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    justifyContent: "space-between",
  },
  payment_details: {
    marginHorizontal: 30,
    marginVertical: 10,
    paddingTop: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: LIGHT_GRAY,
    borderWidth: 1,
    borderColor: GREEN,
  },
  directions_container: {
    minWidth: 320,
    marginVertical: 20,
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
  payment_details_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  payment_amount: {
    marginTop: 25,
    borderTopColor: GRAY,
    borderTopWidth: 1,
    paddingVertical: 20,
    marginHorizontal: 20,
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
