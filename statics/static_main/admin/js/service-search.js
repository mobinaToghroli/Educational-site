/**
 * Service Search Page Logic
 * Handles service search with category filtering
 */

class ServiceSearchManager {
  constructor() {
    this.searchQuery = '';
    this.selectedCategory = 'all';

    this.services = [
      { id: 1, title: 'ثبت نام ترم جدید', category: 'education', description: 'فرآیند ثبت نام برای ترم جدید تحصیلی' },
      { id: 2, title: 'پرداخت هزینه های دانشگاه', category: 'financial', description: 'پرداخت هزینه های تحصیلی و سایر متعلقات' },
      { id: 3, title: 'درخواست اقامت', category: 'dormitory', description: 'درخواست اقامت در خوابگاه دانشجویی' },
      { id: 4, title: 'گواهی اشتغال به تحصیل', category: 'education', description: 'دریافت گواهی اشتغال به تحصیل برای ارائه به مراجع' },
      { id: 5, title: 'تسویه حساب مالی', category: 'financial', description: 'فرآیند تسویه حساب مالی دانشجو' },
      { id: 6, title: 'تغییر رشته', category: 'education', description: 'فرآیند درخواست تغییر رشته تحصیلی' },
      { id: 7, title: 'درخواست وام', category: 'financial', description: 'درخواست وام مالی اضطراری دانشجویان' },
      { id: 8, title: 'رزرو اتاق مطالعه', category: 'dormitory', description: 'رزرو اتاق مطالعه در خوابگاه' },
    ];

    this.init();
  }

  init() {
    this.initSearchInput();
    this.initCategoryButtons();
    this.renderResults();
  }

  initSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderResults();
      });
    }
  }

  initCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        this.selectedCategory = category;
        this.updateCategoryButtons();
        this.renderResults();
      });
    });
  }

  updateCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      const category = button.getAttribute('data-category');
      if (category === this.selectedCategory) {
        button.className = 'category-btn flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white';
      } else {
        button.className = 'category-btn flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600';
      }
    });
  }

  getFilteredServices() {
    let filtered = this.services;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(service =>
        service.title.includes(this.searchQuery) ||
        service.description.includes(this.searchQuery)
      );
    }

    return filtered;
  }

  renderResults() {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const filteredServices = this.getFilteredServices();

    if (this.searchQuery) {
      if (filteredServices.length > 0) {
        resultsContainer.innerHTML = `
          <div class="space-y-4">
            ${filteredServices.map(service => this.renderServiceItem(service)).join('')}
          </div>
        `;
      } else {
        resultsContainer.innerHTML = `
          <div class="text-center py-12">
            <div class="mx-auto bg-gray-100 dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">خدمتی یافت نشد</h3>
            <p class="mt-1 text-gray-500 dark:text-gray-400">
              لطفا نام خدمت یا شماره گزارش را وارد کنید
            </p>
          </div>
        `;
      }
    } else {
      resultsContainer.innerHTML = `
        <div class="text-center py-12">
          <div class="mx-auto bg-gray-100 dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">لطفا نام خدمت یا شماره گزارش را وارد کنید</h3>
          <p class="mt-1 text-gray-500 dark:text-gray-400">
            برای جستجوی سریعتر، از فیلترهای دسته‌بندی استفاده کنید
          </p>
        </div>
      `;
    }
  }

  renderServiceItem(service) {
    const categoryClasses = {
      education: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      financial: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      dormitory: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    };

    const categoryIcons = {
      education: `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>`,
      financial: `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
      dormitory: `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>`
    };

    return `
      <div class="flex items-start p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
        <div class="p-3 rounded-lg ${categoryClasses[service.category]}">
          ${categoryIcons[service.category]}
        </div>
        <div class="mr-4">
          <h3 class="font-medium text-gray-800 dark:text-white">${service.title}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${service.description}</p>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ServiceSearchManager();
  });
} else {
  new ServiceSearchManager();
}
