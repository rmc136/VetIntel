from rest_framework import serializers
from .models import (
    Patient,
    XRayImage,
    UltrasoundImage,
    MRIImage,
    CTImage,
    EndoscopyImage,
    DentalImage
)

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class BaseImageSerializer(serializers.ModelSerializer):
    patient_details = PatientSerializer(source='patient', read_only=True)
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

    class Meta:
        abstract = True
        fields = [
            'id', 'patient', 'patient_details', 'image', 'image_url',
            'body_part', 'notes', 'created_at', 'diagnosis',
            'veterinarian_notes', 'ai_analysis', 'confidence_score'
        ]

class XRayImageSerializer(BaseImageSerializer):
    class Meta(BaseImageSerializer.Meta):
        model = XRayImage
        fields = BaseImageSerializer.Meta.fields + ['projection', 'kv_used', 'ma_used']

class UltrasoundImageSerializer(BaseImageSerializer):
    class Meta(BaseImageSerializer.Meta):
        model = UltrasoundImage
        fields = BaseImageSerializer.Meta.fields + ['scan_type', 'frequency', 'depth']

class MRIImageSerializer(BaseImageSerializer):
    class Meta(BaseImageSerializer.Meta):
        model = MRIImage
        fields = BaseImageSerializer.Meta.fields + [
            'sequence_type', 'slice_thickness', 'contrast_used', 'tesla_strength'
        ]

class CTImageSerializer(BaseImageSerializer):
    class Meta(BaseImageSerializer.Meta):
        model = CTImage
        fields = BaseImageSerializer.Meta.fields + [
            'contrast_type', 'slice_thickness', 'window_setting', 'radiation_dose'
        ]

class EndoscopyImageSerializer(BaseImageSerializer):
    class Meta(BaseImageSerializer.Meta):
        model = EndoscopyImage
        fields = BaseImageSerializer.Meta.fields + [
            'procedure_type', 'scope_size', 'biopsy_taken', 'sedation_used'
        ]

class DentalImageSerializer(BaseImageSerializer):
    class Meta(BaseImageSerializer.Meta):
        model = DentalImage
        fields = BaseImageSerializer.Meta.fields + [
            'view_type', 'tooth_number', 'quadrant', 'kv_used'
        ]

# Summary serializers for list views
class PatientSummarySerializer(serializers.ModelSerializer):
    image_count = serializers.SerializerMethodField()

    def get_image_count(self, obj):
        counts = {
            'xray': obj.xrayimage_set.count(),
            'ultrasound': obj.ultrasoundimage_set.count(),
            'mri': obj.mriimage_set.count(),
            'ct': obj.ctimage_set.count(),
            'endoscopy': obj.endoscopyimage_set.count(),
            'dental': obj.dentalimage_set.count(),
        }
        return counts

    class Meta:
        model = Patient
        fields = ['id', 'name', 'species', 'breed', 'age', 'weight', 'created_at', 'image_count']

class BaseImageSummarySerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    image_thumbnail = serializers.SerializerMethodField()

    def get_image_thumbnail(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

    class Meta:
        abstract = True
        fields = ['id', 'patient_name', 'body_part', 'created_at', 'image_thumbnail']