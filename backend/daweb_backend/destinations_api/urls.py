from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_destinations),
    path('get_by_id', views.get_destination_by_id),
    path('create_destination', views.create_destination),
]