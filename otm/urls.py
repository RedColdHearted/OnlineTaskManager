
from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings

from notes.views import workspace_redirect

from notes.views import NotesAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', workspace_redirect, name='workspace_redirect'),
    path('notes/', include('notes.urls', namespace='notes')),
    path('users/', include('users.urls', namespace='users')),
    path('api/v1/noteslist/', NotesAPIView.as_view()),
    path('api/v1/noteslist/<int:pk>/', NotesAPIView.as_view()),
]



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)