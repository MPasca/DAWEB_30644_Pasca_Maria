import uuid

from django.db import models


# Create your models here.
class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, auto_created=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.EmailField()