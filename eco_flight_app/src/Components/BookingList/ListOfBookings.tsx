import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { DARK_GRAY, GRAY, GREEN } from "../../helpers/styles";
import API from "../../services/API";
import { store } from "../../store/store";
import { useStore } from "../../store/storeHooks";
import {
  changeBoardingBassVisibility,
  changeCheckinVisibility,
  initializeBookedFlightResults,
  loadBookedFlights,
  selectBookedFlight,
} from "./Booking.slice";
import DetailedInfoOfBookedFlight from "./BoardingPass";
import EmptyBookingListpage from "./EmptyBookingListPage";
import SingleBookingCard from "./SingleBookingCard";
import BoardingPass from "./BoardingPass";
import Checkin from "./Checkin";
import Icon from "react-native-vector-icons/Ionicons";

export default function ListOfBookingsPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useStore(({ app }) => app);
  const { bookedFlights, selectedBookedFLight, showBoardingPass, showCheckIn } =
    useStore(({ booking }) => booking);

  async function getBookedFlightsOfUser() {
    store.dispatch(initializeBookedFlightResults());
    store.dispatch(selectBookedFlight(undefined));
    if (user) {
      setLoading(true);
      await API.getBookedFlights(user.id)
        .then((res) => {
          store.dispatch(loadBookedFlights(res));
          setLoading(false);
        })
        .catch((err) => alert(err));
    }
  }
  useEffect(() => {
    if (user !== undefined) {
      getBookedFlightsOfUser();
    }
    return () => {
      store.dispatch(changeBoardingBassVisibility(false));
      store.dispatch(loadBookedFlights([]));
    };
  }, []);

  useEffect(() => {
    if (
      selectedBookedFLight !== undefined &&
      selectedBookedFLight.checkin_status === "DONE"
    ) {
      store.dispatch(changeBoardingBassVisibility(true));
      store.dispatch(changeCheckinVisibility(false));
    } else if (
      selectedBookedFLight !== undefined &&
      selectedBookedFLight.checkin_status === "PENDING"
    ) {
      store.dispatch(changeCheckinVisibility(true));
      store.dispatch(changeBoardingBassVisibility(false));
    } else {
      store.dispatch(changeBoardingBassVisibility(false));
      store.dispatch(changeCheckinVisibility(false));
    }
  }, [selectedBookedFLight]);
  return (
    <View style={styles.container}>
      {bookedFlights.length === 0 && !loading ? (
        <EmptyBookingListpage />
      ) : bookedFlights.length !== 0 && !loading ? (
        <SafeAreaView style={{ padding: 0, flex: 1 }}>
          <FlatList
            data={bookedFlights}
            initialNumToRender={3}
            renderItem={({ item }) => <SingleBookingCard flight={item} />}
            keyExtractor={(item) => item.id as unknown as string}
            // ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </SafeAreaView>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator animating={true} color={GREEN} size="large" />
        </View>
      )}
      <Modal
        animationType="slide"
        visible={showBoardingPass}
        onRequestClose={() =>
          store.dispatch(changeBoardingBassVisibility(false))
        }
      >
        <View style={styles.header}>
          <Icon
            name="chevron-down"
            size={30}
            onPress={() => store.dispatch(changeBoardingBassVisibility(false))}
          />
          <Text style={styles.title}>Booking details</Text>
        </View>
        <BoardingPass />
      </Modal>
      <Modal
        animationType="slide"
        visible={showCheckIn}
        onRequestClose={() => store.dispatch(changeCheckinVisibility(false))}
      >
        <View style={styles.header}>
          <Icon
            name="chevron-down"
            size={30}
            onPress={() => store.dispatch(changeCheckinVisibility(false))}
          />
          <Text style={styles.title}>Checkin</Text>
        </View>
        <Checkin />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});
