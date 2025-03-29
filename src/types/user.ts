import { gender } from "./gender";
import { userRole } from "./user-role";

export interface User {
  id: string | null;
  login: string | null;
  password: string | null;
  email: string | null;
  name: string | null;
  role: userRole | null;
  age: number | null;
  isActive: boolean | null;
  gender: gender;
  avatar?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
