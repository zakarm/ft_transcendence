from django.test import TestCase

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Users

class SignInTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Users.objects.create_user(username='testuser', email='user@example.com', password='password')

    def test_login(self):
        response = self.client.post('/api/sign-in', {'email': 'zakariaemrabet48@gmail.com', 'password': 'admin'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])
