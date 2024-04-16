from rest_framework import serializers
from test_api.models import Offer


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'address', 'size', 'type', 'price', 'shx`aring', 'text']