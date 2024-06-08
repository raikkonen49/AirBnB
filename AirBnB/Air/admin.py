from django.contrib import admin
from .models import ApartmentDetails, City, Country
from .forms import ApartmentDetailsForm

@admin.register(ApartmentDetails)
class ApartmentDetailsAdmin(admin.ModelAdmin):
    form = ApartmentDetailsForm
    list_display = ('apartment_name', 'country', 'city', 'price', 'date')
    search_fields = ('apartment_name', 'country__name', 'city__name')
    list_filter = ('country', 'city')

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country')
    search_fields = ('name', 'country__name')
    list_filter = ('country',)

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)