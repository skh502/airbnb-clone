from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from . models import User

class CustomRegisterSerializer(RegisterSerializer):
  username = None
  name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    
  def get_cleaned_data(self):
    data = super().get_cleaned_data()
    data['name'] = self.validated_data.get('name', '')
    return data

# class CustomLoginSerializer(LoginSerializer):
#   username = None
#   def to_representation(self, instance):
#     data =  super().to_representation(instance)
#     user = self.context['request'].user
#     if user.is_authenticated:
#       data['user'] = {
#           'id': str(user.id),
#           'email': user.email,
#           'name': user.name,
#           'avatar_url': user.avatar_url()
#       }
#     return data
    
class UserDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [
      'id', 'name', 'avatar_url'
    ]

  def to_representation(self, instance):
    data = super().to_representation(instance)
    # Add email if requested via context
    if self.context.get('include_email', False):
      email = getattr(instance, 'email', None)
      if email:
        data['email'] = email
    return data

class LandlordPropertyDetail(serializers.ModelSerializer):
  # new changes to be kept here
  properties = serializers.SerializerMethodField()
  class Meta:
    model = User
    fields = UserDetailSerializer.Meta.fields + ['properties', 'email']
  
  def get_properties(self, obj):
    from property.serializers import PropertiesListSerializer
    return PropertiesListSerializer(obj.properties.all(), many=True).data
  




# from rest_framework import serializers
# from dj_rest_auth.registration.serializers import RegisterSerializer
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class CustomRegisterSerializer(RegisterSerializer):
#   username = None  # Remove the username field
#   email = serializers.EmailField(required=True)
#   password1 = serializers.CharField(write_only=True, required=True)
#   password2 = serializers.CharField(write_only=True, required=True)
#   name = serializers.CharField(max_length=255, required=False)  

#   def get_cleaned_data(self):
#     data = super().get_cleaned_data()
#     data['email'] = self.validated_data.get('email', '')
#     data['name'] = self.validated_data.get('name', '')  
#     return data

#   def save(self, request):
#     user = super().save(request)
#     user.email = self.validated_data.get('email')
#     user.name = self.validated_data.get('name', None) 
#     user.save()
#     return user