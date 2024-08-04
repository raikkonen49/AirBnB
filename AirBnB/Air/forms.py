from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import ApartmentDetails, Country, City

class ApartmentDetailsForm(forms.ModelForm):
    class Meta:
        model = ApartmentDetails
        fields = '__all__'