/**
 * Profile Page Logic
 * Displays student profile information
 */

class ProfileManager {
  constructor() {
    this.studentInfo = {
      name: 'علی حسینی',
      studentId: '401123456789',
      field: 'علوم کامپیوتر',
      faculty: 'دانشکده علوم پایه',
      unit: 'واحد سمنان',
      province: 'سمنان',
      email: 'amirmahdi.hosseini@example.com',
      phone: '0912-123-4567',
      term: '4011',
      gpa: '17.25',
    };

    this.init();
  }

  init() {
    this.renderProfile();
  }

  renderProfile() {
    // Render header info
    const studentName = document.getElementById('student-name');
    const studentId = document.getElementById('student-id');
    const termBadge = document.getElementById('term-badge');
    const gpaBadge = document.getElementById('gpa-badge');

    if (studentName) studentName.textContent = this.studentInfo.name;
    if (studentId) studentId.textContent = `شماره دانشجویی: ${this.studentInfo.studentId}`;
    if (termBadge) termBadge.textContent = `${this.studentInfo.term} - ترم جاری`;
    if (gpaBadge) gpaBadge.textContent = `معدل: ${this.studentInfo.gpa}`;

    // Render academic info
    const academicInfo = document.getElementById('academic-info');
    if (academicInfo) {
      academicInfo.innerHTML = `
        <div class="flex items-center">
          <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">رشته</p>
            <p class="font-medium text-gray-800 dark:text-white">${this.studentInfo.field}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">دانشکده</p>
            <p class="font-medium text-gray-800 dark:text-white">${this.studentInfo.faculty}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">واحد</p>
            <p class="font-medium text-gray-800 dark:text-white">${this.studentInfo.unit}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">استان</p>
            <p class="font-medium text-gray-800 dark:text-white">${this.studentInfo.province}</p>
          </div>
        </div>
      `;
    }

    // Render contact info
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
      contactInfo.innerHTML = `
        <div class="flex items-center">
          <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">ایمیل</p>
            <p class="font-medium text-gray-800 dark:text-white">${this.studentInfo.email}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">تلفن</p>
            <p class="font-medium text-gray-800 dark:text-white">${this.studentInfo.phone}</p>
          </div>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
  });
} else {
  new ProfileManager();
}