import { Provider } from "react-redux";
import React, { useEffect } from "react";
import MainContainer from "./src/Navigation/MainContainer";
import { store } from "./src/store/store";
import { useStore, useStoreWithInitializer } from "./src/store/storeHooks";
import { LoginPageStackNavigator } from "./src/Navigation/Pages/LoginStackNav";
export default function App() {
  const { user } = useStore(({ app }) => app);
  const isLoggedin = user ? true : false;

  // async function load() {
  //   if (isLoggedin) {
  //     await API.getUserInfo().then((res) => {
  //       store.dispatch(loadUser(res))
  //     })
  //   }
  // }

  return (
    <>
      <Provider store={store}>
        {!isLoggedin ? <LoginPageStackNavigator /> : <MainContainer />}
      </Provider>
    </>
  );
}
