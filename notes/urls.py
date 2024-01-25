from django.urls import path

import notes.views

app_name = 'notes'

urlpatterns = [
    path('', notes.views.workspace, name='workspace'),
]