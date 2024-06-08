from django.db import models
from django.http import JsonResponse

class Country(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

def get_cities(request, country_id):
    cities = City.objects.filter(country_id=country_id)
    cities_list = list(cities.values('id', 'name'))
    return JsonResponse(cities_list, safe=False)

class ApartmentDetails(models.Model):
    apartment_name = models.CharField(max_length=60)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    description = models.TextField()
    price = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/apartments')

    def __str__(self):
        return self.apartment_name