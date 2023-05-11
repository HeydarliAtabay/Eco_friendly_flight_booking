import React, { SetStateAction, useState } from "react";
import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GREEN, GRAY, LIGHT_GRAY, LIGHT_GRAY_2, DARK_GRAY } from "../../../helpers/styles";

export default function CreditCardAdd(props: { closeFunc: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [cardHoler, setCardHolder] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>();
  const [expireDate, setExpireDate] = useState<{
    month?: string;
    year?: string;
  }>({});
  const [cvv, setCvv] = useState<string>();
  const [paymentProcess, setPaymentProcess] = useState<
    "Loading" | "Paid" | "Waiting"
  >("Waiting");

  const handleCardExpireDate = (mm: string, type: "M" | "Y") => {
    if (type === "M") {
      setExpireDate((expr) => ({ ...expr, month: mm }));
    }
    if (type === "Y") {
      setExpireDate((expr) => ({ ...expr, year: mm }));
    }
  };

  const isValidData = () => {
    const name = cardHoler !== "";
    const cardNum = cardNumber?.length === 16;
    const exprDateMM =
      0 < Number(expireDate.month) && Number(expireDate.month) < 13;
    const exprDateYYYY = Number(expireDate.year) >= 2023;
    const cvvCode = cvv?.length === 3;

    if (!name) alert("Insert Card Holder name!");
    else if (!cardNum) alert("Insert correct card number!");
    else if (!exprDateMM || !exprDateYYYY) alert("Insert valid expire date!");
    else if (!cvvCode) alert("Insert valid security code!");

    return name && cardNum && exprDateMM && exprDateYYYY && cvvCode;
  };

  const payAmount = () => {
    const waitingTime = Math.floor(Math.random() * (3 - 0.7 + 1) + 0.7) * 1000;
    setTimeout(() => {
      setPaymentProcess("Paid");
    }, waitingTime);
  };


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {paymentProcess === "Paid" ? (
          <View style={styles.payment_method_details}>
            <Icon name="checkmark-circle-outline" color={GREEN} size={80} />
            <Text style={{ color: GREEN, fontSize: 25 }}>
              Paid Successfully
            </Text>
          </View>
        ) : (
          <View style={styles.payment_method_details}>
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>Card holder</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCardHolder}
                value={cardHoler}
                placeholder="Name & Surname"
                placeholderTextColor={DARK_GRAY}
                inputMode="text"
              />
            </View>
            <View style={{ width: "100%", marginTop: 10 }}>
              <Text style={styles.label}>Card number</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCardNumber}
                value={cardNumber}
                placeholder="XXXX XXXX XXXX XXXX"
                placeholderTextColor={DARK_GRAY}
                inputMode="numeric"
                maxLength={16}
              />
            </View>
            <View
              style={{ width: "100%", marginTop: 10, flexDirection: "row" }}
            >
              <View>
                <Text style={styles.label}>Expire date</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[
                      styles.input,
                      { width: "30%", textAlign: "center" },
                    ]}
                    onChangeText={(expr) => handleCardExpireDate(expr, "M")}
                    value={expireDate.month as unknown as string}
                    placeholder="MM"
                    placeholderTextColor={DARK_GRAY}
                    inputMode="numeric"
                    maxLength={2}
                  />
                  <View
                    style={{
                      borderLeftColor: GRAY,
                      borderLeftWidth: 1,
                      marginHorizontal: 10,
                      height: 35,
                      transform: [{ rotate: "15deg" }],
                    }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      { width: "40%", textAlign: "center" },
                    ]}
                    onChangeText={(expr) => handleCardExpireDate(expr, "Y")}
                    value={expireDate.year as unknown as string}
                    placeholder="YYYY"
                    placeholderTextColor={DARK_GRAY}
                    inputMode="numeric"
                    maxLength={4}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.label}>CVV code</Text>
                <TextInput
                  style={[styles.input, { textAlign: "center" }]}
                  onChangeText={setCvv}
                  value={cvv}
                  placeholder="123"
                  placeholderTextColor={DARK_GRAY}
                  inputMode="numeric"
                  maxLength={3}
                />
              </View>
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
                props.closeFunc(false);

              }
            }}
          >
            <>
              {paymentProcess === "Waiting" && (
                <Text style={styles.payment_method_title}>Save payment method</Text>
              )}
              {paymentProcess === "Loading" && (
                <Text style={styles.payment_method_title}>
                  <ActivityIndicator size="small" color={LIGHT_GRAY} />
                  Processing
                </Text>
              )}
            </>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={GREEN}
            style={styles.touchable}
            onPress={() => {
              // TODO: add method to forward main page
            }}
          >
            <Text style={styles.payment_method_title}>Back to Main page</Text>
          </TouchableHighlight>
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
    borderColor: GREEN,
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
    marginHorizontal: 10,
    marginBottom: 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  payment_method: {
    backgroundColor: DARK_GRAY,
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
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: GREEN,
    color: "white",
    alignItems: "center",
    flexDirection: "row",
  },
});
