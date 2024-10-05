import { createSlice } from "@reduxjs/toolkit";

interface ITimerState {
  isFocus: boolean;
  isRunning: boolean;
}

const initialState: ITimerState = {
  isFocus: true,
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    isFocusOrNot(state: ITimerState) {
      state.isFocus = !state.isFocus;
    },
    changeTimer(state: ITimerState) {
      state.isRunning = !state.isRunning;
    },
    stopTimer(state: ITimerState) {
      state.isRunning = false;
    },
  },
});

export default timerSlice.reducer;
export const { isFocusOrNot, changeTimer, stopTimer } = timerSlice.actions;
