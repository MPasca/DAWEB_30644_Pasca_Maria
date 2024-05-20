from datetime import datetime

from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Destination, Reservation
from .serializers import UserSerializer, DestinationSerializer, ReservationSerializer


# users actions


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_user(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_user(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def login_user(request):
    if request.data.get('email') == 'agent' and request.data.get('password') == 'password_agent123':
        return Response({'userId': 0, 'role': 'agent'}, status=status.HTTP_200_OK)
    user = User.objects.get(email=request.data.get('email'), password=request.data.get('password'))
    if user is not None:
        return Response({'userId': user.id, 'role': 'client'}, status=status.HTTP_200_OK)
    return Response({"message": "incorrect login information"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    if user is not None:
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "incorrect id"}, status=status.HTTP_404_NOT_FOUND)


# destination actions


@api_view(['GET'])
def get_destinations(request):
    destinations = Destination.objects.all()
    serializer = DestinationSerializer(destinations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_destination_by_id(request, pk):
    destination = Destination.objects.get(id=pk)
    if destination is not None:
        serializer = DestinationSerializer(destination)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "incorrect id"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_destination(request):
    serializer = DestinationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "incorrect destination information"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['PUT'])
def update_destination(request, pk):
    destination = Destination.objects.get(id=pk)
    serializer = DestinationSerializer(destination, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_destination(request, pk):
    destination = Destination.objects.get(id=pk)
    destination.delete()

    return Response({'message': 'Destination deleted successfully'}, status=status.HTTP_200_OK)


def validate_reservation(request):
    if Destination.objects.get(id=request.data['idDestination']) is None:
        return ValueError("Destination does not exist")
    if User.objects.get(id=request.data['idUser']) is None:
        return ValueError("User does not exist")
    destination = Destination.objects.get(id=request.data['idDestination'])
    if destination.startDate < datetime.now().date():
        return ValueError("Cannot make reservation after the start date")


@api_view(['POST'])
def create_reservation(request):
    validate_reservation(request)
    destination = Destination.objects.get(id=request.data['idDestination'])
    reservation = {
        "idUser": request.data['idUser'],
        "idDestination": request.data['idDestination'],
        "numberOfPeople": request.data['numberOfPeople'],
        "reservationDate": datetime.now().date(),
        "totalPrice": destination.price * (destination.endDate - destination.startDate).days
    }

    serializer = ReservationSerializer(data=reservation)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_reservation_by_id(request, pk):
    reservation = Reservation.objects.get(id=pk)
    if reservation is not None:
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "No reservation found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_reservations_by_user_id(request, pk):
    reservations = Reservation.objects.filter(idUser=pk)
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_reservations_by_destination_id(request, pk):
    reservations = Reservation.objects.filter(idDestination=pk)
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def cancel_reservation(request, pk):
    reservation = Reservation.objects.get(id=pk)
    serializer = ReservationSerializer(reservation, data={"cancelled": "True"}, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Reservation cancelled successfully"}, status=status.HTTP_200_OK)
    return Response({"message": "Reservation could not be cancelled"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
