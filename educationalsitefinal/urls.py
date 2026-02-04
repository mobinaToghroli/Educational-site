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
    graduation_request , login_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_page , name='home'),
    path('header', header , name='header'),
    path('user_profile_page', user_profile_page , name='user_profile_page'),
    path('schedule', exam_schedule , name='schedule'),
    path('change_password', change_password , name='change_password'),
    path('graduation_request', graduation_request , name='graduation_request'),
    path('login', login_page , name='login'),

]
if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
