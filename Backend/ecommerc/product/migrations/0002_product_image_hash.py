# Generated by Django 3.2.9 on 2021-12-31 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_hash',
            field=models.CharField(blank=True, max_length=80, null=True),
        ),
    ]
