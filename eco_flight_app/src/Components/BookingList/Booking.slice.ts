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
}

const initialState: BookingState = {
  bookedFlights: [],
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
  },
});

export const { initializeBookedFlightResults, loadBookedFlights } =
  slice.actions;

export default slice.reducer;
