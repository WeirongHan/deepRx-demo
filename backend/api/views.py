from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, PatientSerializer, DiagnoseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from.models import Patient, Diagnose
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PatientListCreate(generics.ListCreateAPIView):
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Patient.objects.filter(doctor=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(doctor=self.request.user)
        else:
            print(serializer.errors)
    
class PatientDelete(generics.DestroyAPIView):
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Patient.objects.filter(doctor=user)
    
@api_view(['PUT'])
def UploadPatientRNA(request, pk):
    permission_classes = [IsAuthenticated] 
    """Handle partial update to only modify `rna_sequence`"""
    patient = Patient.objects.get(id=pk)

    file = request.FILES.get("rna_file")
    if not file:
        return Response({"error": "RNA file is required"}, status=status.HTTP_400_BAD_REQUEST)
    read_file = pd.read_excel(file)
    # Read the RNA sequence from the uploaded file
    try:
        rna_sequence = read_file.loc[0, "RNA"]
    except Exception as e:
        return Response({"error": f"Failed to read file: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    # Update the patient's RNA sequence
    patient.rna_sequence = rna_sequence
    patient.save()

    return Response(
        {"message": "RNA sequence updated successfully!", "patient": PatientSerializer(patient).data},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
def RunDiagnose(request, pk):
    permission_classes = [IsAuthenticated]
    patient = Patient.objects.get(id=pk)
    rna_sequence = patient.rna_sequence
    # put in .env in the future
    model_address = "https://dummyjson.com/c/ac25-c98a-428f-8913"
    data = {"rna_sequence": rna_sequence}
    try:
        response = requests.post(model_address, json=data)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

    result = response.json()['result']
    # Create a new Diagnose object for the patient
    Diagnose.objects.create(rna_sequence=rna_sequence, result=result, doctor=patient.doctor, patient=patient)
    return JsonResponse({'message': 'Diagnose results generated!', 'result': result}, status=201)

class DiagnoseList(generics.ListAPIView):
    serializer_class = DiagnoseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Diagnose.objects.filter(doctor=user)

    