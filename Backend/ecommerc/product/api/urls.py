from django.urls import path, include

from .view import (
    ProductView,
    UploadProduct,
    GetProductPyCamera,
    SearchProductsView
)

urlpatterns = [
    path("ProductView/", ProductView.as_view()),
    path("UploadProduct/", UploadProduct.as_view()),
    path("GetProductPyCamera/", GetProductPyCamera.as_view()),
    path("SearchProductsView/", SearchProductsView.as_view()),
]