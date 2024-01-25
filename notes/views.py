from django.shortcuts import render, redirect

# Create your views here.

def workspace(request):
    return render(request, 'notes/workspace.html')

def workspace_redirect(request):
    return redirect('notes/')