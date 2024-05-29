from django.urls import path, include
from rest_framework import routers
from .api import ApartamentViewSet

router = routers.DefaultRouter()
router.register('api/apartament_details', ApartamentViewSet, 'apartament_details')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
]