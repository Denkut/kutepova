export interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  phoneNumber: string;
  complaint: string;
  status: "waiting" | "confirmed" | "canceled";
}
