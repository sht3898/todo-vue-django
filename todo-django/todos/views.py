from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializers, UserSerializers


# Create your views here.

# GET   /todos/ : 전체 todos
# POST  /todos/ : todos 등록
@api_view(['GET', 'POST'])
def todo_index_create(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializers = TodoSerializers(todos, many=True)
        return Response(serializers.data)
    else:
        # request.POST : FormData로 전송이 되었을 때,
        # request.data : FormData로 POST 전송 및 data로 전송 모두 값이 추가 되어있음
        serializers = TodoSerializers(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

# GET   /users/{id}/
@api_view(['GET'])
def user_detail(request, id):
    User = get_user_model()
    user = get_object_or_404(User, pk=id)
    serializers = UserSerializers(user)
    return Response(serializers.data)