
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  counter: number;
}

const initialState: AppState = {
  counter: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const { increment, decrement } = appSlice.actions;
export default appSlice.reducer;
