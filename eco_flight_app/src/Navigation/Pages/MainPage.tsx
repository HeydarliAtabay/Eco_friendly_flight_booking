import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

interface MainPageProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function MainPage({ navigation }: MainPageProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
