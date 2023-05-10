import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { store } from "../../../store/store";
import { useStore } from "../../../store/storeHooks";
import { LoginState, updateField } from "./Login.slice";
import API from "../../../services/API";
import { loadUser } from "../../../../App.slice";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GRAY } from "../../../helpers/styles";
import Icon from "react-native-vector-icons/Ionicons";

interface MainPageProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function LoginPage({ navigation }: MainPageProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useStore(({ login }) => login);
  function onUpdateField(name: string, value: string) {
    store.dispatch(
      updateField({ name: name as keyof LoginState["user"], value })
    );
  }
  const doLogIn = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await API.logIn(credentials).then((result) => {
        API.getUserInfo()
          .then((result) => {
            store.dispatch(loadUser(result));
            setLoading(false);
          })
          .catch(function (error) {
            alert(error.message);
            throw error;
          });
      });
    } catch (err) {
      alert({ msg: err, type: "danger" });
    }
  };
  const handleSubmit = () => {
    let valid = true;
    if (user.email === "" || user.password === "" || user.password.length < 2)
      valid = false;
    if (valid) {
      doLogIn({ username: user.email, password: user.password }).catch(
        function (error) {
          alert(
            `There has been a problem with your fetch operation: ${error.message}`
          );
          throw error;
        }
      );
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../../assets/airplane.png")}
        />
        <Text style={{ fontSize: 20, marginBottom: 5 }}>Login</Text>
        <TextInput
          style={styles.TextInput}
          label="Email"
          returnKeyType="next"
          value={user.email}
          underlineColor="transparent"
          onChangeText={(v: string) => {
            onUpdateField("email", v);
          }}
          // errorText={email.error}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.TextInput}
          label="Password"
          returnKeyType="done"
          value={user.password}
          underlineColor="transparent"
          onChangeText={(v: string) => {
            onUpdateField("password", v);
          }}
          // error={!!password.error}
          secureTextEntry
        />
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={GRAY}
          style={{ width: "60%", marginTop: 45, borderRadius: LOGIN_RADIUS }}
          disabled={loading}
          onPress={handleSubmit}
        >
          <View style={styles.loginBtn}>
            {loading ? (
              <ActivityIndicator
                size={"small"}
                color={"white"}
                style={{ margin: "auto" }}
              />
            ) : (
              <Icon name="send" size={20} color={"white"} />
            )}
            <Text style={{ color: "white", fontSize: 16, marginLeft: 10 }}>
              {!loading ? "Login" : "Logging in..."}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign up")}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// constants
const LOGIN_RADIUS = 17;

// styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    margin: "auto",
    marginBottom: 50,
  },
  input: {
    height: 40,
    margin: 5,
    width: "80%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  inputView: {
    backgroundColor: "#ADD8E6",
    borderRadius: 12,
    width: "100%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    width: "85%",
    backgroundColor: "#ADD8E6",
    padding: 1,
    marginBottom: 10,
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#800080",
    overflow: "hidden",
    borderRadius: LOGIN_RADIUS,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: "orange",
  },
  link: {
    fontWeight: "bold",
    color: "#800080",
  },
});
