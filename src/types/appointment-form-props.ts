import { Appointment } from "./appointment-types";

export interface AppointmentFormProps {
  selectedDate: string;
  selectedTime: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: (path: string) => void;
  appointment?: Appointment;
}
