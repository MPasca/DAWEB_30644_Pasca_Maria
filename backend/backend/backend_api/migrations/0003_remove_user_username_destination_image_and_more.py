# Generated by Django 5.0.4 on 2024-04-23 20:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0002_destination'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
        migrations.AddField(
            model_name='destination',
            name='image',
            field=models.CharField(default='https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/64/b9.jpg', max_length=250),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='destination',
            name='offer',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
    ]
