from django.contrib import admin
from .models import (
    Patient,
    XRayImage,
    UltrasoundImage,
    MRIImage,
    CTImage,
    EndoscopyImage,
    DentalImage
)

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'species', 'breed', 'age', 'weight', 'created_at')
    list_filter = ('species', 'created_at')
    search_fields = ('name', 'species', 'breed')
    ordering = ('-created_at',)

class BaseImageAdmin(admin.ModelAdmin):
    list_display = ('patient', 'body_part', 'created_at', 'confidence_score')
    list_filter = ('created_at', 'body_part')
    search_fields = ('patient__name', 'body_part', 'diagnosis')
    readonly_fields = ('created_at', 'confidence_score')
    ordering = ('-created_at',)

@admin.register(XRayImage)
class XRayImageAdmin(BaseImageAdmin):
    list_display = BaseImageAdmin.list_display + ('projection',)
    list_filter = BaseImageAdmin.list_filter + ('projection',)

@admin.register(UltrasoundImage)
class UltrasoundImageAdmin(BaseImageAdmin):
    list_display = BaseImageAdmin.list_display + ('scan_type',)
    list_filter = BaseImageAdmin.list_filter + ('scan_type',)

@admin.register(MRIImage)
class MRIImageAdmin(BaseImageAdmin):
    list_display = BaseImageAdmin.list_display + ('sequence_type', 'contrast_used')
    list_filter = BaseImageAdmin.list_filter + ('sequence_type', 'contrast_used')

@admin.register(CTImage)
class CTImageAdmin(BaseImageAdmin):
    list_display = BaseImageAdmin.list_display + ('contrast_type', 'window_setting')
    list_filter = BaseImageAdmin.list_filter + ('contrast_type',)

@admin.register(EndoscopyImage)
class EndoscopyImageAdmin(BaseImageAdmin):
    list_display = BaseImageAdmin.list_display + ('procedure_type', 'biopsy_taken')
    list_filter = BaseImageAdmin.list_filter + ('procedure_type', 'biopsy_taken', 'sedation_used')

@admin.register(DentalImage)
class DentalImageAdmin(BaseImageAdmin):
    list_display = BaseImageAdmin.list_display + ('view_type', 'tooth_number')
    list_filter = BaseImageAdmin.list_filter + ('view_type',)
    search_fields = BaseImageAdmin.search_fields + ('tooth_number', 'quadrant')
