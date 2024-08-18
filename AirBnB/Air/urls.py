from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, CityViewSet, ApartmentDetailsViewSet
from .views import RegisterView, LoginView, CurrentUserView

router = DefaultRouter()
router.register('apartments', ApartmentDetailsViewSet)
router.register('countries', CountryViewSet)
router.register('cities', CityViewSet)

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
]
