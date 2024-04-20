from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import TestModel
from users.models import User

from .serializers import TestModelSerializer
from .serializers import UserSerializer


# Create your views here.
@api_view(['GET'])
def test_view(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def test_insert(request):
    serializer = TestModelSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)