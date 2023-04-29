import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    email: string;
    password: string;
  };
  loginIn: boolean;
  simpleError: string;
}

const initialState: LoginState = {
  user: {
    email: "",
    password: "",
  },
  loginIn: false,
  simpleError: "",
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    initializeLogin: () => initialState,
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof LoginState["user"]; value: string }>
    ) => {
      state.user[name] = value;
    },
    updateSimpleError: (state, { payload: errors }: PayloadAction<string>) => {
      state.simpleError = errors;
      state.loginIn = false;
    },
    startLoginIn: (state) => {
      state.loginIn = true;
    },
  },
});

export const {
  initializeLogin,
  updateField,
  startLoginIn,
  updateSimpleError,
} = slice.actions;

export default slice.reducer;
