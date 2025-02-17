from django.urls import path
from . import views

urlpatterns = [
    path('patients/', views.PatientListCreate.as_view(), name="patient-list"),
    path('patients/delete/<int:pk>/', views.PatientDelete.as_view(), name='delete-patient'),
]