from .serializer import UsersSignUpSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class SignUpView(APIView):
    serializer_class = UsersSignUpSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

class GoogleSignUpView(APIView):
    pass
class SignIn(APIView):
    pass

class SignOut(APIView):
    pass