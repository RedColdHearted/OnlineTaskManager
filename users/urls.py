from django.urls import path
from users.views import logout

import users.views

app_name = 'users'

urlpatterns = [
    path('login/', users.views.login, name='login'),
    path('register/', users.views.register, name='register'),
    path('profile/', users.views.profile, name='profile'),
    path('logout/', logout, name='logout'),
]