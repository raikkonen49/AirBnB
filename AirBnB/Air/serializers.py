from rest_framework import serializers
from .models import ApartamentDetails

class ApartamentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartamentDetails
        fields = '__all__'