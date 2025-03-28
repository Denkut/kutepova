import React from "react";
import { useNavigate } from "react-router-dom";

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Имитация успешной оплаты
    setTimeout(() => {
      alert("Оплата прошла успешно!");
      navigate("/"); // Перенаправляем на главную страницу после оплаты
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center">
          Оплата консультации
        </h2>
        <p className="text-gray-600 text-center mt-2">Выберите способ оплаты</p>

        <div className="mt-4 flex flex-col gap-3">
          <button
            onClick={handlePayment}
            className="w-full px-4 py-2 bg-green-600 text-white rounded"
          >
            Оплатить картой
          </button>
          <button
            onClick={handlePayment}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
          >
            Оплатить через СБП
          </button>
        </div>
      </div>
    </div>
  );
};

