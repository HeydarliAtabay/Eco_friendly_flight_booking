import { Provider } from 'react-redux';
import React from "react";
import MainContainer from "./src/Navigation/MainContainer";
import { store } from './src/store/store';
import { useStore } from './src/store/storeHooks';
import LoginPage from './src/Navigation/Pages/Login/LoginPage';
export default function App() {
  const { user } = useStore(({ app }) => app)
  const isLoggedin = user ? true : false
  return (
    <>
      <Provider store={store}>
        {!isLoggedin ?
          <LoginPage /> :
          <MainContainer />

        }
      </Provider>
    </>
  );
}
