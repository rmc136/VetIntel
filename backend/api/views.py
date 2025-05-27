from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import (
    XRayImage,
    UltrasoundImage,
    MRIImage,
    CTImage,
    EndoscopyImage,
    DentalImage
)
from .serializers import (
    XRayImageSerializer,
    UltrasoundImageSerializer,
    MRIImageSerializer,
    CTImageSerializer,
    EndoscopyImageSerializer,
    DentalImageSerializer
)

# Base class for image views
class BaseImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    model_class = None
    serializer_class = None

    def post(self, request):
        try:
            serializer = self.serializer_class(
                data=request.data,
                context={'request': request}
            )
            
            if serializer.is_valid():
                instance = serializer.save()
                # Here you would call your AI model
                instance.ai_analysis = "AI analysis pending"
                instance.save()
                return Response(
                    self.serializer_class(instance, context={'request': request}).data,
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class BaseImageListView(generics.ListAPIView):
    serializer_class = None
    queryset = None

# X-Ray views
class XRayImageView(BaseImageView):
    model_class = XRayImage
    serializer_class = XRayImageSerializer

class XRayImageListView(BaseImageListView):
    queryset = XRayImage.objects.all()
    serializer_class = XRayImageSerializer

class XRayImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = XRayImage.objects.all()
    serializer_class = XRayImageSerializer

# Ultrasound views
class UltrasoundImageView(BaseImageView):
    model_class = UltrasoundImage
    serializer_class = UltrasoundImageSerializer

class UltrasoundImageListView(BaseImageListView):
    queryset = UltrasoundImage.objects.all()
    serializer_class = UltrasoundImageSerializer

class UltrasoundImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UltrasoundImage.objects.all()
    serializer_class = UltrasoundImageSerializer

# MRI views
class MRIImageView(BaseImageView):
    model_class = MRIImage
    serializer_class = MRIImageSerializer

class MRIImageListView(BaseImageListView):
    queryset = MRIImage.objects.all()
    serializer_class = MRIImageSerializer

class MRIImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MRIImage.objects.all()
    serializer_class = MRIImageSerializer

# CT views
class CTImageView(BaseImageView):
    model_class = CTImage
    serializer_class = CTImageSerializer

class CTImageListView(BaseImageListView):
    queryset = CTImage.objects.all()
    serializer_class = CTImageSerializer

class CTImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CTImage.objects.all()
    serializer_class = CTImageSerializer

# Endoscopy views
class EndoscopyImageView(BaseImageView):
    model_class = EndoscopyImage
    serializer_class = EndoscopyImageSerializer

class EndoscopyImageListView(BaseImageListView):
    queryset = EndoscopyImage.objects.all()
    serializer_class = EndoscopyImageSerializer

class EndoscopyImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EndoscopyImage.objects.all()
    serializer_class = EndoscopyImageSerializer

# Dental views
class DentalImageView(BaseImageView):
    model_class = DentalImage
    serializer_class = DentalImageSerializer

class DentalImageListView(BaseImageListView):
    queryset = DentalImage.objects.all()
    serializer_class = DentalImageSerializer

class DentalImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DentalImage.objects.all()
    serializer_class = DentalImageSerializer