# Generated by Django 3.2.9 on 2021-12-30 20:29

from django.db import migrations, models
import product.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=220)),
                ('description', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, max_length=255, upload_to=product.models.get_image_filepath)),
            ],
        ),
    ]
