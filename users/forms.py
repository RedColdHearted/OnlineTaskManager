from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm
from django import forms

from users.models import User

class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={
            'class': 'text-input',
            'placeholder': "input user name",
            'maxlength': "16",
        }))

    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': "text-input",
            'placeholder': "input password",
            'maxlength': "16",
        }))

    class Meta:
        model = User
        fields = ('username', 'password')

class UserRegistrationForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={
            'class': 'text-input',
            'placeholder': "input user name",
            'maxlength': "16",
        }))

    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'text-input',
        'placeholder': "input e-mail",
        'maxlength': "56",
    }))

    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': "text-input",
            'placeholder': "input password",
            'maxlength': "16",
            'type': 'password',
        }))
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': "text-input",
            'placeholder': "repeat password",
            'maxlength': "16",
            'type': 'password',
        }))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class UserProfileForm(UserChangeForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={
            'class': 'text-input',
            'maxlength': "16",
        }))

    email = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'text-input',
        'maxlength': "56",
        'readonly': True,
    }))
    image = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'image')