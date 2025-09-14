from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class CustomRegisterSerializer(RegisterSerializer):
    username = None
    name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['name'] = self.validated_data.get('name', '')
        return data





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