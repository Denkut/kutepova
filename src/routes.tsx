import { Routes, Route } from "react-router-dom";
import { PaymentPage } from "./components";
import {
  HomePage,
  AboutPage,
  ServicesPage,
  Contact,
  LoginPage,
  RegisterPage,
} from "./pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
