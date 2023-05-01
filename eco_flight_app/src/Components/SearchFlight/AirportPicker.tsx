import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { DARK_GRAY, GRAY } from "../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Airport } from "../../helpers";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { State } from "../../store/store";

const Item = (props: {
  details: Airport;
  selectAirport: (airport: Airport) => void;
}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={GRAY}
      onPress={() => props.selectAirport(props.details)}
    >
      <View style={styles.item}>
        <View>
          <Text style={styles.item_title1}>{props.details.name}</Text>
          <Text style={styles.item_title2}>{props.details.country}</Text>
        </View>
        <Text style={styles.item_title1}>{props.details.code}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default function AirportPicker(props: {
  isModalVisible: boolean;
  setIsModalVisible: (val: boolean) => void;
  setAirport: (airport: Airport) => void;
  title: string;
}) {
  const { isModalVisible, setIsModalVisible, setAirport, title } = props;
  const airportList = useSelector(
    (state: State) => state.search_flight.airportList
  );
  const [filteredList, setFilteredList] = useState<Airport[]>(airportList);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (query: string) => {
    setSearchQuery(query);
    const result = airportList.filter(
      (airport) =>
        airport.code?.toString().toLowerCase().includes(query.toLowerCase()) ||
        airport.name?.toString().toLowerCase().includes(query.toLowerCase()) ||
        airport.city?.toString().toLowerCase().includes(query.toLowerCase()) ||
        airport.country?.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredList(result);
  };

  const selectAirport = (airport: Airport) => {
    setAirport(airport);
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
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.search_bar}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChange}
          value={searchQuery}
        />
      </View>
      <SafeAreaView>
        <FlatList
          data={filteredList}
          initialNumToRender={5}
          renderItem={({ item }) => (
            <Item details={item} selectAirport={selectAirport} />
          )}
          keyExtractor={(item) => item.id as unknown as string}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </SafeAreaView>
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

  search_bar: {
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 5,
  },
  item_title1: {
    fontSize: 18,
  },
  item_title2: {
    fontSize: 15,
    color: DARK_GRAY,
  },
  divider: {
    height: 1,
    backgroundColor: GRAY,
    marginHorizontal: 20,
    flexDirection: "row",
  },
});
