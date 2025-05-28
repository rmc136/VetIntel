from rest_framework import serializers
from .models import (
    GeneralImage,
    XRayImage,
    UltrasoundImage,
    MRIImage,
    CTImage,
    EndoscopyImage,
    DentalImage
)

class BaseImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        abstract = True
        fields = [
            'id', 'image', 'image_url', 'body_part', 'notes', 'created_at',
            'diagnosis', 'veterinarian_notes', 'ai_analysis', 'confidence_score', 'result'
        ]

class GeneralImageSerializer(BaseImageSerializer):
    class Meta:
        model = GeneralImage
        fields = '__all__'

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

class BaseImageSummarySerializer(serializers.ModelSerializer):
    image_thumbnail = serializers.SerializerMethodField()

    def get_image_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        abstract = True
        fields = ['id', 'body_part', 'created_at', 'image_thumbnail']
