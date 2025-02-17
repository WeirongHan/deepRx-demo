# take python object and covert to JSON data
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Patient, Diagnose

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        # do not return passwords thus write only
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        # **: split up and pass in as dict
        user = User.objects.create_user(**validated_data)
        return user

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'rna_sequence', 'doctor', 'created_at']
        extra_kwargs = {'doctor': {'read_only': True}, 'rna_sequence': {'required': False}}
        
class DiagnoseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnose
        fields = ['id', 'rna_sequence', 'result', 'doctor', 'patient', 'created_at']
        extra_kwargs = {'doctor': {'read_only': True}, 'patient': {'read_only': True}, 'rna_sequence': {'required': False}}