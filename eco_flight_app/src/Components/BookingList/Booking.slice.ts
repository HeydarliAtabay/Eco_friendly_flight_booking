import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  BookedFlightInfo,
  Selected_class,
} from "../../services/interfaces.ts/interfaces";

interface checkinState {
  selected_class: Selected_class | null;
  seat: string;
}
export interface BookingState {
  bookedFlights: BookedFlightInfo[];
  selectedBookedFLight: BookedFlightInfo | undefined;
  checkinState: checkinState;
  showSeatSelection: boolean;
  showBoardingPass: boolean;
  showCheckIn: boolean;
}
const emptyCheckinState: checkinState = {
  selected_class: null,
  seat: "",
};

const initialState: BookingState = {
  bookedFlights: [],
  selectedBookedFLight: undefined,
  checkinState: emptyCheckinState,
  showSeatSelection: false,
  showBoardingPass: false,
  showCheckIn: false,
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
      state.bookedFlights = list
        .sort((a, b) =>
          moment(a.flight_info.departure_date).diff(
            moment(b.flight_info.departure_date)
          )
        )
        .filter((fl) =>
          moment(fl.flight_info.departure_date).isAfter(
            moment().subtract(1, "day")
          )
        );
    },

    selectBookedFlight: (
      state,
      { payload: flight }: PayloadAction<BookedFlightInfo | undefined>
    ) => {
      state.selectedBookedFLight = flight;
    },
    changeSelectedClass: (
      state,
      { payload: selClass }: PayloadAction<Selected_class>
    ) => {
      state.checkinState.selected_class = selClass;
    },
    changeSelectedSeat: (state, { payload: seat }: PayloadAction<string>) => {
      state.checkinState.seat = seat;
    },
    changeSeatModalVisibility: (
      state,
      { payload: stat }: PayloadAction<boolean>
    ) => {
      state.showSeatSelection = stat;
    },
    changeBoardingBassVisibility: (
      state,
      { payload: stat }: PayloadAction<boolean>
    ) => {
      state.showBoardingPass = stat;
    },
    changeCheckinVisibility: (
      state,
      { payload: stat }: PayloadAction<boolean>
    ) => {
      state.showCheckIn = stat;
    },
  },
});

export const {
  initializeBookedFlightResults,
  loadBookedFlights,
  selectBookedFlight,
  changeSelectedClass,
  changeSelectedSeat,
  changeSeatModalVisibility,
  changeBoardingBassVisibility,
  changeCheckinVisibility,
} = slice.actions;

export default slice.reducer;
