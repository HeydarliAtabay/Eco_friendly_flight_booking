import { Action, configureStore } from "@reduxjs/toolkit";
import login from "../Navigation/Pages/Login/Login.slice";
import app from "../../App.slice";
import search_flight from "../Components/SearchFlight/SearchFlight.slice";
import search_results from "../Components/ResultList/ResultList.slice";
import booking from "../Components/BookingList/Booking.slice";
import mainPage from "../Navigation/Pages/MainPage.slice";

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { app, login, search_flight, search_results, booking, mainPage },
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
