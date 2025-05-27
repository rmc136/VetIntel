from django.urls import path
from .views import (
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
)

urlpatterns = [
    # X-Ray endpoints
    path('xrays/upload/', XRayImageView.as_view(), name='xray-upload'),
    path('xrays/', XRayImageListView.as_view(), name='xray-list'),
    path('xrays/<int:pk>/', XRayImageDetailView.as_view(), name='xray-detail'),

    # Ultrasound endpoints
    path('ultrasounds/upload/', UltrasoundImageView.as_view(), name='ultrasound-upload'),
    path('ultrasounds/', UltrasoundImageListView.as_view(), name='ultrasound-list'),
    path('ultrasounds/<int:pk>/', UltrasoundImageDetailView.as_view(), name='ultrasound-detail'),

    # MRI endpoints
    path('mris/upload/', MRIImageView.as_view(), name='mri-upload'),
    path('mris/', MRIImageListView.as_view(), name='mri-list'),
    path('mris/<int:pk>/', MRIImageDetailView.as_view(), name='mri-detail'),

    # CT endpoints
    path('cts/upload/', CTImageView.as_view(), name='ct-upload'),
    path('cts/', CTImageListView.as_view(), name='ct-list'),
    path('cts/<int:pk>/', CTImageDetailView.as_view(), name='ct-detail'),

    # Endoscopy endpoints
    path('endoscopies/upload/', EndoscopyImageView.as_view(), name='endoscopy-upload'),
    path('endoscopies/', EndoscopyImageListView.as_view(), name='endoscopy-list'),
    path('endoscopies/<int:pk>/', EndoscopyImageDetailView.as_view(), name='endoscopy-detail'),

    # Dental endpoints
    path('dentals/upload/', DentalImageView.as_view(), name='dental-upload'),
    path('dentals/', DentalImageListView.as_view(), name='dental-list'),
    path('dentals/<int:pk>/', DentalImageDetailView.as_view(), name='dental-detail'),
]