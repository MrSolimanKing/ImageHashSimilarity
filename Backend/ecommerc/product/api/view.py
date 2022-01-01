from typing import Union
from django.http import request
from django.http.response import JsonResponse
from rest_framework import filters, generics, serializers, pagination
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .public_end import PublicEndpoint
from django.shortcuts import get_object_or_404
from django.http import Http404
from drf_multiple_model.views import ObjectMultipleModelAPIView, FlatMultipleModelAPIView  #pip install django-rest-multiple-models
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination
from django.db.models import Q, Count
from itertools import chain, product
from functools import reduce
from rest_framework import permissions, generics, request, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend


from django.db.models import F
from PIL import Image
import imagehash
import os
from django.conf import settings

from product.models import Product, ProductImage
from .serializers import (
    UploadProductSerializer,
    ProductsListSerializer,
    CameraImageSerializer
)

class UploadProduct(APIView):
    try:
        permission_classes = (PublicEndpoint,)
    except:
        authentication_classes = [IsAuthenticated]
        permission_classes = (PublicEndpoint,)
        
    serializer_class = UploadProductSerializer
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    def post(self, request, *args, **kwargs):
        product_serializer = UploadProductSerializer(data=request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response(product_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductView(ListAPIView):
    try:
        permission_classes = (PublicEndpoint,)
    except:
        authentication_classes = [IsAuthenticated]
        permission_classes = (PublicEndpoint,)
        
    serializer_class = ProductsListSerializer
    def get_queryset(self, *args, **kwargs):
        prodcuts_list = []
        cutoff = 32  # maximum bits that could be different between the hashes. 
        our_product = Product.objects.get(id=6)
        products = Product.objects.all().exclude(id=our_product.id)
        our_product_image = imagehash.average_hash(Image.open(our_product.image))
        for product in products:
            product_image = imagehash.average_hash(Image.open(product.image))
            if product_image - our_product_image < cutoff:
                prodcuts_list.append(product)
        print(prodcuts_list)      
        return prodcuts_list


from os.path import splitext





# ! HERE EXAMPLE OF MAKE FUNCTION AND BASED ON THIS FUNCTION GET THE SIMILAR IMAGES 
"""
import ipyplot  # displaying the sample images
import requests 
import distance
import pandas as pd
import cv2

images = ['https://i.ebayimg.com/images/g/vOUAAOSwVHle64yO/s-l1600.jpg',
         'https://i.ebayimg.com/images/g/jN8AAOSwxMle64yY/s-l1600.jpg',
        #  'https://i.ebayimg.com/images/g/3p8AAOSwk2Je64ym/s-l1600.jpg',
        #  'https://i.ebayimg.com/images/g/qqYAAOSweNle64zN/s-l1600.jpg',
        #  'https://i.ebayimg.com/images/g/cnkAAOSw~n9e64za/s-l1600.jpg',
        #  'https://i.ebayimg.com/images/g/3p8AAOSwk2Je64ym/s-l64.jpg',
        #  'https://i.ebayimg.com/images/g/qqYAAOSweNle64zN/s-l64.jpg'
         ]

df = pd.DataFrame(columns=['image','ahash'])

for url in images:
    file = Image.open(requests.get(url, stream=True).raw)

    data = {
        'image': url,
        'ahash': imagehash.average_hash(file),
        'phash': imagehash.phash(file),
        'dhash': imagehash.dhash(file),
        'whash': imagehash.whash(file),
        'colorhash': imagehash.colorhash(file),   
    }
    
    df = df.append(data, ignore_index=True)

# ipyplot.plot_images(images)
def find_similar_images(df, ahash_column, image_url):
    file = Image.open(requests.get(image_url, stream=True).raw)
    ahash = str(imagehash.average_hash(file))
    df['hamming_distance'] = df.apply(lambda x: distance.hamming(str(x[ahash_column]), ahash), axis=1)
    df = df[['image','ahash','hamming_distance']]\
    .sort_values(by='hamming_distance', ascending=True)
    print(df.apply(lambda x: distance.hamming(str(x[ahash_column]), ahash), axis=1))
    print(df)
    return df
    
df = find_similar_images(df, 'ahash', 'https://i.ebayimg.com/images/g/3p8AAOSwk2Je64ym/s-l1600.jpg')
df.head(10)
# print(df)
"""



class GetProductPyCamera(APIView):
    try:
        permission_classes = (PublicEndpoint,)
    except:
        authentication_classes = [IsAuthenticated]
        permission_classes = (PublicEndpoint,)
    
    serializer_class = CameraImageSerializer
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    def post(self, request, *args, **kwargs):
        image_serializer = CameraImageSerializer(data=request.data)
        if image_serializer.is_valid():
            image = request.FILES['image']
            image_serializer.validated_data['image'] = image
            image_serializer.save()
            uploaded_image = ProductImage.objects.get(id=image_serializer.data['id'])
            
            # ? I WAS THINK TO CONVERT IMAGE TO GRAY IN ORDER TO GET ACCURATE RESULTS
            # originalImage = cv2.imread(uploaded_image.image)
            # grayImage = cv2.cvtColor(originalImage, cv2.COLOR_BGR2GRAY)
            # cv2.imshow('Gray image', grayImage)
            
            uploaded_image_hash = imagehash.whash(Image.open(uploaded_image.image))
            
            # ? GET ALL IMAGE THAT SIMILAR TO THIS IMAGE 
            prodcuts_list = []
            image_kind = None
            cutoff = 17  # maximum bits that could be different between the hashes. 
            products = Product.objects.all()
            for product in products:
                
                product_image = imagehash.whash(Image.open(product.image))
                if uploaded_image_hash - product_image < cutoff:
                    prodcuts_list.append(product)
                    image_kind = product.name
            serializer = ProductsListSerializer(prodcuts_list, many=True, context={'request': request}) 
            return Response({
                "results": serializer.data,
                "kind": image_kind
            }, status=status.HTTP_200_OK)
        else:
            print(image_serializer.errors)
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SearchProductsView(ListAPIView):
    try:
        permission_classes = (PublicEndpoint,)
    except:
        authentication_classes = [IsAuthenticated]
        permission_classes = (PublicEndpoint,)
    queryset = Product.objects.all()
    serializer_class = ProductsListSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name']

