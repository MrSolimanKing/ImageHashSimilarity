import re
from django.db import models
from django.http.response import HttpResponse
from rest_framework.fields import ReadOnlyField
from rest_framework import serializers, exceptions
from django.conf import settings
from itertools import chain
from django.db.models import Count, Q
from django.http import StreamingHttpResponse
from product.models import Product, ProductImage


class UploadProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'image']
        

class ProductsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'image']
        

class CameraImageSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField()
    class Meta:
        model = ProductImage
        fields = ['image', 'id']