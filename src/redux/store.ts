import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app-slice";
import authReducer from "./auth-slice";
import appointmentsReducer from "./appointments-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    appointments: appointmentsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
