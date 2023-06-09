import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Payment_Status,
  SearchFlightResultSingle,
  Selected_class,
  SelectedFlight,
} from "../../services/interfaces.ts/interfaces";

export interface SearchFlightState {
  departureFlights: SearchFlightResultSingle[];
  returnFlights: SearchFlightResultSingle[];
  selectedFlight: SelectedFlight | undefined;
  selectedFlightDetailedIngo: SearchFlightResultSingle;
}

const emptyFlight: SearchFlightResultSingle = {
  id: 0,
  departure_airport: 0,
  arrival_airport: 0,
  departure_date: "",
  departure_time: "",
  arrival_date: "",
  arrival_time: "",
  econom_price: 0,
  business_price: 0,
  first_class_price: 0,
  airline: 0,
  flight_number: "",
  departure_airport_name: "",
  departure_airport_code: "",
  departure_airport_country: "",
  departure_airport_city: "",
  arrival_airport_name: "",
  arrival_airport_code: "",
  arrival_airport_country: "",
  arrival_airport_city: "",
};

const initialState: SearchFlightState = {
  departureFlights: [],
  returnFlights: [],
  selectedFlight: undefined,
  selectedFlightDetailedIngo: emptyFlight,
};

const slice = createSlice({
  name: "search_results",
  initialState,
  reducers: {
    initializeFlightResults: () => initialState,
    loadDepartureFlights: (
      state,
      { payload: list }: PayloadAction<SearchFlightResultSingle[]>
    ) => {
      state.departureFlights = list;
    },
    loadReturnFlights: (
      state,
      { payload: list }: PayloadAction<SearchFlightResultSingle[]>
    ) => {
      state.returnFlights = list;
    },
    selectFlight: (
      state,
      { payload: flight }: PayloadAction<SelectedFlight>
    ) => {
      state.selectedFlight = flight;
    },
    selectFlightDetailedInfo: (
      state,
      { payload: flight }: PayloadAction<SearchFlightResultSingle>
    ) => {
      state.selectedFlightDetailedIngo = flight;
    },
    selectSeat: (state, { payload: seat }: PayloadAction<string | null>) => {
      if (state.selectedFlight) {
        state.selectedFlight.seat = seat;
      }
    },
    selectFlightClass: (
      state,
      { payload: flightClass }: PayloadAction<Selected_class>
    ) => {
      if (state.selectedFlight) {
        state.selectedFlight.selected_class = flightClass;
      }
    },
    payForFlight: (state, { payload: amount }: PayloadAction<number>) => {
      if (state.selectedFlight) {
        state.selectedFlight.payment_status = Payment_Status.paid;
        state.selectedFlight.paid_price = amount;
      }
    },
  },
});

export const {
  initializeFlightResults,
  loadDepartureFlights,
  loadReturnFlights,
  selectFlight,
  selectSeat,
  payForFlight,
  selectFlightDetailedInfo,
  selectFlightClass,
} = slice.actions;

export default slice.reducer;
