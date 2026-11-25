from rest_framework import serializers

from .models import Profile


class MeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Profile
        fields = ["email", "display_name", "instagram"]

    def validate_instagram(self, value):
        return value.strip().lstrip("@")

    def validate_display_name(self, value):
        return value.strip()
