from django.urls import path
from . import views

urlpatterns = [
    path('patients/', views.PatientListCreate.as_view(), name="patient-list"),
    path('patients/delete/<int:pk>/', views.PatientDelete.as_view(), name='delete-patient'),
    path('patients/upload_rna/<int:pk>/', views.UploadPatientRNA, name='upload_patient_rna'),
    path('patients/run_diagnose/<int:pk>/', views.RunDiagnose, name='run_diagnose'),
    path('patients/diagnose/<int:pk>/', views.DiagnoseList.as_view(), name='diagnose list'),
]