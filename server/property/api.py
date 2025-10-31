# from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import PropertiesListSerializer, PropertyCreateSerializer, PropertiesDetailSerializer

from .models import Property

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
  properties = Property.objects.all()
  serializers = PropertiesListSerializer(properties, many=True)
  return Response(serializers.data, status=status.HTTP_200_OK)
  # return JsonResponse({
  #   'data': serializers.data
  # })


# @api_view(['POST', 'FILES'])
# def create_property(request):
#     form = PropertyForm(request.POST, request.FILES)

#     if form.is_valid():
#         property = form.save(commit=False)
#         property.landlord = request.user
#         property.save()
#         return Response({'success': True})
#     else:
#         print('error', form.errors, form.non_field_errors)
#         return Response({'errors': form.errors.as_json()}, status=400)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])  
def create_property(request):
  serializer = PropertyCreateSerializer(data=request.data)

  if serializer.is_valid():
    property_obj = serializer.save(landlord=request.user)
    response_serializer = PropertiesListSerializer(property_obj)
    return Response(response_serializer.data, status=status.HTTP_201_CREATED)
  else:
    print('Validation errors:', serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request, pk):
  property = Property.objects.get(pk=pk)
  serializer = PropertiesDetailSerializer(property, many=False)
  return Response(serializer.data, status=status.HTTP_200_OK)
