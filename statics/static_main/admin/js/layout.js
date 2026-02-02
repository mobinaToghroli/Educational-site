/**
 * Layout Manager
 * Handles sidebar toggle from header
 */

class LayoutManager {
  constructor() {
    this.init();
  }

  init() {
    // Listen for sidebar toggle from header
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    if (sidebarToggleBtn) {
      sidebarToggleBtn.addEventListener('click', () => {
        // This will be handled by SidebarManager
        // But we need to update the icon
        const sidebarIcon = document.getElementById('sidebar-icon');
        const sidebarCloseIcon = document.getElementById('sidebar-close-icon');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebar && sidebarIcon && sidebarCloseIcon) {
          const isOpen = !sidebar.classList.contains('hidden');
          if (isOpen) {
            sidebarIcon.classList.remove('hidden');
            sidebarCloseIcon.classList.add('hidden');
          } else {
            sidebarIcon.classList.add('hidden');
            sidebarCloseIcon.classList.remove('hidden');
          }
        }
      });
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LayoutManager();
  });
} else {
  new LayoutManager();
}
