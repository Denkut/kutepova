import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { loginSuccess } from "../redux/auth-slice"; 
import { User } from "../types/user";
import { userRole } from "../types/user-role";
import { gender } from "../types";

export const Register = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    email: "",
    name: "",
    role: "user" as userRole,
    age: 0,
    isActive: true,
    gender: "female" as gender,
    avatar: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5100/users");
    const users = await response.json();

    const existingUser = users.find(
      (user: User) =>
        user.login === formData.login || user.email === formData.email
    );

    if (existingUser) {
      setError("Пользователь с таким логином или email уже существует.");
      return;
    }

    const newUser = {
      ...formData,
      id: String(Date.now()),
      role: "user" as userRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await fetch("http://localhost:5100/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    localStorage.setItem("user", JSON.stringify(newUser));

    dispatch(loginSuccess(newUser)); 

    setSuccessMessage("Поздравляем с успешной регистрацией!");

    setTimeout(() => {
      navigate("/"); 
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md animate__animated animate__fadeIn animate__delay-1s">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Login:
          </label>
          <input
            type="text"
            name="login"
            value={formData.login}
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
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};
