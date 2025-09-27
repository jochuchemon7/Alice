import math

from django.shortcuts import render
from django.http import HttpResponse
# from .models import Activity
from django.views.generic import ListView

# Create your views here.
import numpy as np


# ----------------------------------------------------------------------------------

def alice_main_view(request):
    context = dict()
    return render(request, "alice_main.html", context=context)


