from rest_framework import viewsets
from .models import Country, City, ApartmentDetails
from .serializers import CountrySerializer, CitySerializer, ApartmentDetailsSerializer
from django.shortcuts import render

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all().order_by('name')
    serializer_class = CountrySerializer

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all().order_by('name')
    serializer_class = CitySerializer

class ApartmentDetailsViewSet(viewsets.ModelViewSet):
    queryset = ApartmentDetails.objects.all()
    serializer_class = ApartmentDetailsSerializer


