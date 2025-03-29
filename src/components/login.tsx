import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/auth-slice"; 
import { User } from "../types/user";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5100/users");
    const users: User[] = await response.json();

    const user = users.find(
      (user) =>
        user.login === loginData.login && user.password === loginData.password
    );

    if (user) {
      dispatch(loginSuccess(user)); 
      navigate("/");
    } else {
      setError("Неверный логин или пароль. Попробуйте снова.");
      dispatch(loginFailure("Неверный логин или пароль")); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Login:
          </label>
          <input
            type="text"
            name="login"
            value={loginData.login}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Нет аккаунта?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
