def public_name(user):
    profile = getattr(user, "profile", None)
    if profile and profile.display_name:
        return profile.display_name
    if user.first_name:
        return user.first_name
    return "Alguien del bululú"
