import axios from "axios";

const API_URL = "http://localhost:5100/users";

export const loginUser = async (login: string, password: string) => {
  const response = await axios.get(
    `${API_URL}?login=${login}&password=${password}`
  );
  return response.data[0];
};

export const registerUser = async (user: {
  login: string;
  password: string;
  email: string;
  name: string;
  role: string;
  age: number;
  gender: string;
  avatar: string;
}) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
