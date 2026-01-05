/**
 * Graduation Request Page Logic
 * Handles multi-step form wizard
 */

class GraduationRequestManager {
  constructor() {
    this.currentStep = 1;
    this.comments = '';
    this.totalUnits = 140;
    this.completedUnits = 135;
    this.remainingUnits = this.totalUnits - this.completedUnits;

    this.steps = [
      { id: 1, title: 'بررسی واحدهای گذرانده', icon: 'academic' },
      { id: 2, title: 'تسویه حساب مالی', icon: 'currency' },
      { id: 3, title: 'ثبت نهایی درخواست', icon: 'check' },
    ];

    this.init();
  }

  init() {
    this.renderStepper();
    this.renderStepContent();
    this.initButtons();
  }

  renderStepper() {
    const stepper = document.getElementById('stepper');
    if (!stepper) return;

    stepper.innerHTML = this.steps.map((step, index) => {
      const isActive = this.currentStep >= step.id;
      const isCompleted = this.currentStep > step.id;
      const iconSvg = this.getIconSvg(step.icon);

      return `
        <div class="flex items-center w-full">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center ${
              isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-500'
            }">
              ${iconSvg}
            </div>
            <span class="mt-2 text-sm font-medium ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
            }">
              ${step.title}
            </span>
          </div>
          ${index < this.steps.length - 1 ? `
            <div class="flex-1 h-0.5 mx-4 ${
              isCompleted ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-700'
            }"></div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  getIconSvg(iconType) {
    const iconClass = 'h-6 w-6';
    switch (iconType) {
      case 'academic':
        return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>`;
      case 'currency':
        return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
      case 'check':
        return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
      default:
        return '';
    }
  }

  renderStepContent() {
    const content = document.getElementById('step-content');
    if (!content) return;

    switch (this.currentStep) {
      case 1:
        content.innerHTML = this.renderStep1();
        break;
      case 2:
        content.innerHTML = this.renderStep2();
        break;
      case 3:
        content.innerHTML = this.renderStep3();
        break;
    }
  }

  renderStep1() {
    const progress = (this.completedUnits / this.totalUnits) * 100;
    return `
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">بررسی واحدهای گذرانده</h2>
        
        <div class="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-700 dark:text-gray-300">واحدهای گذرانده شده</span>
            <span class="font-medium text-gray-800 dark:text-white">${this.completedUnits}/${this.totalUnits}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5">
            <div class="bg-indigo-600 h-2.5 rounded-full" style="width: ${progress}%"></div>
          </div>
          <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ${this.remainingUnits > 0 
              ? `شما هنوز ${this.remainingUnits} واحد دیگر برای فارغ‌التحصیلی نیاز دارید.` 
              : 'تبریک! شما تمام واحدهای مورد نیاز را گذرانده‌اید.'}
          </div>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 class="font-medium text-yellow-800 dark:text-yellow-200">نکات مهم:</h3>
          <ul class="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc pr-5 space-y-1">
            <li>حداقل معدل لازم برای فارغ‌التحصیلی 12.00 است</li>
            <li>تمام دروس تخصصی باید با معدل قبولی گذرانده شوند</li>
            <li>تسویه حساب مالی الزامی است</li>
          </ul>
        </div>
      </div>
    `;
  }

  renderStep2() {
    return `
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">تسویه حساب مالی</h2>
        
        <div class="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-700 dark:text-gray-300">وضعیت حساب مالی:</span>
            <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-medium">
              تسویه شده
            </span>
          </div>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">مبلغ وام:</span>
              <span class="text-gray-800 dark:text-white">۰ ریال</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">بدهی دانشگاه:</span>
              <span class="text-gray-800 dark:text-white">۰ ریال</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">مبلغ پرداختی:</span>
              <span class="text-gray-800 dark:text-white">۲,۵۰۰,۰۰۰ ریال</span>
            </div>
          </div>
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 class="font-medium text-green-800 dark:text-green-200">وضعیت تسویه:</h3>
          <p class="mt-2 text-sm text-green-700 dark:text-green-300">
            حساب مالی شما کاملاً تسویه شده است و هیچ گونه بدهی یا وامی ندارید.
          </p>
        </div>
      </div>
    `;
  }

  renderStep3() {
    return `
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">ثبت نهایی درخواست</h2>
        
        <div class="space-y-4">
          <div>
            <label for="comments" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              توضیحات (اختیاری)
            </label>
            <textarea
              id="comments"
              rows="4"
              class="rtl-input block w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="توضیحات اضافی در خصوص درخواست خود را بنویسید..."
            >${this.comments}</textarea>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 class="font-medium text-blue-800 dark:text-blue-200">خلاصه درخواست:</h3>
            <ul class="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li class="flex items-center">
                <svg class="h-4 w-4 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                بررسی واحدهای گذرانده: تایید شده
              </li>
              <li class="flex items-center">
                <svg class="h-4 w-4 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                تسویه حساب مالی: تایید شده
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  initButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 1) {
          this.currentStep--;
          this.updateView();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.steps.length) {
          this.currentStep++;
          this.updateView();
        } else {
          this.handleSubmit();
        }
      });
    }
  }

  updateView() {
    this.renderStepper();
    this.renderStepContent();
    this.updateButtons();
  }

  updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
      if (this.currentStep === 1) {
        prevBtn.disabled = true;
        prevBtn.className = 'px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed';
      } else {
        prevBtn.disabled = false;
        prevBtn.className = 'px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600';
      }
    }

    if (nextBtn) {
      if (this.currentStep < this.steps.length) {
        nextBtn.innerHTML = `
          بعدی
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        `;
      } else {
        nextBtn.innerHTML = 'ثبت نهایی درخواست';
        nextBtn.className = 'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700';
      }
    }

    // Update comments if in step 3
    if (this.currentStep === 3) {
      const commentsInput = document.getElementById('comments');
      if (commentsInput) {
        commentsInput.addEventListener('input', (e) => {
          this.comments = e.target.value;
        });
      }
    }
  }

  handleSubmit() {
    const commentsInput = document.getElementById('comments');
    if (commentsInput) {
      this.comments = commentsInput.value;
    }
    
    alert('درخواست فارغ‌التحصیلی با موفقیت ثبت شد!');
    // Reset form or redirect
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new GraduationRequestManager();
  });
} else {
  new GraduationRequestManager();
}
