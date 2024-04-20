from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.test_view),
    path('add', views.test_insert)
]