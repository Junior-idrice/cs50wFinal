from django.urls import path
from .import views

urlpatterns = [
    path("notes/", views.notes, name = "notes"),
    path("notes/<slug:slug>", views.note_details, name="note-details")
]

#end point:
#http://127.0.0.1:8000/notes/
#http://127.0.0.1:8000/notes/note-slug/