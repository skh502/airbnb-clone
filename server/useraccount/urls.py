from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from .serializers import CustomRegisterSerializer
from . import views

urlpatterns = [
    # path('register/', RegisterView.as_view(), name='rest_register'),
    path('register/', RegisterView.as_view(serializer_class=CustomRegisterSerializer), name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    # path('login/', LoginView.as_view(serializer_class=CustomLoginSerializer), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user-profile/', views.user_profile, name='user_profile' ),
    path('<uuid:pk>/', views.landlord_detail, name='api_landlrod_detail')
]