from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User

class SignInTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user( email='zakariaemrabet48@gmail.com', password='admin')

    def test_login(self):
        response = self.client.post('/api/sign-in',
                                    {'email': 'zakariaemrabet48@gmail.com',
                                    'password': 'admin'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('email', response.data)
        self.assertIn('is_2fa_enabled', response.data)

class SignUpTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup(self):
        response = self.client.post('/api/sign-up',
                                    {'email': 'zakariaemrabet48@gmail.com',
                                     'username': 'testuser',
                                    'password': 'admin'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('email', response.data)
