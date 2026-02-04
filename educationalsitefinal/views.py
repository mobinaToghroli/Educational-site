from django.contrib.auth import authenticate , login
from django.shortcuts import render, redirect
from .forms import LoginForm
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
            return redirect('/')
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

def graduation_request(request):
    context = {}
    return render(request,'request.html',context)