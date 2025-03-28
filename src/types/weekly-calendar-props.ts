import { Appointment } from "./appointment-types";

export interface WeeklyCalendarProps {
  setAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
}
