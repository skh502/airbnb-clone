# from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializers import PropertiesListSerializer


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