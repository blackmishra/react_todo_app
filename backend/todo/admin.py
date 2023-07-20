from django.contrib import admin
from .models import Todo, Booking_details, Resy, Reservation_request, Restaurant, User


class TodoAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")


class Reservation_request_Admin(admin.ModelAdmin):
    list_display = ("user_email", "booking_id", "rest_name", "date")


class Booking_detailsAdmin(admin.ModelAdmin):
    list_display = ("booking_id", "reservation_id", "booking_status")


# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(Reservation_request)
admin.site.register(Restaurant)
admin.site.register(User)
admin.site.register(Booking_details)
