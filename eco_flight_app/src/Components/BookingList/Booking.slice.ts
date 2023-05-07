import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airport, Flight_Mode } from "../../helpers";
import { Moment } from "moment";
import moment from "moment";
import {
  BookedFlightInfo,
  Move_Modal,
  Payment_Status,
  SearchFlightResultSingle,
  SelectedFlight,
} from "../../services/interfaces.ts/interfaces";

export interface BookingState {
  bookedFlights: BookedFlightInfo[];
  selectedBookedFLight: BookedFlightInfo | undefined;
}

const initialState: BookingState = {
  bookedFlights: [],
  selectedBookedFLight: undefined,
};

const slice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    initializeBookedFlightResults: () => initialState,
    loadBookedFlights: (
      state,
      { payload: list }: PayloadAction<BookedFlightInfo[]>
    ) => {
      state.bookedFlights = list;
    },

    selectBookedFlight: (
      state,
      { payload: flight }: PayloadAction<BookedFlightInfo | undefined>
    ) => {
      state.selectedBookedFLight = flight;
    },
  },
});

export const {
  initializeBookedFlightResults,
  loadBookedFlights,
  selectBookedFlight,
} = slice.actions;

export default slice.reducer;
