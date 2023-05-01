import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airport, Flight_Mode } from "../../helpers";
import { Moment } from "moment";
import moment from "moment";

export interface SearchFlightState {
  airportList: Airport[];
  flightMode: Flight_Mode;
  airports: { from: Airport | null; to: Airport | null };
  departureDate: Moment;
  returnDate: Moment | null;
  passengers: {
    adults: number;
    childen: number;
  };
}

const initialState: SearchFlightState = {
  airportList: [],
  flightMode: Flight_Mode.ONE_WAY,
  airports: { from: null, to: null },
  departureDate: moment(),
  returnDate: null,
  passengers: { adults: 1, childen: 0 },
};

const slice = createSlice({
  name: "search_flight",
  initialState,
  reducers: {
    initializeLogin: () => initialState,
    loadAirportList: (state, { payload: list }: PayloadAction<Airport[]>) => {
      state.airportList = list;
    },
    loadFlightMode: (state, { payload: mode }: PayloadAction<Flight_Mode>) => {
      state.flightMode = mode;
    },
    loadDepartureDate: (state, { payload: date }: PayloadAction<Moment>) => {
      state.departureDate = date;
    },
    loadReturnDate: (
      state,
      { payload: date }: PayloadAction<Moment | null>
    ) => {
      state.returnDate = date;
    },
    loadPassengers: (
      state,
      {
        payload: details,
      }: PayloadAction<{ count: number; type: "Adult" | "Child" }>
    ) => {
      switch (details.type) {
        case "Adult":
          state.passengers.adults = details.count;
          break;
        case "Child":
          state.passengers.childen = details.count;
          break;
      }
    },
    loadAirport: (
      state,
      {
        payload: details,
      }: PayloadAction<{ airport: Airport | null; direction: "From" | "To" }>
    ) => {
      switch (details.direction) {
        case "From":
          state.airports.from = details.airport;
          break;
        case "To":
          state.airports.to = details.airport;
          break;
      }
    },
  },
});

export const {
  initializeLogin,
  loadAirportList,
  loadFlightMode,
  loadDepartureDate,
  loadReturnDate,
  loadPassengers,
  loadAirport,
} = slice.actions;

export default slice.reducer;
