from django.urls import path
from django.conf.urls import include, url

app_name = 'user'
urlpatterns = [
   path("api/", include("user.api.urls"))
]