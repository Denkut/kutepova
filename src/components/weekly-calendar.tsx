import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppointmentForm } from "./appointment-form";
import { bookedSlots, timeslots, weekdays } from "../constants"; // Импортируем из единого файла
import { WeeklyCalendarProps } from "../types";

const formatDate = (date: Date) => {
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })}`;
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  setAppointment,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const getWeekDates = (date: Date) => {
    const startOfWeek = date.getDate() - date.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(date);
      newDate.setDate(startOfWeek + i);
      return newDate;
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date.toDateString());
    setSelectedTime(null);
    setShowForm(false);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      setAppointment({
        id: Date.now().toString(), // или другой способ генерации уникального ID
        date: selectedDate,
        time,
        name: "",
        phoneNumber: "", // или null, если допускается
        complaint: "", // или null
        status: "waiting", // или другое значение по умолчанию
      });
    }
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const isSlotBooked = (date: string, time: string) =>
    bookedSlots[date]?.includes(time);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4 items-center">
        <button
          onClick={handlePrevWeek}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Пред. неделя
        </button>
        <button
          onClick={handleToday}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Сегодня ({formatDate(new Date())})
        </button>
        <button
          onClick={handleNextWeek}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          След. неделя
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-2">
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="text-center font-bold text-lg text-gray-700"
          >
            {weekday}
          </div>
        ))}
      </div>

      <motion.div className="grid grid-cols-7 gap-4 mb-4">
        {weekDates.map((date) => (
          <motion.div
            key={date.toDateString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div
              onClick={() => !isPastDate(date) && handleDateChange(date)}
              className={`cursor-pointer p-2 rounded text-sm ${
                selectedDate === date.toDateString()
                  ? "bg-purple-600 text-white"
                  : isToday(date)
                  ? "bg-blue-500 text-white"
                  : isPastDate(date)
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {formatDate(date)}
            </div>
            {selectedDate === date.toDateString() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                {timeslots.map((time) => {
                  const isBooked = isSlotBooked(date.toDateString(), time);
                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && handleTimeSelect(time)}
                      className={`w-full p-2 rounded-lg mb-2 ${
                        isBooked
                          ? "bg-gray-400 text-white"
                          : selectedTime === time
                          ? "bg-purple-700 text-white"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                      disabled={isBooked}
                    >
                      {time}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {selectedDate && selectedTime && showForm && (
        <AppointmentForm
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setShowForm={setShowForm}
          navigate={navigate}
        />
      )}
    </div>
  );
};
