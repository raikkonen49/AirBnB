from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ApartmentViewSet
from .models import get_cities
from .views import CountryViewSet, CityViewSet, ApartmentDetailsViewSet

router = DefaultRouter()
router.register('apartments', ApartmentDetailsViewSet)
router.register('countries', CountryViewSet)
router.register('cities', CityViewSet)

urlpatterns = [
    path('auth/', include('rest_framework.urls')),  # Добавление маршрутов аутентификации
    path('', include(router.urls)),
    path('get-cities/<int:country_id>/', get_cities, name='get_cities'),
]