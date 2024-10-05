import { combineReducers, configureStore } from "@reduxjs/toolkit";
import timerSlice from "./reducers/timerSlice";
import modalSlice from "./reducers/modalSlice";

const rootReducer = combineReducers({
  timer: timerSlice,
  modal: modalSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
