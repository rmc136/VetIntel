from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .serializers import DiagnosisSerializer

class DiagnoseView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = DiagnosisSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            # Stub for AI model output
            instance.result = "Likely hip dysplasia"
            instance.save()
            return Response(DiagnosisSerializer(instance).data)
        return Response(serializer.errors, status=400)