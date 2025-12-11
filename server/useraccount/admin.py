# useraccount/admin.py
import uuid
from django.contrib import admin
from django.utils.html import format_html
from allauth.account.models import EmailAddress
from useraccount.models import User


class EmailAddressInline(admin.TabularInline):
  model = EmailAddress
  extra = 0
  can_delete = True
  readonly_fields = ("verified",)
  fields = ("email", "verified", "primary")
  verbose_name_plural = "Extra email addresses"


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    "id_short",
    "avatar_thumb",
    "name",
    "email_verified_display",
    "primary_email_extra",
    "is_staff",
    "is_active",
    "date_joined",
  )
  list_display_links = ("id_short", "name", "email_verified_display")
  list_filter = ("is_staff", "is_superuser", "is_active", "date_joined")
  search_fields = ("id", "name", "email", "emailaddress__email")
  ordering = ("-date_joined",)
  inlines = [EmailAddressInline]

  # This is what makes the Name field appear when you edit a user
  fieldsets = (
    (None, {
      "fields": ("email", "name")
    }),
    ("Permissions", {
      "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions"),
      "classes": ("collapse",),
    }),
    ("Important dates", {
      "fields": ("last_login", "date_joined"),
      "classes": ("collapse",),
    }),
  )
  readonly_fields = ("last_login", "date_joined")

  # Custom columns
  def id_short(self, obj):
    return f"{obj.id.hex[:8]}…" if isinstance(obj.id, uuid.UUID) else f"{str(obj.id)[:8]}…"
  id_short.short_description = "ID"
  id_short.admin_order_field = "id"

  def avatar_thumb(self, obj):
    if obj.avatar and obj.avatar.url:
      return format_html(
        '<img src="{}" style="border-radius:50%; width:38px; height:38px; object-fit:cover;" loading="lazy"/>',
        obj.avatar_url() if hasattr(obj, 'avatar_url') else obj.avatar.url,
      )
    return "—"
  avatar_thumb.short_description = ""

  def email_verified_display(self, obj):
    verified = EmailAddress.objects.filter(user=obj, email=obj.email, verified=True).exists()
    color = "green" if verified else "#e74c3c"
    return format_html('<b style="color:{};">{}</b>', color, obj.email)
  email_verified_display.short_description = "Login email"
  email_verified_display.admin_order_field = "email"

  def primary_email_extra(self, obj):
    primary = EmailAddress.objects.filter(user=obj, primary=True).exclude(email=obj.email).first()
    if primary:
      return primary.email
    return "—"
  primary_email_extra.short_description = "Extra primary"