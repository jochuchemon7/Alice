# ALICE VIEWS
from django.urls import path

from .views import alice_main_view
from django.contrib.auth import views as auth_views

urlpatterns = [

    # Alice (Full On MLOps)
    path('alice/', alice_main_view, name='alice_view'),


]
