from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializers import UserDetailSerializer

# Create your views here.

@api_view(['GET'])
def user_profile(request):
  serializer = UserDetailSerializer(request.user)
  return Response(serializer.data)
