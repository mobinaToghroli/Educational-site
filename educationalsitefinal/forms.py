from django import forms

class LoginForm(forms.Form):
    userName = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'enter your username'})
    )

    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'enter your passowrd'})
    )