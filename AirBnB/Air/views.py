from rest_framework import viewsets
from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Country, City, ApartmentDetails
from .serializers import CountrySerializer, CitySerializer, ApartmentDetailsSerializer
from django.shortcuts import render, redirect
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from django.db.models import Q

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all().order_by('name')
    serializer_class = CountrySerializer

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all().order_by('name')
    serializer_class = CitySerializer

class ApartmentDetailsViewSet(viewsets.ModelViewSet):
    queryset = ApartmentDetails.objects.all()
    serializer_class = ApartmentDetailsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        check_in_date = self.request.query_params.get('check_in_date', None)
        check_out_date = self.request.query_params.get('check_out_date', None)

        if check_in_date and check_out_date:
            queryset = queryset.filter(
                Q(check_in_date__lte=check_in_date, check_out_date__gte=check_in_date) |
                Q(check_in_date__lte=check_out_date, check_out_date__gte=check_out_date)
            )
        return queryset

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
        })

class CurrentUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
