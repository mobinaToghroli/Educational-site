import os
import random
from django.db import models


def get_file_extension(file):
    base_name = os.path.basename(file)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image(instance, filename):
    rand_name = random.randint(1, 99999999999999)
    name, ext = get_file_extension(filename)
    # Use a placeholder if instance.id doesn't exist yet
    obj_id = instance.id if instance.id else "new"
    final_name = f"{obj_id}-{instance.name}-{rand_name}{ext}"
    return f"products/{final_name}"

class ProductManager(models.Manager):
    def get_active_products(self):
        return self.get_queryset().filter(active=True)



class Product(models.Model):
    name = models.CharField(max_length=200 , verbose_name='نام دانشجو')
    lastname = models.CharField(max_length=200 , verbose_name='نام خانوادگی دانشجو')
    userid = models.IntegerField(verbose_name='شماره دانشجویی')
    image = models.ImageField(upload_to=upload_image, null=True, blank=True , verbose_name='تصویر')
    actived = models.BooleanField(default=False,verbose_name='فعال/غیرفعال')
    Entered_date = models.DateTimeField(auto_now_add=False , verbose_name='سال ورود')

    def __str__(self):
        return f"{self.name} {self.lastname}"