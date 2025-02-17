from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Patient(models.Model):
    name = models.CharField(max_length=20)
    rna_sequence = models.TextField()
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="patients")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class Diagnose(models.Model):
     rna_sequence = models.TextField()
     result = models.TextField()
     doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="patient_results")
     patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="results")
     created_at = models.DateTimeField(auto_now_add=True)
     
     def __str__(self):
          return self.patient.name + self.result