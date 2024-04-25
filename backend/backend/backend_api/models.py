from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.CharField(max_length=30, null=False, blank=False)



class Destination(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    numberOfSeats = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(0), MaxValueValidator(45)])
    isChildFriendly = models.BooleanField(null=False, default=False)
    startDate = models.DateField(null=False, blank=False)
    endDate = models.DateField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(10)])
    offer = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(0), MaxValueValidator(100)])
    image = models.CharField(null=False, blank=False, max_length=250)

