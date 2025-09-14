from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from .serializers import CustomRegisterSerializer

urlpatterns = [
    # path('register/', RegisterView.as_view(), name='rest_register'),
    path('register/', RegisterView.as_view(serializer_class=CustomRegisterSerializer), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
]