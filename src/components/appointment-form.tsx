import React, { useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { complaintsList } from "../constants"; // Импортируем из файла
import { AppointmentFormProps, FormFields } from "../types";

// Схема валидации с использованием Yup
const schema = yup
  .object({
    name: yup.string().required("Имя обязательно для заполнения."),
    complaint: yup.string().required("Жалоба обязательна."),
    age: yup
      .number()
      .typeError("Возраст должен быть числом.")
      .required("Возраст обязателен.")
      .positive("Возраст не может быть отрицательным."),
    phone: yup
      .string()
      .matches(/^\+7\d{10}$/, "Телефон должен быть в формате +7XXXXXXXXXX.")
      .required("Телефон обязателен."),
  })
  .required();

const ComplaintSelect: React.FC<{
  selectedComplaint: string;
  onChange: (value: string) => void;
  errors: FieldErrors<FormFields>;
}> = ({ selectedComplaint, onChange, errors }) => {
  return (
    <div className="mt-4">
      <label
        htmlFor="complaint"
        className="block text-sm font-medium text-gray-700"
      >
        Укажите свои жалобы
      </label>
      <select
        id="complaint"
        className="w-full mt-1 p-2 border border-gray-300 rounded"
        onChange={(e) => onChange(e.target.value)}
        value={selectedComplaint}
      >
        <option value="" disabled>
          Выберите жалобу
        </option>
        {complaintsList.map((complaint, index) => (
          <option key={index} value={complaint}>
            {complaint}
          </option>
        ))}
      </select>
      {errors.complaint && (
        <p className="text-red-500">{errors.complaint.message}</p>
      )}
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  id: keyof FormFields;
  type: string;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  placeholder?: string;
}> = ({ label, id, type, register, errors, placeholder }) => (
  <div className="mt-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      {...register(id)}
      id={id}
      type={type}
      className="w-full mt-1 p-2 border border-gray-300 rounded"
      placeholder={placeholder}
    />
    {errors[id] && <p className="text-red-500">{errors[id].message}</p>}
  </div>
);

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDate,
  selectedTime,
  setShowForm,
  navigate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  const [isOtherComplaint, setIsOtherComplaint] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [otherComplaintText, setOtherComplaintText] = useState("");

  const onSubmit = (data: FormFields) => {
    // Если выбрана опция "Другое", заменяем жалобу на введенный текст
    if (selectedComplaint === "Другое") {
      data.complaint = otherComplaintText;
    }

    // Логика отправки данных
    console.log("Данные отправлены:", data);
    navigate("/payment");
  };

  const handleComplaintChange = (value: string) => {
    setSelectedComplaint(value);
    if (value === "Другое") {
      setIsOtherComplaint(true);
    } else {
      setIsOtherComplaint(false);
      setValue("complaint", value); // Устанавливаем выбранную жалобу в форму
    }
  };

  const handleOtherComplaintChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherComplaintText(e.target.value);
    setValue("complaint", e.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold">
          Вы выбрали {selectedDate} в {selectedTime}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <InputField
            label="Имя"
            id="name"
            type="text"
            register={register}
            errors={errors}
          />
          <ComplaintSelect
            selectedComplaint={selectedComplaint}
            onChange={handleComplaintChange}
            errors={errors}
          />

          {/* Если выбрана опция "Другое", показываем поле для ввода */}
          {isOtherComplaint && (
            <div className="mt-4">
              <label
                htmlFor="otherComplaint"
                className="block text-sm font-medium text-gray-700"
              >
                Напишите основную жалобу
              </label>
              <input
                id="otherComplaint"
                type="text"
                value={otherComplaintText}
                onChange={handleOtherComplaintChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <InputField
            label="Возраст"
            id="age"
            type="number"
            register={register}
            errors={errors}
          />

          <InputField
            label="Телефон"
            id="phone"
            type="tel"
            register={register}
            errors={errors}
            placeholder="+7"
          />

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Закрыть
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Подтвердить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
