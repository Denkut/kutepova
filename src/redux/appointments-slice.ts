import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "../types";

const initialState: Appointment[] = [];

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.push(action.payload);
    },
    editAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    cancelAppointment: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(
        (appointment) => appointment.id !== action.payload.id
      );
    },
  },
});

export const { addAppointment, editAppointment, cancelAppointment } =
  appointmentsSlice.actions;
export default appointmentsSlice.reducer;
