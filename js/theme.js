/**
 * Theme Management Module
 * Handles dark mode toggle and persistence using localStorage
 */

class ThemeManager {
  constructor() {
    this.darkMode = false;
    this.init();
  }

  init() {
    // Check for saved theme preference in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      this.darkMode = savedDarkMode === 'true';
    }

    // Apply dark mode class to document
    this.applyTheme();
  }

  applyTheme() {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyTheme();
    return this.darkMode;
  }

  getDarkMode() {
    return this.darkMode;
  }
}

// Create global theme manager instance
const themeManager = new ThemeManager();

