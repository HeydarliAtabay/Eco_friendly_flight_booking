import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import {
  DARK_GRAY,
  DARK_GRAY_2,
  GRAY,
  GREEN,
  LIGHT_GRAY,
  LIGHT_GRAY_2,
} from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { PayPal } from "../../helpers/images";

export default function PayPalPaymentPage(props: {
  isModalVisible: boolean;
  setHide: (val: "Card" | "PayPal" | "None") => void;
  onSuccess: () => Promise<void>;
  setIsPaid: (val: boolean) => void;
}) {
  const [email, setEmail] = useState<string>("");

  const [paymentProcess, setPaymentProcess] = useState<
    "Loading" | "Paid" | "Waiting"
  >("Waiting");

  const isValidData = () => {
    const isValid = email.toLowerCase().match(/\S+@\S+\.\S+/);
    if (!isValid) alert("Insert valid paypal address!");
    return isValid;
  };

  const payAmount = () => {
    const waitingTime = Math.floor(Math.random() * (3 - 0.7 + 1) + 0.7) * 1000;
    setTimeout(() => {
      setPaymentProcess("Paid");
    }, waitingTime);
  };

  return (
    <Modal
      animationType="slide"
      visible={props.isModalVisible}
      onRequestClose={() => {
        if (paymentProcess !== "Paid") props.setHide("None");
      }}
    >
      <StatusBar style="auto" />
      {paymentProcess !== "Paid" && (
        <View style={styles.header}>
          <Icon
            name="chevron-down"
            size={30}
            onPress={() => props.setHide("None")}
          />
          <Text style={styles.title}>Insert payment details</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          paymentProcess === "Paid" && {
            paddingTop: Platform.OS === "ios" ? 70 : 30,
          },
        ]}
      >
        {paymentProcess === "Paid" ? (
          <View style={styles.payment_method_details}>
            <Icon name="checkmark-circle-outline" color={GREEN} size={80} />
            <Text style={{ color: GREEN, fontSize: 25 }}>
              Paid Successfully
            </Text>
          </View>
        ) : (
          <View style={styles.payment_method_details}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={PayPal} style={styles.logo} />
              <Text
                style={{ color: DARK_GRAY_2, fontSize: 21, marginVertical: 20 }}
              >
                Pay with PayPal
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="example@email.com"
                inputMode="email"
              />
            </View>
          </View>
        )}

        {paymentProcess !== "Paid" ? (
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={GREEN}
            style={styles.touchable}
            onPress={() => {
              if (isValidData()) {
                setPaymentProcess("Loading");
                props
                  .onSuccess()
                  .then(() => payAmount())
                  .catch(() => alert("Payment failed! Try again later..."));
              }
            }}
          >
            <>
              {paymentProcess === "Waiting" && (
                <View style={styles.pay_button_container}>
                  <Text style={styles.payment_method_title}>Pay</Text>
                </View>
              )}
              {paymentProcess === "Loading" && (
                <View style={styles.pay_button_container}>
                  <ActivityIndicator size="small" color={LIGHT_GRAY} />
                  <Text style={styles.payment_method_title}>Processing</Text>
                </View>
              )}
            </>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={GREEN}
            style={styles.touchable}
            onPress={() => {
              props.setIsPaid(true);
              props.setHide("None");
            }}
          >
            <View style={styles.pay_button_container}>
              <Text style={styles.payment_method_title}>Back to Main page</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: Platform.OS === "ios" ? "10%" : 0,
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    marginLeft: 30,
  },
  payment_method_details: {
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: LIGHT_GRAY_2,
    borderWidth: 1,
    borderColor: GRAY,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "30%",
  },
  label: {
    color: DARK_GRAY,
    fontSize: 13,
  },
  input: {
    height: 40,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: GRAY,
    padding: 10,
  },
  touchable: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 70,
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
  pay_button_container: {
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  payment_method_title: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginHorizontal: "auto",
    display: "flex",
  },
});
