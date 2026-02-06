from django.contrib.auth import authenticate , login
from django.shortcuts import render, redirect
from educational_products.models import GraduationRequest
from .forms import LoginForm
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages
from .forms import ChangePasswordForm
from django.contrib.auth import logout
from datetime import datetime
from django.contrib.auth.decorators import login_required

def header(request):#partial view
    context = {}
    return render(request,'base/header.html',context)


def home_page(request):
    context = {}
    return render(request,'home_page.html',context)
# AUTH
def login_page(request):
    login_form = LoginForm(request.POST or None)
    if login_form.is_valid():
        userName = login_form.cleaned_data.get('userName')
        password = login_form.cleaned_data.get('password')
        user = authenticate(request, username=userName, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            print('Error')
    context = {
        'login_form' : login_form,
    }
    return render(request,'login_page.html', context)

def user_profile_page(request):
    context = {}
    return render(request,'user_profile_page.html',context)

def exam_schedule(request):
    context = {}
    return render(request,'schedule.html',context)

def change_password(request):
    context = {}
    return render(request,'chage_pass.html',context)


# CURRENT (INCOMPLETE):
def graduation_request(request):
    context = {}
    return render(request, 'request.html', context)


from django.contrib.auth.decorators import login_required
from .forms import LoginForm, GraduationRequestForm  # Make sure to import GraduationRequestForm


@login_required

@login_required
def graduation_request(request):
    if request.method == 'POST':
        form = GraduationRequestForm(request.POST)
        if form.is_valid():
            # ذخیره داده‌ها در مدل GraduationRequest
            graduation_request = form.save(commit=False)
            graduation_request.user = request.user  # مرتبط کردن با کاربر لاگین کرده

            # استفاده از داده‌های فرم
            graduation_request.student_name = form.cleaned_data['student_name']
            graduation_request.student_id = form.cleaned_data['student_id']
            graduation_request.major = form.cleaned_data['major']
            graduation_request.degree = form.cleaned_data['degree']
            graduation_request.graduation_semester = form.cleaned_data['graduation_semester']
            graduation_request.graduation_date = form.cleaned_data['graduation_date']
            graduation_request.thesis_title = form.cleaned_data.get('thesis_title', '')
            graduation_request.supervisor_name = form.cleaned_data.get('supervisor_name', '')
            graduation_request.remarks = form.cleaned_data.get('remarks', '')
            graduation_request.agree_to_terms = form.cleaned_data['agree_to_terms']
            graduation_request.status = 'pending'  # وضعیت اولیه

            graduation_request.save()  # ذخیره در دیتابیس

            # انتقال به صفحه موفقیت با اطلاعات ثبت شده
            return redirect('graduation_success')
    else:
        # Pre-fill form with user data
        initial_data = {
            'student_name': f"{request.user.first_name} {request.user.last_name}"
            if request.user.first_name and request.user.last_name
            else request.user.username,
            'student_id': request.user.username,
        }
        form = GraduationRequestForm(initial=initial_data)

    context = {
        'form': form,
    }
    return render(request, 'request.html', context)

@login_required
def graduation_success(request):
    context = {
        'message': 'درخواست فارغ‌التحصیلی شما با موفقیت ثبت شد.',
        'details': 'درخواست شما در حال بررسی است و نتایج از طریق پنل کاربری اطلاع‌رسانی خواهد شد.'
    }
    return render(request, 'graduation_success.html', context)


@login_required
def my_graduation_requests(request):
    context = {
        'requests': []
    }
    return render(request, 'my_requests.html', context)




@login_required
def change_password(request):
    if request.method == 'POST':
        form = ChangePasswordForm(request.POST)
        if form.is_valid():
            current_password = form.cleaned_data['current_password']
            new_password = form.cleaned_data['new_password']

            # Check current password
            if request.user.check_password(current_password):
                # Change password
                request.user.set_password(new_password)
                request.user.save()

                # Keep user logged in
                update_session_auth_hash(request, request.user)

                # Success message
                messages.success(request, 'رمز عبور شما با موفقیت تغییر یافت.')
                return redirect('home')
            else:
                form.add_error('current_password', 'رمز عبور فعلی اشتباه است.')
    else:
        form = ChangePasswordForm()

    context = {
        'form': form,
    }
    return render(request, 'chage_pass.html', context)




@login_required
def logout_view(request):
    logout(request)
    return redirect('login')





@login_required
def user_profile_page(request):
    # Default empty context
    context = {}

    # Different data for taha
    if request.user.username == 'Taha81':
        context = {
            'student_name': 'طاها شریف',
            'student_id': '401123456789',
            'major': 'مهندسی کامپیوتر',
            'entry_year': '۱۴۰۰',
            'gpa': '17.5',
            'phone': '09123456789',
            'email': 'taha@gmail.com',
            'address': 'کرمان شهرک مظهری',
            'status': 'فعال',
            'field': 'مهندسی نرم‌افزار',
            'advisor': 'دکتر احمدی',
            'units_passed': '۱۳۰',
            'units_current': '۲۰',
            'national_code': '0012345678',
            'birth_date': '۱۳۸۱/۰۵/۱۵',
        }

    # Different data for zohreh
    elif request.user.username == 'Zohreh83':
        context = {
            'student_name': 'زهره حسینی',
            'student_id': '401987654321',
            'major': 'مهندسی کامپیوتر',
            'entry_year': '۱۴۰۱',
            'gpa': '۱۸.۲',
            'phone': '09129876543',
            'email': 'zohreh@gmail.com',
            'address': 'کرمان،خیابان فیروزه',
            'status': 'فعال',
            'field': 'نرمافزار ',
            'advisor': 'دکتر کریمی',
            'units_passed': '۱۴۰',
            'units_current': '۱۸',
            'national_code': '0022334455',
            'birth_date': '۱۳۸۲/۰۸/۲۰',
        }

    return render(request, 'user_profile_page.html', context)


@login_required
def exam_schedule(request):
    exam_schedules = []
    student_info = {}

    # Different data for taha
    if request.user.username == 'Taha81':
        student_info = {
            'name': 'طاها شریف',
            'student_id': '400123456789',
            'major': 'مهندسی کامپیوتر',

        }

        exam_schedules = [
            {
                'course_name': 'پایگاه داده',
                'professor': 'دکتر احمدی',
                'exam_date': '۱۴۰۴/۱۰/۲۵',
                'exam_time': '۸:۳۰',
                'location': 'سالن ۱۰۱',
                'seat_number': 'A12',
                'status': 'تأیید شده'
            },
            {
                'course_name': 'هوش مصنوعی',
                'professor': 'دکتر کریمی',
                'exam_date': '۱۴۰۴/۱۰/۲۸',
                'exam_time': '۱۰:۰۰',
                'location': 'سالن ۲۰۳',
                'seat_number': 'B05',
                'status': 'تأیید شده'
            },
            {
                'course_name': 'شبکه‌های کامپیوتری',
                'professor': 'دکتر محمدی',
                'exam_date': '۱۴۰۴/۱۱/۰۲',
                'exam_time': '۱۳:۳۰',
                'location': 'سالن ۳۰۵',
                'seat_number': 'C18',
                'status': 'تأیید شده'
            },
            {
                'course_name': 'مهندسی نرم‌افزار',
                'professor': 'دکتر رضایی',
                'exam_date': '۱۴۰۴/۱۱/۰۵',
                'exam_time': '۹:۰۰',
                'location': 'سالن ۱۰۲',
                'seat_number': 'D07',
                'status': 'تأیید شده'
            }
        ]

    # Different data for zohreh
    elif request.user.username == 'Zohreh83':
        student_info = {
            'name': 'زهره حسینی',
            'student_id': '401987654321',
            'major': 'مهندسی کامپیوتر',

        }

        exam_schedules = [
            {
                'course_name': 'طراحی الگوریتم',
                'professor': 'دکتر محسنی',
                'exam_date': '۱۴۰۴/۱۰/۲۶',
                'exam_time': '۹:۰۰',
                'location': 'سالن ۳۰۱',
                'seat_number': 'C08',
                'status': 'تأیید شده'
            },
            {
                'course_name': 'برنامه‌نویسی پیشرفته',
                'professor': 'دکتر نوروزی',
                'exam_date': '۱۴۰۴/۱۰/۳۰',
                'exam_time': '۱۴:۳۰',
                'location': 'سالن ۱۰۲',
                'seat_number': 'D15',
                'status': 'تأیید شده'
            },
            {
                'course_name': 'پایگاه داده پیشرفته',
                'professor': 'دکتر جعفری',
                'exam_date': '۱۴۰۴/۱۱/۰۳',
                'exam_time': '۱۱:۰۰',
                'location': 'سالن ۲۰۱',
                'seat_number': 'E22',
                'status': 'تأیید شده'
            },
            {
                'course_name': 'مهندسی اینترنت',
                'professor': 'دکتر امیری',
                'exam_date': '۱۴۰۴/۱۱/۰۷',
                'exam_time': '۱۵:۳۰',
                'location': 'سالن ۴۰۱',
                'seat_number': 'F10',
                'status': 'تأیید شده'
            }
        ]

    context = {
        'exam_schedules': exam_schedules,
        'student_info': student_info,
        'today': datetime.now().strftime("%Y/%m/%d"),
    }

    return render(request, 'schedule.html', context)



@login_required
def my_graduation_requests(request):
    requests = GraduationRequest.objects.filter(user=request.user).order_by('-created_at')

    context = {
        'requests': requests
    }
    return render(request, 'my_requests.html', context)