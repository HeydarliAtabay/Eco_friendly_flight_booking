import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AIRPLANEFORSEARCH,
  ECOPLANETREE,
  FLIGHTBLACK,
  FLIGTHICON,
} from "../../helpers/images";
import { DARK_GRAY_2, GREEN } from "../../helpers/styles";
import API from "../../services/API";
import { store } from "../../store/store";
import { useStore } from "../../store/storeHooks";
import { loadMostRecentFlight } from "./MainPage.slice";
import MostRecentFlightCard from "./RecentFlightCard";
import { MainPageProps } from "../../services/interfaces.ts/interfaces";

export default function MainPage({ navigation }: MainPageProps) {
  const { user } = useStore(({ app }) => app);
  const { mostRecentFlight } = useStore(({ mainPage }) => mainPage);

  useEffect(() => {
    async function getMostRecentFlightInfo() {
      if (user) {
        await API.getMostRecentFlightOfUser(user.id)
          .then((resultingFlight) => {
            store.dispatch(loadMostRecentFlight(resultingFlight));
          })
          .catch((error) => alert(error));
      }
    }
    getMostRecentFlightInfo();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 15 }} contentContainerStyle={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Text
          style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
        >{`Welcome ${user?.name} ${user?.surname}`}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              backgroundColor: GREEN,
              width: 70,
              height: 70,
              borderWidth: 1,
              borderColor: "black",
            }}
            onPress={() => navigation.navigate("Search Flight")}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                transform: [{ rotate: "90deg" }],
              }}
              source={FLIGHTBLACK}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Flights
          </Text>
        </View>
        {mostRecentFlight && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("My flights");
            }}
          >
            <MostRecentFlightCard flight={mostRecentFlight && mostRecentFlight} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Search Flight")}>
          <View
            style={{
              width: "90%",
              height: 450,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
                alignItems: "center",
                marginLeft: "auto",
              }}
              source={ECOPLANETREE}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
  },
});
