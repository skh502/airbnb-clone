from django.forms import ModelForm
from .models import Property

class PropertyForm(ModelForm):
  class Meta:
    model = Property
    fields = (
      'title',
      'price_per_night',
      'bedrooms',
      'bathrooms',
      'description',
      'guests',
      'country',
      'country_code',
      'category',
      'image',
    )