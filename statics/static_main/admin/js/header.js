/**
 * Header Component Logic
 * Handles header interactions including dark mode toggle and user dropdown
 */

class HeaderManager {
  constructor() {
    this.userDropdownOpen = false;
    this.init();
  }

  init() {
    // Dark mode toggle button
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => {
        const isDark = themeManager.toggleDarkMode();
        this.updateDarkModeIcon(isDark);
      });
    }

    // User dropdown toggle
    const userDropdownBtn = document.getElementById('user-dropdown-btn');
    if (userDropdownBtn) {
      userDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleUserDropdown();
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#user-dropdown')) {
        this.closeUserDropdown();
      }
    });

    // Initialize dark mode icon
    this.updateDarkModeIcon(themeManager.getDarkMode());
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) {
      if (this.userDropdownOpen) {
        dropdown.classList.remove('hidden');
      } else {
        dropdown.classList.add('hidden');
      }
    }
  }

  closeUserDropdown() {
    this.userDropdownOpen = false;
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  }

  updateDarkModeIcon(isDark) {
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    
    if (darkIcon && lightIcon) {
      if (isDark) {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
      } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
  });
} else {
  new HeaderManager();
}