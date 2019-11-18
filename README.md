# Vue - DRF

## 1. 기본 설정

1. Django

   1. 가상환경 설정

      ```bash
      $ python -V
      3.7.5
      $ pyhton -m venv venv
      $ source venv/Scripts/activate
      (venv) $
      ```

   2. 패키지 설치

      ```bash
      $ pip install django djangorestframework
      $ pip freeze > requirements.txt
      ```

   3. django 프로젝트 생성

      ```bash
      $ django-admin startproject {프로젝트명} .
      ```

      

2. Vue

   1. VueCli 설치

      ```bash
      $ npm install -g @vue/cli
      ```

   2. Vue 프로젝트 생성

      ```bash
      $ vue create {프로젝트 이름}
      ```

3. 프로젝트 폴더 구조

   ```bash
   todo-django-vue/
   	.git/
   	todo django/
   		venv/
   		manage.py
   		todo_django/
   	todo-vue/
   		node_moduels/
   		public/
   		src/
   		package.json
   ```



# 내가 정리

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



* git add

```bash
$ git add README.md
$ git add .gitignore
$ git add todo-django
$ git commit -m 'Django | Init project'
$ git add todo-vue
$ git commit -m 'Vue | Init Vue'

```



* 가상환경 다시 실행

pip list해서 django랑 djangorestframework 안깔려있으면 설치



## todo_django

todos 앱 만들고 등록

