/**
 * Sidebar Component Logic
 * Handles sidebar toggle and submenu interactions
 */

class SidebarManager {
  constructor() {
    this.sidebarOpen = false;
    this.openSubmenus = {};
    this.init();
  }

  init() {
    // Mobile menu toggle button
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    if (sidebarToggleBtn) {
      sidebarToggleBtn.addEventListener('click', () => {
        this.toggleSidebar();
      });
    }

    // Close sidebar when clicking overlay
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        this.closeSidebar();
      });
    }

    // Initialize submenu toggles
    this.initSubmenus();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar) {
      if (this.sidebarOpen) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('absolute', 'z-40');
      } else {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('absolute', 'z-40');
      }
    }

    if (overlay) {
      if (this.sidebarOpen) {
        overlay.classList.remove('hidden');
      } else {
        overlay.classList.add('hidden');
      }
    }
  }

  closeSidebar() {
    this.sidebarOpen = false;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('absolute', 'z-40');
    }

    if (overlay) {
      overlay.classList.add('hidden');
    }
  }

  initSubmenus() {
    // Find all submenu toggle buttons
    const submenuButtons = document.querySelectorAll('[data-submenu-toggle]');
    submenuButtons.forEach(button => {
      button.addEventListener('click', () => {
        const submenuId = button.getAttribute('data-submenu-toggle');
        this.toggleSubmenu(submenuId, button);
      });
    });
  }

  toggleSubmenu(submenuId, button) {
    const submenu = document.getElementById(`submenu-${submenuId}`);
    const chevronUp = button.querySelector('[data-chevron-up]');
    const chevronDown = button.querySelector('[data-chevron-down]');

    if (submenu) {
      const isOpen = !submenu.classList.contains('hidden');
      
      if (isOpen) {
        submenu.classList.add('hidden');
        if (chevronUp) chevronUp.classList.add('hidden');
        if (chevronDown) chevronDown.classList.remove('hidden');
      } else {
        submenu.classList.remove('hidden');
        if (chevronUp) chevronUp.classList.remove('hidden');
        if (chevronDown) chevronDown.classList.add('hidden');
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SidebarManager();
  });
} else {
  new SidebarManager();
}
