from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.
class Destination(models.Model):
    id = models.AutoField(primary_key=True),
    location = models.CharField(max_length=100),
    description = models.TextField(),
    numberSeats = models.IntegerField(),
    price = models.DecimalField(max_digits=4, decimal_places=2),
    percentageOff = models.DecimalField(default = 0, validators=[MaxValueValidator(1), MinValueValidator(0)]),
    isChildFriendly = models.BooleanField(),
    startDate = models.DateField(),
    endDate = models.DateField()
    img = models.ImageField(upload_to='images/')

