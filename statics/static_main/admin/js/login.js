/**
 * Login Page Logic
 * Handles login form submission and CAPTCHA generation
 */

class LoginManager {
  constructor() {
    this.captchaText = this.generateCaptcha();
    this.init();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  init() {
    // Display CAPTCHA
    const captchaDisplay = document.getElementById('captcha-display');
    if (captchaDisplay) {
      captchaDisplay.textContent = this.captchaText;
    }

    // Handle form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  handleSubmit() {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Validate CAPTCHA
    if (captcha !== this.captchaText) {
      alert('کد امنیتی اشتباه است');
      // Regenerate CAPTCHA
      this.captchaText = this.generateCaptcha();
      const captchaDisplay = document.getElementById('captcha-display');
      if (captchaDisplay) {
        captchaDisplay.textContent = this.captchaText;
      }
      return;
    }

    // Login logic here
    console.log({ userId, password, captcha, rememberMe });
    
    // Redirect to dashboard on success
    window.location.href = 'dashboard.html';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
  });
} else {
  new LoginManager();
}
