import json

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from destinations_api.models import Destination


# Create your views here.
@api_view(['GET'])
def get_destinations(request):
    destinations = Destination.objects.all()
    return Response(destinations)


@api_view(['POST'])
def create_destination(request):
    request_data = json.loads(request.body)
    destination = Destination(request_data)
    destination.save()
    return Response(destination)


@api_view(['PUT'])
def get_destination_by_id(request):
    found_destination = filter(id == request.body, Destination.objects.all())
    return Response(found_destination)
