import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  BookedFlightInfo,
  Selected_class,
} from "../../services/interfaces.ts/interfaces";

interface checkinState {
  selected_class: Selected_class | null;
  seat: string;
}
export interface BookingState {
  mostRecentFlight: BookedFlightInfo | undefined;
}

const initialState: BookingState = {
  mostRecentFlight: undefined,
};

const slice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    initializeMainPageStates: () => initialState,
    loadMostRecentFlight: (
      state,
      { payload: flight }: PayloadAction<BookedFlightInfo>
    ) => {
      state.mostRecentFlight = flight;
    },
  },
});

export const { initializeMainPageStates, loadMostRecentFlight } = slice.actions;

export default slice.reducer;
