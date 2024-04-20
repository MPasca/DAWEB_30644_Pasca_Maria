import json

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from destinations.models import Destination
from .serializers import DestinationSerializer


# Create your views here.
@api_view(['GET'])
def get_destinations(request):
    destinations = Destination.objects.all()
    serializer = DestinationSerializer(destinations, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_destination(request):
    serializer = DestinationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_destination_by_id(request):
    found_destination = filter(id == request.body, Destination.objects.all())
    serializer = DestinationSerializer(found_destination, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)



def update_destination(request, id):
    updatedDestination = Destination.objects.filter(id=id).update(request)
    serializer = DestinationSerializer(updatedDestination, many=False)
    return Response(serializer.data)