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
]