from django.contrib import admin
from .models import ApartamentDetails

class AirBnBAdmin(admin.ModelAdmin):
    list_display = ('id', 'country', 'city', 'apartment_name', 'price', 'date', 'description', 'image')
    search_fields = ('id', 'country', 'city', 'apartment_name', 'price', 'date', 'description')
    list_filter = ('country', 'city', 'price', 'date')

admin.site.register(ApartamentDetails, AirBnBAdmin)
# Register your models here.

