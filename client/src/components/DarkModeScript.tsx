import { useEffect } from "react";

export function DarkModeScript() {
  useEffect(() => {
    // Add dark mode toggle script directly to the page
    const script = document.createElement('script');
    script.textContent = `
      // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // Whenever the button is clicked, toggle dark mode
      function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.theme = 'light';
        } else {
          document.documentElement.classList.add('dark');
          localStorage.theme = 'dark';
        }
      }

      // Add event listener to dark mode toggle button
      document.addEventListener('DOMContentLoaded', () => {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
          darkModeToggle.addEventListener('click', toggleDarkMode);
        }
      });

      // Make the function available globally
      window.toggleDarkMode = toggleDarkMode;
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}