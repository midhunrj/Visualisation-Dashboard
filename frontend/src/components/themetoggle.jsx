'use client'

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";


function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return systemPrefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="
        inline-flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-gray-200
        bg-white
        text-gray-700
        shadow-sm
        transition-colors
        hover:bg-gray-100
        hover:text-indigo-600
        dark:border-gray-700
        dark:bg-gray-900
        dark:text-gray-200
        dark:hover:bg-gray-800
        dark:hover:text-indigo-400
      "
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}