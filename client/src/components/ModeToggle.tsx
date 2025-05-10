import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Extend Window interface for our global function
declare global {
  interface Window {
    toggleDarkMode?: () => void;
  }
}

export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Check initial theme on component mount
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Check initial state
    checkTheme();

    // Setup mutation observer to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Manual toggle function if window.toggleDarkMode is not available
  const toggleTheme = () => {
    if (window.toggleDarkMode) {
      window.toggleDarkMode();
    } else {
      // Fallback toggle logic
      const isDarkNow = document.documentElement.classList.contains('dark');
      if (isDarkNow) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      setIsDark(!isDarkNow);
    }
  };

  return (
    <Button 
      id="dark-mode-toggle"
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 focus:outline-none transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}