from django import forms
from django.utils import timezone
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class LoginForm(forms.Form):
    userName = forms.CharField(
        label='نام کاربری',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'نام کاربری خود را وارد کنید',
            'dir': 'rtl'
        })
    )

    password = forms.CharField(
        label='رمز عبور',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'رمز عبور خود را وارد کنید',
            'dir': 'rtl'
        })
    )





class GraduationRequestForm(forms.Form):
    # Step 1: Personal Information
    student_name = forms.CharField(
        label='نام و نام خانوادگی',
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'نام و نام خانوادگی خود را وارد کنید',
            'dir': 'rtl'
        })
    )

    student_id = forms.CharField(
        label='شماره دانشجویی',
        max_length=20,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'شماره دانشجویی',
            'dir': 'rtl'
        })
    )

    # Step 2: Academic Information
    major = forms.ChoiceField(
        label='رشته تحصیلی',
        choices=[
            ('computer_science', 'مهندسی کامپیوتر'),
            ('software_engineering', 'مهندسی نرم‌افزار'),
            ('it', 'فناوری اطلاعات'),
            ('ce', 'مهندسی عمران'),
            ('ee', 'مهندسی برق'),
        ],
        widget=forms.Select(attrs={
            'class': 'form-select',
            'dir': 'rtl'
        })
    )

    degree = forms.ChoiceField(
        label='مقطع تحصیلی',
        choices=[
            ('bachelor', 'کارشناسی'),
            ('master', 'کارشناسی ارشد'),
            ('phd', 'دکتری'),
        ],
        widget=forms.Select(attrs={
            'class': 'form-select',
            'dir': 'rtl'
        })
    )

    # Step 3: Graduation Details
    graduation_semester = forms.ChoiceField(
        label='نیمسال فارغ‌التحصیلی',
        choices=[
            ('fall_1402', 'پاییز ۱۴۰۲'),
            ('spring_1403', 'بهار ۱۴۰۳'),
            ('summer_1403', 'تابستان ۱۴۰۳'),
            ('fall_1403', 'پاییز ۱۴۰۳'),
        ],
        widget=forms.Select(attrs={
            'class': 'form-select',
            'dir': 'rtl'
        })
    )

    graduation_date = forms.DateField(
        label='تاریخ پیشنهادی فارغ‌التحصیلی',
        widget=forms.DateInput(attrs={
            'type': 'date',
            'class': 'form-input',
            'dir': 'rtl'
        })
    )

    # Step 4: Additional Information
    thesis_title = forms.CharField(
        label='عنوان پایان‌نامه/پروژه',
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'در صورت وجود وارد کنید',
            'dir': 'rtl'
        })
    )

    supervisor_name = forms.CharField(
        label='نام استاد راهنما',
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'نام استاد راهنما',
            'dir': 'rtl'
        })
    )

    # Step 5: Documents and Remarks
    remarks = forms.CharField(
        label='توضیحات/ملاحظات',
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-textarea',
            'rows': 4,
            'placeholder': 'توضیحات یا ملاحظات خاص',
            'dir': 'rtl'
        })
    )

    agree_to_terms = forms.BooleanField(
        label='با قوانین و مقررات موافقم',
        widget=forms.CheckboxInput(attrs={
            'class': 'form-checkbox'
        })
    )





class ChangePasswordForm(forms.Form):
    current_password = forms.CharField(
        label='رمز عبور فعلی',
        widget=forms.PasswordInput(attrs={
            'class': 'form-input',
            'placeholder': 'رمز عبور فعلی را وارد کنید',
            'dir': 'rtl'
        })
    )

    new_password = forms.CharField(
        label='رمز عبور جدید',
        widget=forms.PasswordInput(attrs={
            'class': 'form-input',
            'placeholder': 'رمز عبور جدید را وارد کنید',
            'dir': 'rtl'
        }),
        validators=[validate_password]
    )

    confirm_password = forms.CharField(
        label='تکرار رمز عبور جدید',
        widget=forms.PasswordInput(attrs={
            'class': 'form-input',
            'placeholder': 'تکرار رمز عبور جدید را وارد کنید',
            'dir': 'rtl'
        })
    )

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get("new_password")
        confirm_password = cleaned_data.get("confirm_password")

        if new_password and confirm_password and new_password != confirm_password:
            raise ValidationError("رمز عبور جدید و تکرار آن مطابقت ندارند")

        return cleaned_data