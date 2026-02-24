from rest_framework import serializers
from . models import Property, Reservation
from useraccount.serializers import UserDetailSerializer

class PropertiesListSerializer(serializers.ModelSerializer):
  is_favorited = serializers.SerializerMethodField()
  class Meta:
    model = Property
    fields = [
      'id',
      'title',
      'price_per_night',
      'image_url',
      'is_favorited'
    ]
  
  def get_is_favorited(self, obj):
    request = self.context.get('request')
    if request and request.user.is_authenticated:
      return obj.favorited.filter(id=request.user.id).exists()
    return False


class PropertyCreateSerializer(serializers.ModelSerializer):
  class Meta: 
    model =  Property
    fields = [
      'title',
      'description', 
      'price_per_night',
      'bedrooms',
      'bathrooms', 
      'guests',
      'country',
      'country_code',
      'category',
      'image', 
    ]

class PropertiesDetailSerializer(serializers.ModelSerializer):
  landlord = UserDetailSerializer(read_only=True, many=False)

  class Meta:
    model = Property
    fields = [
      'id',
      'title',
      'description',
      'price_per_night',
      'image_url',
      'bedrooms',
      'bathrooms',
      'guests',
      'landlord'
    ]

class ReservationCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Reservation
    fields = ['start_date', 'end_date', 'number_of_nights', 'guests', 'total_price']

  def validate(self, data):
    if data['start_date'] >= data['end_date']:
      raise serializers.ValidationError('End date must be after start date')
    
    if data['guests'] <= 0:
      raise serializers.ValidationError('Number of guests must be positive')

    return data
    
class ReservationListSerializer(serializers.ModelSerializer):

  property = PropertiesListSerializer(read_only=True)
  class Meta:
    model = Reservation
    fields = (
      'id', 'start_date', 'end_date', 'number_of_nights', 'total_price', 'property'
    )