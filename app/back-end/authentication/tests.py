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
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])
