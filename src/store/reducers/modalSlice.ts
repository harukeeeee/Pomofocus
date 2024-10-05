import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalState {
  isOpen: boolean;
  focus: {
    minutes: number;
    seconds: number;
  };
  chill: {
    minutes: number;
    seconds: number;
  };
}

const initialState: IModalState = {
  isOpen: false,
  focus: {
    minutes: 25,
    seconds: 0,
  },
  chill: {
    minutes: 5,
    seconds: 0,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state: IModalState) {
      state.isOpen = true;
    },
    closeModal(state: IModalState) {
      state.isOpen = false;
    },
    setFocusMinutes(state: IModalState, action: PayloadAction<number>) {
      state.focus.minutes = action.payload;
    },
    setFocusSeconds(state: IModalState, action: PayloadAction<number>) {
      state.focus.seconds = action.payload;
    },
    setChillMinutes(state: IModalState, action: PayloadAction<number>) {
      state.chill.minutes = action.payload;
    },
    setChillSeconds(state: IModalState, action: PayloadAction<number>) {
      state.chill.seconds = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {
  openModal,
  closeModal,
  setFocusMinutes,
  setFocusSeconds,
  setChillMinutes,
  setChillSeconds,
} = modalSlice.actions;
