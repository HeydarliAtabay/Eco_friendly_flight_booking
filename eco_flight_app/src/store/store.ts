import { Action, configureStore } from "@reduxjs/toolkit";
import login from "../Navigation/Pages/Login/Login.slice";
import app from "../../App.slice";

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { app, login },
  devTools: {
    name: "Iconic Gesture Control",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareConfiguration),
});
export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
