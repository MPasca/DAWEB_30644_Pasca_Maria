# Generated by Django 5.0.4 on 2024-04-20 19:51

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Destination',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('location', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('numberOfSeats', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(45)])),
                ('isChildFriendly', models.BooleanField(default=False)),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('price', models.IntegerField(validators=[django.core.validators.MinValueValidator(10)])),
                ('offer', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(1)])),
            ],
        ),
    ]