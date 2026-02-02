/**
 * Exam Schedule Page Logic
 * Handles exam schedule display and print functionality
 */

class ExamScheduleManager {
  constructor() {
    this.examSchedule = [
      { id: 1, course: 'ریاضی عمومی', professor: 'دکتر احمدی', examDate: '1402/10/15', examTime: '8:00 - 10:00', location: 'سالن ۱۰۱', seatNo: '25', status: 'upcoming' },
      { id: 2, course: 'فیزیک پایه', professor: 'دکتر محمدی', examDate: '1402/10/18', examTime: '10:00 - 12:00', location: 'سالن ۲۰۲', seatNo: '30', status: 'upcoming' },
      { id: 3, course: 'شیمی عمومی', professor: 'دکتر رضایی', examDate: '1402/10/20', examTime: '14:00 - 16:00', location: 'آزمایشگاه شیمی', seatNo: '15', status: 'upcoming' },
      { id: 4, course: 'آمار و احتمال', professor: 'دکتر حسنی', examDate: '1402/10/22', examTime: '16:00 - 18:00', location: 'سالن ۳۰۳', seatNo: '40', status: 'done' },
      { id: 5, course: 'ریاضی مهندسی', professor: 'دکتر کریمی', examDate: '1402/10/25', examTime: '9:00 - 11:00', location: 'سالن ۱۰۵', seatNo: '20', status: 'upcoming' },
      { id: 6, course: 'معادلات دیفرانسیل', professor: 'دکتر علیزاده', examDate: '1402/10/28', examTime: '13:00 - 15:00', location: 'سالن ۲۰۴', seatNo: '35', status: 'upcoming' },
    ];

    this.studentInfo = {
      name: 'علی محمدی',
      studentNumber: '98123456',
      major: 'مهندسی کامپیوتر',
      faculty: 'دانشکده فنی و مهندسی',
      term: '4021'
    };

    this.init();
  }

  init() {
    this.renderStudentInfo();
    this.renderExamSchedule();
    this.initPrintButton();
  }

  renderStudentInfo() {
    const container = document.getElementById('student-info');
    if (!container) return;

    container.innerHTML = `
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">اطلاعات دانشجو</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2 text-sm">
        <div class="flex flex-col">
          <span class="text-gray-500 dark:text-gray-400">نام دانشجو</span>
          <span class="font-medium text-gray-800 dark:text-white">${this.studentInfo.name}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-500 dark:text-gray-400">شماره دانشجویی</span>
          <span class="font-medium text-gray-800 dark:text-white">${this.studentInfo.studentNumber}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-500 dark:text-gray-400">رشته</span>
          <span class="font-medium text-gray-800 dark:text-white">${this.studentInfo.major}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-500 dark:text-gray-400">دانشکده</span>
          <span class="font-medium text-gray-800 dark:text-white">${this.studentInfo.faculty}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-500 dark:text-gray-400">ترم</span>
          <span class="font-medium text-gray-800 dark:text-white">${this.studentInfo.term}</span>
        </div>
      </div>
    `;
  }

  renderExamSchedule() {
    const tbody = document.getElementById('exam-schedule-body');
    if (!tbody) return;

    tbody.innerHTML = this.examSchedule.map(exam => {
      const statusClass = exam.status === 'upcoming' 
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      const statusText = exam.status === 'upcoming' ? 'آینده' : 'تکمیل شده';

      return `
        <tr class="hover:bg-gray-50 dark:hover:bg-slate-700/50">
          <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${exam.course}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${exam.professor}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${exam.examDate}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${exam.examTime}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${exam.location}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${exam.seatNo}</td>
          <td class="px-4 py-3 whitespace-nowrap">
            <span class="px-2 py-1 text-xs rounded-full ${statusClass}">
              ${statusText}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  initPrintButton() {
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ExamScheduleManager();
  });
} else {
  new ExamScheduleManager();
}
