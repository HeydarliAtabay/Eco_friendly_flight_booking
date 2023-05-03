import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airport, Flight_Mode } from "../../helpers";
import { Moment } from "moment";
import moment from "moment";
import { Move_Modal, Payment_Status, SearchFlightResultSingle, SelectedFlight } from "../../services/interfaces.ts/interfaces";

export interface SearchFlightState {
    departureFlights: SearchFlightResultSingle[]
    returnFlights: SearchFlightResultSingle[]
    selectedFlight: SelectedFlight | undefined
    activeModalIndex: number
}

const initialState: SearchFlightState = {
    departureFlights: [],
    returnFlights: [],
    selectedFlight: undefined,
    activeModalIndex: 0
};

const slice = createSlice({
    name: "search_results",
    initialState,
    reducers: {
        initializeFlightResults: () => initialState,
        loadDepartureFlights: (state, { payload: list }: PayloadAction<SearchFlightResultSingle[]>) => {
            state.departureFlights = list;
        },
        loadReturnFlights: (state, { payload: list }: PayloadAction<SearchFlightResultSingle[]>) => {
            state.returnFlights = list;
        },
        selectFlight: (state, { payload: flight }: PayloadAction<SelectedFlight>) => {
            state.selectedFlight = flight;
        },
        selectSeat: (state, { payload: seat }: PayloadAction<string | null>) => {
            if (state.selectedFlight) {
                state.selectedFlight.seat = seat;
            }
        },
        payForFlight: (state, { payload: paymentStatus }: PayloadAction<Payment_Status>) => {
            if (state.selectedFlight) {
                state.selectedFlight.payment_status = paymentStatus;
            }
        },
        changeActiveModalIndex: (state, { payload: operation }: PayloadAction<Move_Modal>) => {
            if (operation === Move_Modal.forward) {
                state.activeModalIndex = state.activeModalIndex + 1
            }
            else if (operation === Move_Modal.back) {
                state.activeModalIndex = state.activeModalIndex - 1

            }
        }

    },
});

export const {
    initializeFlightResults,
    loadDepartureFlights,
    loadReturnFlights,
    selectFlight,
    selectSeat,
    payForFlight,
    changeActiveModalIndex
} = slice.actions;

export default slice.reducer;
