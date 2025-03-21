from django.contrib import admin
from django.urls import path
from financial_advice.views import analyze_spending

urlpatterns = [
    path("admin/", admin.site.urls),
    path("analyze/", analyze_spending, name="analyze_spending"),
]