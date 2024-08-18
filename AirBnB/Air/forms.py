from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import ApartmentDetails, Country, City

class ApartmentDetailsForm(forms.ModelForm):
    check_in_date = forms.DateField(input_formats=['%d/%m/%Y'])
    check_out_date = forms.DateField(input_formats=['%d/%m/%Y'])

    class Meta:
        model = ApartmentDetails
        fields = '__all__'
