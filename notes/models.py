from users.models import User
from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=17)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=False)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)