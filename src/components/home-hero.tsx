import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HomeHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 container mx-auto flex flex-col justify-center items-center h-full text-center px-6"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        Ваш персональный{" "}
        <span className="text-purple-400">гинеколог-сексолог</span>
      </h1>
      <p className="mt-4 text-gray-300 text-lg max-w-2xl">
        Помогаю женщинам заботиться о здоровье и улучшать качество жизни.
      </p>
      <Link
        to="/contact"
        className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-purple-700 transition-all"
      >
        Записаться на консультацию
      </Link>
    </motion.div>
  );
};

