import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { GRAY } from "../../helpers/styles";
import { MainPageProps } from "../../services/interfaces.ts/interfaces";
import { useStore } from "../../store/storeHooks";
import EmptyResultPage from "./EmptyResultPage";
import SearchInfo from "./SearchInfo";
import SingleResultCard from "./SingleResultCard";

export default function ResultsPage({ navigation }: MainPageProps) {
  const { departureFlights, returnFlights } = useStore(
    ({ search_results }) => search_results
  );
  const { returnDate } = useStore(({ search_flight }) => search_flight);

  useEffect(() => {
    if (
      departureFlights.length !== 0 &&
      returnFlights.length === 0 &&
      returnDate !== null
    ) {
      alert(`No return flights for ${returnDate?.format("DD MMM YYYY")}`);
    }
  }, [returnFlights]);

  return (
    <View style={styles.container}>
      <SearchInfo />
      {departureFlights.length === 0 ? (
        <EmptyResultPage />
      ) : (
        <SafeAreaView style={{ padding: 0, flex: 1 }}>
          <FlatList
            data={departureFlights}
            initialNumToRender={5}
            renderItem={({ item }) => (
              <SingleResultCard flight={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id as unknown as string}
            // ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: GRAY,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
});
