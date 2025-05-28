from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
import traceback
from .models import (
    GeneralImage,
    XRayImage,
    UltrasoundImage,
    MRIImage,
    CTImage,
    EndoscopyImage,
    DentalImage
)
from .serializers import (
    GeneralImageSerializer,
    XRayImageSerializer,
    UltrasoundImageSerializer,
    MRIImageSerializer,
    CTImageSerializer,
    EndoscopyImageSerializer,
    DentalImageSerializer
)

# Base class for image uploads
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
                instance.ai_analysis = "AI analysis pending"
                instance.save()
                return Response(
                    self.serializer_class(instance, context={'request': request}).data,
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            traceback.print_exc()  # 👈 print full traceback to console
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BaseImageListView(generics.ListAPIView):
    serializer_class = None
    queryset = None

# General

class GeneralImageView(BaseImageView):
    model_class = GeneralImage
    serializer_class = GeneralImageSerializer

class GeneralImageListView(BaseImageListView):
    queryset = GeneralImage.objects.all()
    serializer_class = GeneralImageSerializer

class GeneralImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GeneralImage.objects.all()
    serializer_class = GeneralImageSerializer
# X-Ray
class XRayImageView(BaseImageView):
    model_class = XRayImage
    serializer_class = XRayImageSerializer

class XRayImageListView(BaseImageListView):
    queryset = XRayImage.objects.all()
    serializer_class = XRayImageSerializer

class XRayImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = XRayImage.objects.all()
    serializer_class = XRayImageSerializer

# Ultrasound
class UltrasoundImageView(BaseImageView):
    model_class = UltrasoundImage
    serializer_class = UltrasoundImageSerializer

class UltrasoundImageListView(BaseImageListView):
    queryset = UltrasoundImage.objects.all()
    serializer_class = UltrasoundImageSerializer

class UltrasoundImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UltrasoundImage.objects.all()
    serializer_class = UltrasoundImageSerializer

# MRI
class MRIImageView(BaseImageView):
    model_class = MRIImage
    serializer_class = MRIImageSerializer

class MRIImageListView(BaseImageListView):
    queryset = MRIImage.objects.all()
    serializer_class = MRIImageSerializer

class MRIImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MRIImage.objects.all()
    serializer_class = MRIImageSerializer

# CT
class CTImageView(BaseImageView):
    model_class = CTImage
    serializer_class = CTImageSerializer

class CTImageListView(BaseImageListView):
    queryset = CTImage.objects.all()
    serializer_class = CTImageSerializer

class CTImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CTImage.objects.all()
    serializer_class = CTImageSerializer

# Endoscopy
class EndoscopyImageView(BaseImageView):
    model_class = EndoscopyImage
    serializer_class = EndoscopyImageSerializer

class EndoscopyImageListView(BaseImageListView):
    queryset = EndoscopyImage.objects.all()
    serializer_class = EndoscopyImageSerializer

class EndoscopyImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EndoscopyImage.objects.all()
    serializer_class = EndoscopyImageSerializer

# Dental
class DentalImageView(BaseImageView):
    model_class = DentalImage
    serializer_class = DentalImageSerializer

class DentalImageListView(BaseImageListView):
    queryset = DentalImage.objects.all()
    serializer_class = DentalImageSerializer

class DentalImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DentalImage.objects.all()
    serializer_class = DentalImageSerializer


class DiagnosisHistoryView(APIView):

    def get(self, request):
        # Query all diagnosis types
        xray = XRayImage.objects.all()
        mri = MRIImage.objects.all()
        ultrasound = UltrasoundImage.objects.all()
        ct = CTImage.objects.all()
        general = GeneralImage.objects.all()
        endoscopy = EndoscopyImage.objects.all()
        dental = DentalImage.objects.all()

        # Serialize them
        data = []
        for queryset, serializer_class, diagnosis_type in [
            (xray, XRayImageSerializer, 'xray'),
            (mri, MRIImageSerializer, 'mri'),
            (ultrasound, UltrasoundImageSerializer, 'ultrasound'),
            (ct, CTImageSerializer, 'ct'),
            (general, GeneralImageSerializer, 'general'),
            (endoscopy, EndoscopyImageSerializer, 'endoscopy'),
            (dental, DentalImageSerializer, 'dental'),
        ]:
            serializer = serializer_class(queryset, many=True, context={'request': request})
            for item in serializer.data:
                # Add diagnosis type so frontend can know what it is
                item['diagnosis_type'] = diagnosis_type
                data.append(item)

        # Sort by created_at descending
        data.sort(key=lambda x: x.get('created_at', ''), reverse=True)

        return Response(data, status=status.HTTP_200_OK)