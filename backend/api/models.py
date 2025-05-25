from django.db import models

# Create your models here.
class Diagnosis(models.Model):
    image = models.ImageField(upload_to='xrays/')
    result = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)