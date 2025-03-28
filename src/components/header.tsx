import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Иконки для темы

export const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-black text-white p-4 shadow-lg transition-all duration-500">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-wide">
            Кутепова Дарья Сергеевна
          </h1>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              Обо мне
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:underline">
              Услуги
            </Link>
          </li>
        </ul>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 transition-all"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </nav>
    </header>
  );
};
