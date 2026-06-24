import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem("darkMode") !== null)
      return (localStorage.getItem("darkMode") === "true");
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "true");
    } else {
      root.removeAttribute("data-theme");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);
  return [darkMode, setDarkMode];
}
