import uuid

from datetime import date, datetime

from django.shortcuts import redirect, render
from rest_framework.response import Response
from rest_framework import status, viewsets
from .serializers import TodoSerializer, BookingSerializer
from .models import Todo, Reservation_request, Restaurant
from rest_framework.decorators import action


today_date = date.today()


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class Reservation_requestView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Reservation_request.objects.all()

    def get(self, request, *args, **kwargs):
        rest_objs = list(Restaurant.objects.all().order_by("rest_name").values())
        context = {"data": rest_objs}
        return Response(self.context)
        # return render(request, "booking.html", context)

    def post(self, request, *args, **kwargs):
        """
        Create the reservation request with given data
        """
        rest_name = request.data.get("rest_name")
        rest_id = request.data.get("rest_id")
        booking_id = str(uuid.uuid1())
        data = {
            "rest_name": rest_name,
            "rest_id": rest_id,
            "date": request.data.get("date"),
            "number_of_guests": request.data.get("number_of_guests"),
            "booking_available_till": today_date,
            "from_time": request.data.get("from_time"),
            "to_time": request.data.get("to_time"),
            "booking_id": booking_id,
        }

        serializer = BookingSerializer(data=data)
        context = {}

        if serializer.is_valid():
            serializer.save()

            subject = "Booking Request: Successfully created."
            message = f"{subject} \n\n Your Booking ID : {booking_id}. \n\n"
            f"\nYou may receive another notification when your reservation is confirmed. "
            f"This mail is just to inform you that we have received your booking request. "
            f"It does not guarentee you will get the reservation."

            booking_details = {
                "booking_id": booking_id,
                "subject": subject,
                "message": message,
            }
            context["result"] = serializer.data
            context["message"] = message
            request.session["booking_details"] = booking_details
            return Response(context)
            # return redirect("fetch_user")
            # return render(
            #     request,
            #     context=context,
            #     status=status.HTTP_201_CREATED,
            #     template_name="user_page.html",
            # )
        context["result"] = serializer.errors
        context[
            "message"
        ] = "BAD INPUT. Booking Request: Failed to create. Please try again with valid input."
        return Response(context, status=status.HTTP_400_BAD_REQUEST,)
        return render(
            request,
            context=context,
            status=status.HTTP_400_BAD_REQUEST,
            template_name="status.html",
        )
