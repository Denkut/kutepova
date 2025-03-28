import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app-slice";
import appointmentsReducer from "./appointments-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    appointments: appointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
