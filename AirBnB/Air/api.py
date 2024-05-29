from rest_framework import viewsets, permissions
from .models import ApartamentDetails
from .serializers import ApartamentDetailsSerializer

class ApartamentViewSet(viewsets.ModelViewSet):
    queryset = ApartamentDetails.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ApartamentDetailsSerializer