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



## 2. DRF 모델링

## 3. Vue

### Vue-router

```bash
$ npm i vue-router
$ vue add router
> Still proceed?
> y
> Use history mode for router? (Requires proper server setup for index fallback in production)
> y

```

## 4. Todos axios 요청

```
{
    // axios 요청
    axios.get('http://127.0.0.1:8000/api/v1/todos/')
    .then(response => {
      console.log(response) // 만약, 오류가 발생하게 되면 ESLint 설정을 package.json에 설치
      this.todos = response.data
    })
    .catch(error => {
      console.log(error)
    })
  }
```

1. getTodos 메소드 정의

   ```javascript
   // Home.vue
   getTodos() {
         axios.get('http://127.0.0.1:8000/api/v1/todos/')
       .then(response => {
         console.log(response) // 만약, 오류가 발생하게 되면 ESLint 설정을 package.json에 설치
         this.todos = response.data
       })
       .catch(error => {
         console.log(error)
       })
       }
   ```

2. mounted에서 호출

   ```javascript
   // Home.vue
   mounted() {
       this.getTodos()
   }
   ```

3. CORS 오류 발생

   * 해결하기 위해서는 django 서버에서 설정이 필요

4. `django-cors-headers` 패키지 활용

   * [Github 참고]( https://github.com/adamchainz/django-cors-headers )

   ```bash
   $ pip install django-cors-headers
   ```

   * `INSTALLED_APPS`, `MIDDLEWARE` 설정
   * `CORS_ORIGIN_ALLOW_ALL`: True시 모든 도메인에서 요청 가능
   * `CORS_ORIGIN_WHITELIST`: 위의 옵션을 False로 하고, 화이트리스트에 직접 도메인 등록
   * 기타 옵션들도 확인 해볼 것

5. Vue에서 다시 요청 보내보기

## 5. TodoForm component를 통해 투두 등록하기







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

* [cors]( https://github.com/adamchainz/django-cors-headers )

  1. 브라우저에서 다른 도메인 요청X
  2. policy (CORS)

  ```bash
  $ pip install django-cors-headers
  $ pip freeze > requirements.txt
  ```

  ```python
  # INSTALLED_APPS에 추가
  ```

* settings에 추가

  Django의 localhost: 8000
  
  Vue localhost:8080
  
  Vue -> Django로 axios 요청을 보냈는데 브라우저에서 요청을 거부했다
  
  => CORS 정책(헤더) 때문
  
Vue - Django API 서버간의 전달
  
  ```python
  # CORS
  CORS_ORIGIN_ALLOW_ALL = True    # CORS 모든 도메인에서 허용
  
  CORS_ORIGIN_WHITELIST = [
      # 추후에 배포시 vue에서만 요청 보낼 수 있도록 정의!!
  ]
  ```
  
  

## todo_vue

```bash
$ npm fund
$ npm i vue-router
$ vue add router
```

* router/index.js의 const routes에 경로를 설정

  ```js
  // 경로 설정
  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
  ```

  

* axios 설치

  ```bash
  $ npm i axios # i는 install의 약자
  ```

* package.json에서 no-console 수정

  ```json
  "rules": {
        "no-console": "off"
      },
  ```



* TodoList.vue에서 설정

  ```vue
  <template>
      <div class="todo-list">
          <h2>투두</h2>
          <ul>
              <li v-for="todo in todos" :key="todo.id">
                  {{todo.title}} {{todo.user}}
              </li>
          </ul>
      </div>
  </template>
  
  <script>
  export default {
      name: 'TodoList',
      props: {
          //
          todos: {
              type: Array,
              required: true
          }
      }
  }
  </script>
  
  <style>
  
  </style>
  ```

* Home.vue 설정

  ```vue
  <template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <TodoList :todos=todos></TodoList>
    </div>
  </template>
  ```

  