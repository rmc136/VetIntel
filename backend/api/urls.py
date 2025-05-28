from django.urls import path
from .views import (
    GeneralImageView,
    GeneralImageListView,
    GeneralImageDetailView,
    XRayImageView,
    XRayImageListView,
    XRayImageDetailView,
    UltrasoundImageView,
    UltrasoundImageListView,
    UltrasoundImageDetailView,
    MRIImageView,
    MRIImageListView,
    MRIImageDetailView,
    CTImageView,
    CTImageListView,
    CTImageDetailView,
    EndoscopyImageView,
    EndoscopyImageListView,
    EndoscopyImageDetailView,
    DentalImageView,
    DentalImageListView,
    DentalImageDetailView,
    DiagnosisHistoryView,
)

urlpatterns = [
    # General endpoints
    path('diagnose/general/upload/', GeneralImageView.as_view(), name='general-upload'),
    path('diagnose/general/', GeneralImageListView.as_view(), name='general-list'),
    path('diagnose/general/<int:pk>/', GeneralImageDetailView.as_view(), name='general-detail'),

    # X-Ray endpoints
    path('diagnose/xray/upload/', XRayImageView.as_view(), name='xray-upload'),
    path('diagnose/xray/', XRayImageListView.as_view(), name='xray-list'),
    path('diagnose/xray/<int:pk>/', XRayImageDetailView.as_view(), name='xray-detail'),

    # Ultrasound endpoints
    path('diagnose/ultrasounds/upload/', UltrasoundImageView.as_view(), name='ultrasound-upload'),
    path('diagnose/ultrasounds/', UltrasoundImageListView.as_view(), name='ultrasound-list'),
    path('diagnose/ultrasounds/<int:pk>/', UltrasoundImageDetailView.as_view(), name='ultrasound-detail'),

    # MRI endpoints
    path('diagnose/mris/upload/', MRIImageView.as_view(), name='mri-upload'),
    path('diagnose/mris/', MRIImageListView.as_view(), name='mri-list'),
    path('diagnose/mris/<int:pk>/', MRIImageDetailView.as_view(), name='mri-detail'),

    # CT endpoints
    path('diagnose/cts/upload/', CTImageView.as_view(), name='ct-upload'),
    path('diagnose/cts/', CTImageListView.as_view(), name='ct-list'),
    path('diagnose/cts/<int:pk>/', CTImageDetailView.as_view(), name='ct-detail'),

    # Endoscopy endpoints
    path('diagnose/endoscopies/upload/', EndoscopyImageView.as_view(), name='endoscopy-upload'),
    path('diagnose/endoscopies/', EndoscopyImageListView.as_view(), name='endoscopy-list'),
    path('diagnose/endoscopies/<int:pk>/', EndoscopyImageDetailView.as_view(), name='endoscopy-detail'),

    # Dental endpoints
    path('diagnose/dentals/upload/', DentalImageView.as_view(), name='dental-upload'),
    path('diagnose/dentals/', DentalImageListView.as_view(), name='dental-list'),
    path('diagnose/dentals/<int:pk>/', DentalImageDetailView.as_view(), name='dental-detail'),

    path('diagnoses/history/', DiagnosisHistoryView.as_view(), name='diagnosis-history'),
]