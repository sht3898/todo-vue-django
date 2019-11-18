* vue 설치한 적 없다면 아래와 같이 설치
  * -g: global 옵션

```bash
$ npm install -g @vue/cli
```

* cli 구조의 뷰 생성

```bash
$ vue create todo-vue

# (enter) => default
```

* back-end 폴더 생성

```bash
$ mkdir todo-django
$ cd todo-django/
```

* $ activate : source venv/Scripts/activate

```bash
$ vi ~/.bashrc

$ alias venv="source ~/python-virtualenv/3.7.4/Scripts/activate"
$ alias activate "source venv/Scripts/activate"
$ venv
```

* 가상환경설정

```bash
$ cd todo-django/
$ activate
$ pip freeze > requirements.txt
```

* todo-django 폴더 안에서

```bash
$ pip install djangorestframework
$ django-admin startproject todo_django .
```

* INSTALLED_APPS에 `rest_framework` 추가

* git add 잘못 되었을때

```bash
$ git rm --cached -r todo-django/
```



