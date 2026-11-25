from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group, User
from unfold.admin import ModelAdmin, StackedInline
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

from .models import Profile

admin.site.unregister(User)
admin.site.unregister(Group)


class ProfileInline(StackedInline):
    model = Profile
    can_delete = False
    fields = ["display_name", "instagram"]


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    inlines = [ProfileInline]
    list_display = ["email", "display_name", "is_staff", "date_joined"]

    def get_inlines(self, request, obj):
        return self.inlines if obj else []

    @admin.display(description="nombre visible")
    def display_name(self, obj):
        profile = getattr(obj, "profile", None)
        return profile.display_name if profile else ""


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass
