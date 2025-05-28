from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
import os

def upload_image_to(instance, filename):
    folder_name = instance.__class__.__name__.replace('Image', '').lower()
    date_path = datetime.now().strftime('%Y/%m/%d')
    ext = filename.split('.')[-1]
    body_part = instance.body_part.replace(' ', '_') if instance.body_part else 'unknown'
    filename = f"{body_part}_{datetime.now().strftime('%H%M%S')}.{ext}"
    return os.path.join('medical_images', folder_name, date_path, filename)

class BaseImage(models.Model):
    image = models.ImageField(upload_to=upload_image_to)
    body_part = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    diagnosis = models.TextField(blank=True)
    veterinarian_notes = models.TextField(blank=True)
    ai_analysis = models.TextField(blank=True)
    confidence_score = models.FloatField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="AI model's confidence score (0-100)"
    )

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.__class__.__name__} - {self.body_part} ({self.created_at})"
    

class GeneralImage(BaseImage):
    pass
    # add other fields as needed

    def __str__(self):
        return f"GeneralImage {self.id}"


class XRayImage(BaseImage):
    PROJECTION_CHOICES = [
        ('VD', 'Ventrodorsal'),
        ('DV', 'Dorsoventral'),
        ('LL', 'Left Lateral'),
        ('RL', 'Right Lateral'),
        ('OBL', 'Oblique'),
    ]
    
    projection = models.CharField(max_length=3, choices=PROJECTION_CHOICES)
    kv_used = models.IntegerField(
        null=True, 
        blank=True, 
        validators=[MinValueValidator(0)],
        help_text="Kilovoltage used"
    )
    ma_used = models.FloatField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Milliamperage used"
    )

    class Meta:
        verbose_name = "X-Ray Image"
        verbose_name_plural = "X-Ray Images"

class UltrasoundImage(BaseImage):
    SCAN_TYPE_CHOICES = [
        ('2D', '2D Ultrasound'),
        ('3D', '3D Ultrasound'),
        ('4D', '4D Ultrasound'),
        ('DOP', 'Doppler'),
    ]
    
    scan_type = models.CharField(max_length=3, choices=SCAN_TYPE_CHOICES)
    frequency = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Frequency in MHz"
    )
    depth = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Scanning depth in cm"
    )

class MRIImage(BaseImage):
    SEQUENCE_CHOICES = [
        ('T1', 'T1-weighted'),
        ('T2', 'T2-weighted'),
        ('FLAIR', 'Fluid-attenuated inversion recovery'),
        ('DWI', 'Diffusion-weighted imaging'),
        ('STIR', 'Short tau inversion recovery'),
    ]
    
    sequence_type = models.CharField(max_length=5, choices=SEQUENCE_CHOICES)
    slice_thickness = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Slice thickness in mm"
    )
    contrast_used = models.BooleanField(default=False)
    tesla_strength = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="MRI machine strength in Tesla"
    )

class CTImage(BaseImage):
    CONTRAST_CHOICES = [
        ('NC', 'No Contrast'),
        ('IV', 'Intravenous'),
        ('OR', 'Oral'),
        ('BO', 'Both'),
    ]
    
    contrast_type = models.CharField(max_length=2, choices=CONTRAST_CHOICES, default='NC')
    slice_thickness = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Slice thickness in mm"
    )
    window_setting = models.CharField(max_length=50, blank=True, help_text="e.g., Bone, Soft Tissue, Lung")
    radiation_dose = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Radiation dose in mGy"
    )

class EndoscopyImage(BaseImage):
    PROCEDURE_CHOICES = [
        ('GAS', 'Gastroscopy'),
        ('COL', 'Colonoscopy'),
        ('BRO', 'Bronchoscopy'),
        ('RHI', 'Rhinoscopy'),
        ('LAR', 'Laryngoscopy'),
        ('OTH', 'Other'),
    ]
    
    procedure_type = models.CharField(max_length=3, choices=PROCEDURE_CHOICES)
    scope_size = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Endoscope diameter in mm"
    )
    biopsy_taken = models.BooleanField(default=False)
    sedation_used = models.BooleanField(default=True)

class DentalImage(BaseImage):
    DENTAL_VIEW_CHOICES = [
        ('IO', 'Intraoral'),
        ('EO', 'Extraoral'),
        ('BW', 'Bitewing'),
        ('PA', 'Periapical'),
        ('PAN', 'Panoramic'),
    ]
    
    view_type = models.CharField(max_length=3, choices=DENTAL_VIEW_CHOICES)
    tooth_number = models.CharField(max_length=10, blank=True)
    quadrant = models.CharField(max_length=2, blank=True)
    kv_used = models.IntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Kilovoltage used"
    )
