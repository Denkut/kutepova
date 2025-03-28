/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { WeeklyCalendar, AppointmentForm } from "../components";
import { Appointment } from "../types";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null); // Указываем правильный тип
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Записаться на консультацию</h1>
        <WeeklyCalendar setAppointment={setAppointment} />{" "}
        {/* Календарь для выбора даты и времени */}
        {appointment && (
          <AppointmentForm
            appointment={appointment}
            selectedDate={appointment.date}
            selectedTime={appointment.time}
            setShowForm={setShowForm}
            navigate={navigate}
          />
        )}
        {/* Форма для записи */}
      </div>
    </section>
  );
};
