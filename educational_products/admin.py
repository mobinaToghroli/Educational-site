from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'name','lastname', 'userid','image','actived', 'Entered_date']

    class Meta:
        model = Product
admin.site.register(Product , ProductAdmin)