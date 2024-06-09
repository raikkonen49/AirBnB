from rest_framework import serializers
from .models import ApartmentDetails, Country, City

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['name']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name']

class ApartmentDetailsSerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(
        queryset=Country.objects.all(),
        slug_field='name',
        required=False
    )
    city = serializers.SlugRelatedField(
        queryset=City.objects.all(),
        slug_field='name',
        required=False
    )

    class Meta:
        model = ApartmentDetails
        fields = ['id', 'apartment_name', 'country', 'city', 'description', 'price', 'date', 'image']