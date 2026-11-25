from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import MeSerializer


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = MeSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "patch"]

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile


def session_data(user):
    if not user.is_authenticated:
        return {"authenticated": False, "is_staff": False, "username": None}
    return {"authenticated": True, "is_staff": user.is_staff, "username": user.get_username()}


@method_decorator(ensure_csrf_cookie, name="get")
@method_decorator(csrf_protect, name="post")
class SessionView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(session_data(request.user))

    def post(self, request):
        username = str(request.data.get("username", "")).strip()
        password = str(request.data.get("password", ""))
        user = authenticate(request, username=username, password=password)
        if user is None or not user.is_staff:
            return Response({"detail": "Usuario o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user, backend="django.contrib.auth.backends.ModelBackend")
        return Response(session_data(user))

    def delete(self, request):
        logout(request)
        return Response(session_data(request.user))
