from django.contrib import admin
from .models import Product
from .models import GraduationRequest

class ProductAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'name','lastname', 'userid','image','actived', 'Entered_date']

    class Meta:
        model = Product
admin.site.register(Product , ProductAdmin)



@admin.register(GraduationRequest)
class GraduationRequestAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'student_id', 'status', 'created_at')
    list_filter = ('status', 'major')