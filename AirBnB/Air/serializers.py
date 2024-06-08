from rest_framework import serializers
from .models import Country, City, ApartmentDetails

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class ApartmentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentDetails
        fields = '__all__'