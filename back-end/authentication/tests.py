from django.test import TestCase
from rest_framework.test import APIClient, force_authenticate
from rest_framework import status
from .models import Users
import requests_mock
from django.test import TestCase, RequestFactory
from .views import GithubLogin
import jwt
from django.test import Client

class SignInTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Users.objects.create_user( email='zakariaemrabet48@gmail.com', password='admin')

    def test_login(self):
        response = self.client.post('/api/sign-in', {'email': 'zakariaemrabet48@gmail.com', 'password': 'admin'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])


class GithubLoginTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.view = GithubLogin.as_view()

    @requests_mock.Mocker()
    def test_github_login(self, m):
        m.get('https://api.github.com/user', json={'login': 'zakarm', 'id': 1})
        m.get('https://api.github.com/user/emails', json=[{'email': 'zakariaemrabet1@gmail.com', 'primary': True, 'verified': True}])
        response = self.client.post('/api/github', {'token': 'testtoken'}, format='json')
        self.assertEqual(response.status_code, 200)
        decoded_jwt = jwt.decode(response.data['access'], options={"verify_signature": False})
        self.assertEqual(decoded_jwt['user_id'], 1)