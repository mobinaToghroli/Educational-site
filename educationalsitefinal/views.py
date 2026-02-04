from django.shortcuts import render

def header(request):#partial view
    context = {}
    return render(request,'base/header.html',context)


def home_page(request):
    context = {}
    return render(request,'home_page.html',context)

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