import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem("darkMode") !== null)
      return (localStorage.getItem("darkMode") === "true");
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.querySelector("html").removeAttribute("data-theme");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);
  return [darkMode, setDarkMode];
}
