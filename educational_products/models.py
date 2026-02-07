import os
import random
from django.db import models
from django.contrib.auth.models import User


def get_file_extension(file):
    base_name = os.path.basename(file)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image(instance, filename):
    rand_name = random.randint(1, 99999999999999)
    name, ext = get_file_extension(filename)
    obj_id = instance.id if instance.id else "new"
    final_name = f"{obj_id}-{instance.name}-{rand_name}{ext}"
    return f"products/{final_name}"


class ProductManager(models.Manager):
    def get_active_products(self):
        # اصلاح شد: نام فیلد در مدل actived است، پس اینجا هم باید actived باشد
        return self.get_queryset().filter(actived=True)


class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name='نام دانشجو')
    lastname = models.CharField(max_length=200, verbose_name='نام خانوادگی دانشجو')
    userid = models.IntegerField(verbose_name='شماره دانشجویی')
    image = models.ImageField(upload_to=upload_image, null=True, blank=True, verbose_name='تصویر')
    actived = models.BooleanField(default=False, verbose_name='فعال/غیرفعال')
    Entered_date = models.DateTimeField(auto_now_add=False, verbose_name='سال ورود')

    objects = ProductManager()

    def __str__(self):
        return f"{self.name} {self.lastname}"


class GraduationRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'در انتظار بررسی'),
        ('approved', 'تأیید شده'),
        ('rejected', 'رد شده'),
        ('need_correction', 'نیاز به اصلاح'),
    ]

    DEGREE_CHOICES = [
        ('bachelor', 'کارشناسی'),
        ('master', 'کارشناسی ارشد'),
        ('phd', 'دکتری'),
    ]

    MAJOR_CHOICES = [
        ('computer_science', 'مهندسی کامپیوتر'),
        ('software_engineering', 'مهندسی نرم‌افزار'),
        ('it', 'فناوری اطلاعات'),
        ('ce', 'مهندسی عمران'),
        ('ee', 'مهندسی برق'),
    ]

    SEMESTER_CHOICES = [
        ('fall_1404', 'پاییز ۱۴۰۴'),
        ('spring_1405', 'بهار ۱۴۰۵'),
        ('summer_1405', 'تابستان ۱۴۰۵'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='کاربر')
    student_name = models.CharField(max_length=100, verbose_name='نام و نام خانوادگی')
    student_id = models.CharField(max_length=20, verbose_name='شماره دانشجویی')
    major = models.CharField(max_length=50, choices=MAJOR_CHOICES, verbose_name='رشته تحصیلی')
    degree = models.CharField(max_length=20, choices=DEGREE_CHOICES, verbose_name='مقطع تحصیلی')

    # اصلاح شد: فقط یک بار تعریف با استفاده از choices
    graduation_semester = models.CharField(
        max_length=50,
        choices=SEMESTER_CHOICES,
        verbose_name='نیمسال فارغ‌التحصیلی'
    )

    graduation_date = models.DateField(verbose_name='تاریخ پیشنهادی فارغ‌التحصیلی')
    thesis_title = models.CharField(max_length=200, blank=True, verbose_name='عنوان پایان‌نامه/پروژه')
    supervisor_name = models.CharField(max_length=100, blank=True, verbose_name='نام استاد راهنما')
    remarks = models.TextField(blank=True, verbose_name='توضیحات/ملاحظات')
    agree_to_terms = models.BooleanField(default=False, verbose_name='موافقت با قوانین')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='وضعیت')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='آخرین ویرایش')

    class Meta:
        verbose_name = 'درخواست فارغ‌التحصیلی'
        verbose_name_plural = 'درخواست‌های فارغ‌التحصیلی'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student_name} - {self.get_status_display()}"




class ExamSchedule(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exam_schedules')
    course_name = models.CharField(max_length=200, verbose_name='نام درس')
    professor = models.CharField(max_length=100, verbose_name='استاد')
    exam_date = models.CharField(max_length=20, verbose_name='تاریخ امتحان')
    exam_time = models.TimeField(verbose_name='ساعت امتحان')
    location = models.CharField(max_length=100, verbose_name='مکان')
    seat_number = models.CharField(max_length=20, verbose_name='شماره صندلی')
    status = models.CharField(max_length=50, default='تأیید شده', verbose_name='وضعیت')

    class Meta:
        verbose_name = 'برنامه امتحانی'
        verbose_name_plural = 'برنامه‌های امتحانی'
        ordering = ['exam_date', 'exam_time']

    def __str__(self):
        return f"{self.course_name} - {self.student.username}"


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, verbose_name='شماره دانشجویی')
    major = models.CharField(max_length=100, verbose_name='رشته تحصیلی')
    entry_year = models.IntegerField(verbose_name='سال ورود')
    gpa = models.FloatField(verbose_name='معدل', default=0.0)
    phone = models.CharField(max_length=15, blank=True, verbose_name='تلفن همراه')
    email = models.EmailField(verbose_name='ایمیل')
    address = models.TextField(blank=True, verbose_name='آدرس')
    guide_professor = models.CharField(max_length=100, verbose_name='استاد راهنما')
    units = models.IntegerField(verbose_name='واحد های گذرانده')

    class Meta:
        verbose_name = 'پروفایل دانشجو'
        verbose_name_plural = 'پروفایل‌های دانشجویی'

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.student_id}"
