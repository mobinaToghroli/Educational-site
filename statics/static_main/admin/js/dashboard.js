/**
 * Dashboard Page Logic
 * Handles dashboard data display and notification modal
 */

class DashboardManager {
  constructor() {
    this.userInfo = {
      name: 'امیرمهدی حسینی',
      province: 'سمنان',
      unit: 'سمنان',
      faculty: 'علوم پایه',
      major: 'علوم کامپیوتر',
      term: '5',
      studentNumber: '98412005',
      passedUnits: 68,
      currentTermUnits: 16
    };

    this.termSchedule = [
      { id: 1, course: 'ریاضی عمومی', professor: 'دکتر احمدی', examDate: '1404/10/15', classTime: '8:00 - 10:00', location: 'کلاس 101' },
      { id: 2, course: 'فیزیک پایه', professor: 'دکتر محمدی', examDate: '1404/10/18', classTime: '10:00 - 12:00', location: 'کلاس 205' },
      { id: 3, course: 'شیمی عمومی', professor: 'دکتر رضایی', examDate: '1404/10/20', classTime: '14:00 - 16:00', location: 'کلاس 301' },
      { id: 4, course: 'آمار و احتمال', professor: 'دکتر حسنی', examDate: '1404/10/22', classTime: '16:00 - 18:00', location: 'کلاس 102' },
    ];

    this.notifications = [
      { id: 1, title: 'اعلام نتایج امتحانات میان ترم', date: '1404/08/15', tag: 'جدید', content: 'نتایج امتحانات میان ترم برای تمامی دروس اعلام شده است. دانشجویان می توانند نمرات خود را از طریق سامانه دانشجویی مشاهده نمایند.' },
      { id: 2, title: 'زمان ثبت نام ترم جدید اعلام شد', date: '1404/08/10', tag: 'فوری', content: 'ثبت نام برای ترم جدید از تاریخ 1404/08/20 آغاز خواهد شد. دانشجویان گرامی باید نسبت به ثبت نام به موقع اقدام نمایند.' },
      { id: 3, title: 'برگزاری کارگاه آموزشی زبان تخصصی', date: '1404/08/05', tag: 'اطلاعیه', content: 'کارگاه آموزشی زبان تخصصی برای دانشجویان سال چهارم روزهای شنبه و یکشنبه از ساعت 14 الی 16 در کلاس شماره 3 برگزار می شود.' },
      { id: 4, title: 'تغییر در جدول امتحانات', date: '1404/08/01', tag: 'جدید', content: 'به دلیل تعطیلی رسمی، جدول امتحانات درس ریاضی عمومی به روز دیگری موکول شده است. جدول جدید در بخش اطلاعیه ها قرار گرفته است.' },
      { id: 5, title: 'اعلام هزینه های تحصیلی ترم جدید', date: '1404/07/28', tag: 'مهم', content: 'هزینه های تحصیلی ترم جدید اعلام شد. دانشجویان گرامی می توانند میزان هزینه های خود را از طریق سامانه مشاهده و نسبت به پرداخت آن اقدام نمایند.' },
    ];

    this.init();
  }

  init() {
    this.renderTermSchedule();
    this.renderUserInfo();
    this.renderNotifications();
    this.initModal();
  }

  renderTermSchedule() {
    const tbody = document.getElementById('term-schedule-body');
    if (!tbody) return;

    tbody.innerHTML = this.termSchedule.map(item => `
      <tr class="hover:bg-gray-50 dark:hover:bg-slate-700/50">
        <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${item.course}</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${item.professor}</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${item.examDate}</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${item.classTime}</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${item.location}</td>
      </tr>
    `).join('');
  }

  renderUserInfo() {
    const container = document.getElementById('user-info');
    if (!container) return;

    const infoItems = [
      { label: 'نام و نام خانوادگی', value: this.userInfo.name },
      { label: 'دانشکده', value: this.userInfo.faculty },
      { label: 'رشته', value: this.userInfo.major },
      { label: 'شماره دانشجویی', value: this.userInfo.studentNumber },
      { label: 'تعداد واحد گذرانده', value: this.userInfo.passedUnits },
      { label: 'تعداد واحد ترم جاری', value: this.userInfo.currentTermUnits },
      { label: 'ترم', value: this.userInfo.term },
    ];

    container.innerHTML = infoItems.map((item, index) => `
      <div class="flex justify-between ${index < infoItems.length - 1 ? 'border-b border-gray-100 dark:border-slate-700 pb-2' : ''}">
        <span class="text-sm text-gray-500 dark:text-gray-400">${item.label}</span>
        <span class="text-sm font-medium text-gray-800 dark:text-white">${item.value}</span>
      </div>
    `).join('');
  }

  renderNotifications() {
    const container = document.getElementById('notifications-list');
    if (!container) return;

    container.innerHTML = this.notifications.map(notification => {
      const tagClass = this.getTagClass(notification.tag);
      return `
        <div
          class="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer notification-item"
          data-notification-id="${notification.id}"
        >
          <div class="flex justify-between">
            <h3 class="font-medium text-gray-800 dark:text-white">${notification.title}</h3>
            <span class="px-2 py-1 text-xs rounded-full ${tagClass}">
              ${notification.tag}
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${notification.date}</p>
        </div>
      `;
    }).join('');

    // Add click handlers
    container.querySelectorAll('.notification-item').forEach(item => {
      item.addEventListener('click', () => {
        const notificationId = parseInt(item.getAttribute('data-notification-id'));
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          this.openModal(notification);
        }
      });
    });
  }

  getTagClass(tag) {
    switch (tag) {
      case 'جدید':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'فوری':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'مهم':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  }

  initModal() {
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('notification-modal');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  openModal(notification) {
    const modal = document.getElementById('notification-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalDate = document.getElementById('modal-date');
    const modalContent = document.getElementById('modal-content');

    if (modal && modalTitle && modalTag && modalDate && modalContent) {
      modalTitle.textContent = notification.title;
      modalTag.textContent = notification.tag;
      modalTag.className = `px-2 py-1 text-xs rounded-full ${this.getTagClass(notification.tag)}`;
      modalDate.textContent = notification.date;
      modalContent.textContent = notification.content;
      modal.classList.remove('hidden');
    }
  }

  closeModal() {
    const modal = document.getElementById('notification-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
  });
} else {
  new DashboardManager();
}
