from rest_framework import viewsets, permissions
from .models import ApartmentDetails
from .serializers import ApartmentDetailsSerializer

class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = ApartmentDetails.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Пример разрешений
    serializer_class = ApartmentDetailsSerializer