/**
 * Change Password Page Logic
 * Handles password change form with validation and strength meter
 */

class ChangePasswordManager {
  constructor() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.showCurrentPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
    this.passwordStrength = 0;
    this.errors = {};

    this.init();
  }

  init() {
    this.initPasswordToggles();
    this.initFormValidation();
    this.initPasswordStrength();
  }

  initPasswordToggles() {
    // Current password toggle
    const toggleCurrent = document.getElementById('toggle-current-password');
    const currentInput = document.getElementById('currentPassword');
    const eyeCurrent = document.getElementById('eye-current');
    const eyeSlashCurrent = document.getElementById('eye-slash-current');

    if (toggleCurrent && currentInput) {
      toggleCurrent.addEventListener('click', () => {
        this.showCurrentPassword = !this.showCurrentPassword;
        currentInput.type = this.showCurrentPassword ? 'text' : 'password';
        if (eyeCurrent && eyeSlashCurrent) {
          eyeCurrent.classList.toggle('hidden');
          eyeSlashCurrent.classList.toggle('hidden');
        }
      });
    }

    // New password toggle
    const toggleNew = document.getElementById('toggle-new-password');
    const newInput = document.getElementById('newPassword');
    const eyeNew = document.getElementById('eye-new');
    const eyeSlashNew = document.getElementById('eye-slash-new');

    if (toggleNew && newInput) {
      toggleNew.addEventListener('click', () => {
        this.showNewPassword = !this.showNewPassword;
        newInput.type = this.showNewPassword ? 'text' : 'password';
        if (eyeNew && eyeSlashNew) {
          eyeNew.classList.toggle('hidden');
          eyeSlashNew.classList.toggle('hidden');
        }
      });
    }

    // Confirm password toggle
    const toggleConfirm = document.getElementById('toggle-confirm-password');
    const confirmInput = document.getElementById('confirmPassword');
    const eyeConfirm = document.getElementById('eye-confirm');
    const eyeSlashConfirm = document.getElementById('eye-slash-confirm');

    if (toggleConfirm && confirmInput) {
      toggleConfirm.addEventListener('click', () => {
        this.showConfirmPassword = !this.showConfirmPassword;
        confirmInput.type = this.showConfirmPassword ? 'text' : 'password';
        if (eyeConfirm && eyeSlashConfirm) {
          eyeConfirm.classList.toggle('hidden');
          eyeSlashConfirm.classList.toggle('hidden');
        }
      });
    }
  }

  initPasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
      newPasswordInput.addEventListener('input', (e) => {
        this.newPassword = e.target.value;
        this.passwordStrength = this.calculatePasswordStrength(this.newPassword);
        this.updatePasswordStrengthDisplay();
      });
    }
  }

  calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  }

  updatePasswordStrengthDisplay() {
    const strengthText = document.getElementById('strength-text');
    const strengthBar = document.getElementById('strength-bar');
    const newPasswordInput = document.getElementById('newPassword');

    if (!strengthText || !strengthBar) return;

    const strengthLabels = {
      0: 'خیلی ضعیف',
      1: 'ضعیف',
      2: 'متوسط',
      3: 'قوی',
      4: 'خیلی قوی'
    };

    const strengthClasses = {
      0: 'bg-red-500 w-1/5',
      1: 'bg-orange-500 w-2/5',
      2: 'bg-yellow-500 w-3/5',
      3: 'bg-green-500 w-4/5',
      4: 'bg-green-600 w-full'
    };

    strengthText.textContent = strengthLabels[this.passwordStrength] || '';
    strengthBar.className = `h-2 rounded-full ${strengthClasses[this.passwordStrength] || 'bg-red-500 w-1/5'}`;

    // Update border color based on strength
    if (newPasswordInput) {
      if (this.passwordStrength >= 3) {
        newPasswordInput.classList.remove('border-red-300');
        newPasswordInput.classList.add('border-green-300');
      } else if (this.passwordStrength >= 2) {
        newPasswordInput.classList.remove('border-red-300', 'border-green-300');
        newPasswordInput.classList.add('border-yellow-300');
      } else {
        newPasswordInput.classList.remove('border-green-300', 'border-yellow-300');
      }
    }
  }

  initFormValidation() {
    const form = document.getElementById('change-password-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateAndSubmit();
      });
    }
  }

  validateAndSubmit() {
    this.errors = {};
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    this.currentPassword = currentPasswordInput ? currentPasswordInput.value : '';
    this.newPassword = newPasswordInput ? newPasswordInput.value : '';
    this.confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

    // Validate current password
    if (!this.currentPassword) {
      this.errors.currentPassword = 'رمز عبور فعلی الزامی است';
    }

    // Validate new password
    if (!this.newPassword) {
      this.errors.newPassword = 'رمز عبور جدید الزامی است';
    } else if (this.newPassword.length < 8) {
      this.errors.newPassword = 'رمز عبور باید حداقل 8 کاراکتر باشد';
    }

    // Validate confirm password
    if (!this.confirmPassword) {
      this.errors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (this.newPassword !== this.confirmPassword) {
      this.errors.confirmPassword = 'رمز عبور و تکرار آن مطابقت ندارند';
    }

    // Display errors
    this.displayErrors();

    // If no errors, submit
    if (Object.keys(this.errors).length === 0) {
      alert('رمز عبور با موفقیت تغییر یافت!');
      // Reset form
      if (currentPasswordInput) currentPasswordInput.value = '';
      if (newPasswordInput) newPasswordInput.value = '';
      if (confirmPasswordInput) confirmPasswordInput.value = '';
      this.passwordStrength = 0;
      this.updatePasswordStrengthDisplay();
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  displayErrors() {
    // Current password error
    const errorCurrent = document.getElementById('error-current-password');
    const currentInput = document.getElementById('currentPassword');
    if (errorCurrent && currentInput) {
      if (this.errors.currentPassword) {
        errorCurrent.textContent = this.errors.currentPassword;
        errorCurrent.classList.remove('hidden');
        currentInput.classList.add('border-red-300');
        currentInput.classList.remove('border-gray-300', 'dark:border-slate-600');
      } else {
        errorCurrent.classList.add('hidden');
        currentInput.classList.remove('border-red-300');
        currentInput.classList.add('border-gray-300', 'dark:border-slate-600');
      }
    }

    // New password error
    const errorNew = document.getElementById('error-new-password');
    const newInput = document.getElementById('newPassword');
    if (errorNew && newInput) {
      if (this.errors.newPassword) {
        errorNew.textContent = this.errors.newPassword;
        errorNew.classList.remove('hidden');
        newInput.classList.add('border-red-300');
        newInput.classList.remove('border-gray-300', 'dark:border-slate-600');
      } else {
        errorNew.classList.add('hidden');
        newInput.classList.remove('border-red-300');
        newInput.classList.add('border-gray-300', 'dark:border-slate-600');
      }
    }

    // Confirm password error
    const errorConfirm = document.getElementById('error-confirm-password');
    const confirmInput = document.getElementById('confirmPassword');
    if (errorConfirm && confirmInput) {
      if (this.errors.confirmPassword) {
        errorConfirm.textContent = this.errors.confirmPassword;
        errorConfirm.classList.remove('hidden');
        confirmInput.classList.add('border-red-300');
        confirmInput.classList.remove('border-gray-300', 'dark:border-slate-600');
      } else {
        errorConfirm.classList.add('hidden');
        confirmInput.classList.remove('border-red-300');
        confirmInput.classList.add('border-gray-300', 'dark:border-slate-600');
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ChangePasswordManager();
  });
} else {
  new ChangePasswordManager();
}