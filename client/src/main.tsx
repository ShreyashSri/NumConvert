import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";

// Set the theme on body
const getTheme = () => {
  const storedTheme = localStorage.getItem("numconvert-theme");
  if (storedTheme) {
    return storedTheme;
  }
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const theme = getTheme();

// Apply theme to document
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme={theme as "light" | "dark" | "system"} storageKey="numconvert-theme">
    <App />
  </ThemeProvider>
);
