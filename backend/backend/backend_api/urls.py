from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_users),
    path('users/create', views.create_user),
    path('users/update/<int:pk>', views.update_user),
    path('users/delete/<int:pk>', views.delete_user),
    path('users/<int:pk>', views.get_user_by_id),
    path('login', views.login_user),

    path('destinations/', views.get_destinations),
    path('destinations/<int:pk>', views.get_destination_by_id),
    path('destinations/create', views.create_destination),
    path('destinations/update/<int:pk>', views.update_destination),
    path('destinations/delete/<int:pk>', views.delete_destination),

    path('reservations/user/<int:pk>', views.get_reservations_by_user_id),
    path('reservations/destination/<int:pk>', views.get_reservations_by_destination_id),
    path('reservations', views.get_reservations),
    path('reservations/<int:pk>', views.get_reservation_by_id),
    path('reservations/create', views.create_reservation),
    path('reservations/cancel/<int:pk>', views.cancel_reservation),

    path('stats', views.get_stats)
]