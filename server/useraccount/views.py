from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializers import UserDetailSerializer, LandlordPropertyDetail
from .models import User
from property.serializers import ReservationListSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([])
def user_profile(request):
  include_email = request.query_params.get('include_email', '').lower() == 'true'

  serializer = UserDetailSerializer(request.user, context={'include_email': include_email})
  return Response(serializer.data)


@api_view(['GET'])
def landlord_detail(request, pk):
  user = User.objects.get(pk=pk)
  serializer = LandlordPropertyDetail(user, many=False)

  return Response(serializer.data)


@api_view(['GET'])
def reservation_list(request):
  reservations = request.user.reservations.all()
  serializer = ReservationListSerializer(reservations, many=True)

  return Response(serializer.data)