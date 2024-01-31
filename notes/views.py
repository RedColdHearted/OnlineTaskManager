from django.shortcuts import render, redirect

from .serializers import NoteSerializer

from rest_framework.response import Response
from rest_framework.views import APIView

from notes.models import Note
from users.models import User


def workspace(request):
    return render(request, 'notes/workspace.html')

def workspace_redirect(request):
    return redirect('notes/')

class NotesAPIView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
        lst = Note.objects.filter(user=User(id=pk)).values()
        #serializer = NoteSerializer(lst, many=True)
        if lst:
            return Response(lst)
        return Response({"error": "Objects does not exist"})

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        note_new = Note.objects.create(
            title=request.data['title'],
            description=request.data['description'],
            created_at=request.data['created_at'],
            completed=request.data['completed'],
            user=User(id=request.data['user_id'])
        )
        return Response({'note': NoteSerializer(note_new).data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
        try:
            instance = Note.objects.get(id=pk)
        except Exception as exp:
            return Response({"error": str(exp)})

        serializer = NoteSerializer(data=request.data, instance=instance)
        serializer.user = User(id=request.data['user_id'])
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"note": serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})

        try:
            obj_del = Note.objects.get(pk=pk)
            obj_del.delete()
        except Exception as exp:
            return Response({"error": str(exp)})
            #return Response({"error": "Object does not exist"})

        return Response({"note": f'note {pk} deleted'})

