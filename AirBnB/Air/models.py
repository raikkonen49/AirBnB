from django.db import models
from django_countries.fields import CountryField

class ApartamentDetails(models.Model):
    apartment_name = models.CharField(max_length=60)
    description = models.CharField(max_length=60)
    country = CountryField()
    city = models.CharField(max_length=60)
    price = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/logo')

    def __str__(self):
        return self.apartment_name