import { Provider } from "react-redux";
import React, { useEffect } from "react";
import MainContainer from "./src/Navigation/MainContainer";
import { store } from "./src/store/store";
import { useStore } from "./src/store/storeHooks";
import { LoginPageStackNavigator } from "./src/Navigation/Pages/LoginStackNav";
export default function App() {
  const { user } = useStore(({ app }) => app);
  const isLoggedin = user ? true : false;
  return (
    <>
      <Provider store={store}>
        {!isLoggedin ? <LoginPageStackNavigator /> : <MainContainer />}
      </Provider>
    </>
  );
}
