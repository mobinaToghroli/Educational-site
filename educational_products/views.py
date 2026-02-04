from django.shortcuts import render
from django.views.generic.list import ListView
from .models import Product
# Create your views here.

class ProductsList(ListView):

    template_name = ''

    def get_queryset(self):
         return Product.objects.get_active_products()