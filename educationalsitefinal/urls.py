"""
URL configuration for educationalsitefinal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from educationalsitefinal import settings
from educationalsitefinal.views import home_page, header, user_profile_page, exam_schedule, change_password, \
    graduation_request, login_page, graduation_success, my_graduation_requests, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home', home_page , name='home'),
    path('header', header , name='header'),
    path('user_profile_page', user_profile_page , name='user_profile_page'),
    path('schedule', exam_schedule , name='schedule'),
    path('change_password', change_password , name='change_password'),
    path('', login_page , name='login'),
    path('graduation-request/', graduation_request, name='graduation_request'),
    path('graduation-success/', graduation_success, name='graduation_success'),
    path('my-requests/', my_graduation_requests, name='my_requests'),
    path('logout/', logout_view, name='logout'),

]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
