from django import forms
from django.utils import timezone
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from educational_products.models import GraduationRequest


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


class GraduationRequestForm(forms.ModelForm):
    class Meta:
        model = GraduationRequest
        fields = [
            'student_name', 'student_id', 'major', 'degree',
            'graduation_semester', 'graduation_date', 'thesis_title',
            'supervisor_name', 'remarks', 'agree_to_terms'
        ]

        # Defining widgets here is the "Django Way" for ModelForms
        widgets = {
            'student_name': forms.TextInput(
                attrs={'class': 'form-input', 'placeholder': 'نام و نام خانوادگی خود را وارد کنید', 'dir': 'rtl'}),
            'student_id': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'شماره دانشجویی', 'dir': 'rtl'}),
            'major': forms.Select(attrs={'class': 'form-select', 'dir': 'rtl'}),
            'degree': forms.Select(attrs={'class': 'form-select', 'dir': 'rtl'}),
            'graduation_semester': forms.Select(attrs={'class': 'form-select', 'dir': 'rtl'}),
            'graduation_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-input', 'dir': 'rtl'}),
            'thesis_title': forms.TextInput(
                attrs={'class': 'form-input', 'placeholder': 'در صورت وجود وارد کنید', 'dir': 'rtl'}),
            'supervisor_name': forms.TextInput(
                attrs={'class': 'form-input', 'placeholder': 'نام استاد راهنما', 'dir': 'rtl'}),
            'remarks': forms.Textarea(
                attrs={'class': 'form-textarea', 'rows': 4, 'placeholder': 'توضیحات یا ملاحظات خاص', 'dir': 'rtl'}),
            'agree_to_terms': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
        }

    # Custom Validation (Software Engineering professors love this)
    def clean_graduation_date(self):
        graduation_date = self.cleaned_data.get('graduation_date')
        if graduation_date and graduation_date < timezone.now().date():
            raise forms.ValidationError("تاریخ فارغ‌التحصیلی نمی‌تواند در گذشته باشد.")
        return graduation_date




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