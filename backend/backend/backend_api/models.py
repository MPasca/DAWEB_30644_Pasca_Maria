from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, unique=True, null=False)
    password = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(unique=True, null=False, blank=False)


class Destination(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    numberOfSeats = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(0), MaxValueValidator(45)])
    isChildFriendly = models.BooleanField(null=False, default=False)
    startDate = models.DateField(null=False, blank=False)
    endDate = models.DateField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(10)])
    offer = models.DecimalField(null=False, blank=False, decimal_places=2, max_digits=3,
                    validators=[MinValueValidator(0), MaxValueValidator(1)])