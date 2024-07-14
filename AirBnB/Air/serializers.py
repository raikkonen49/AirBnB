from rest_framework import serializers
from .models import ApartmentDetails, Country, City
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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
        fields = ['id', 'apartment_name', 'country', 'city', 'address', 'description', 'price', 'date', 'image']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return {'user': user}
        raise serializers.ValidationError('Incorrect credentials')
