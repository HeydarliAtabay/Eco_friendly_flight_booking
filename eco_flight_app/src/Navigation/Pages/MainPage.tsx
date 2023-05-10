import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useStore } from "../../store/storeHooks";
import { MainPageProps } from "../../services/interfaces.ts/interfaces";

export default function MainPage({ navigation }: MainPageProps) {
  const { user } = useStore(({ app }) => app);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text
        style={{ fontWeight: "bold", fontSize: 20 }}
      >{`Welcome ${user?.name} ${user?.surname}`}</Text>
      <Text>Main Page will be shown here</Text>

      <Button
        title="Search a flight"
        onPress={() => navigation.navigate("Search Flight")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
