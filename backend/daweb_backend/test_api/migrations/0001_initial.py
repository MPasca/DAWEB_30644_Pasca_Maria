# Generated by Django 5.0.4 on 2024-04-16 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('address', models.CharField(blank=True, default='', max_length=100)),
                ('size', models.CharField(choices=[('ST', 'Studio'), ('1BR', '1 bedroom'), ('2BR', '2 bedrooms'), ('3BR', '3 bedrooms'), ('MBR', '3+ bedrooms')], default='1BR', max_length=100)),
                ('type', models.CharField(choices=[('H', 'house'), ('APT', 'apartment')], default='APT', max_length=100)),
                ('price', models.PositiveIntegerField(default=0)),
                ('sharing', models.BooleanField(default=False)),
                ('text', models.TextField(default='')),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]
