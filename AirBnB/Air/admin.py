from django.contrib import admin
from django import forms
from .models import ApartmentDetails, City, Country

class ApartmentDetailsAdminForm(forms.ModelForm):
    description = forms.CharField(widget=forms.Textarea(attrs={'class': 'wysiwyg'}))
    class Meta:
        model = ApartmentDetails
        fields = '__all__'
@admin.register(ApartmentDetails)
class ApartmentDetailsAdmin(admin.ModelAdmin):
    form = ApartmentDetailsAdminForm
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
