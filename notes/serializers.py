from rest_framework import serializers

from notes.models import Note
from users.models import User

# class NoteModel:
#     def __init__(self, title, description, created_at, completed, user_id):
#         self.title = title
#         self.description = description
#         self.created_at = created_at
#         self.completed = completed
#         self.user = User(id=user_id)

class NoteSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=17)
    description = serializers.CharField()
    created_at = serializers.DateField(read_only=True)
    completed = serializers.BooleanField(default=False)
    user = User(id=serializers.IntegerField())

    def create(self, validated_data):
        return Note.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.created_at = validated_data.get("created_at", instance.created_at)
        instance.completed = validated_data.get("completed", instance.completed)
        instance.user = validated_data.get("user", instance.user)
        instance.save()
        return instance
