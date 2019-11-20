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



## 6. 로그인 기능

> JWT(Json Web Token): 토큰 기반 로그인 인증
>
> 1. 클라이언트(Vue) 로그인 정보(username, password)를 서버(Django)로 전송
> 2. 서버는 해당 정보를 바탕으로 Token을 발급 및 암호화
> 3. 클라이언트는 Token을 받아서 매 요청 때마다 헤더에 해당 Token 정보를 추가해서 보냄
> 4. 서버에서는 매번 Token이 유효한지 확인
> 5. 클라이언트는 전송된 값을 디코딩하여 사용자 정보 활용
>
> JWT는 기본적으로 헤더, Payload, Verify signature로 구성된다.
>
> https://jwt.io에서 직접 디코딩을 해볼 수 있다.

### 1) Django

```bash
$ pip install djangorestframework-jwt
```

[Github 참고]( https://jpadilla.github.io/django-rest-framework-jwt/ )

### 2) Vue

1. 로그인 관련 컴포넌트 생성

2. 이벤트를 통해 axios 요청

3. token 값 저장

   1. `vue-session`

      ```bash
      $ npm i vue-session
      ```

   2. `src/main.js`

      ```javascript
      import VueSession from 'vue-session'
      
      Vue.use(VueSession)
      ```

   3. `vue-session` 활용하여 저장

      ```javascript
      this.$session.start()
      this.$session.set('jwt', token)
      ```

### 3) 활용

1. axios 요청시마다 아래의 `options`을 포함하여 전송

   ```js
   this.$session.start()
         const token = this.$session.get('jwt')
         const options = {
           headers: {
             Authorization: `JWT ${token}` // JWT 다음에 공백있음.
           }
         }
   ```

### 4) 사용자 정보 활용

> 사용자 정보를 활용하고 싶다면, token을 디코딩하여 활용한다.

1. 패키지 설치

```bash
$ npm i jwt-decode
```

2. 활용

   ```javascript
   import jwtDecode from 'jwt-decode'
   this.$session.start()
   const token = this.$session.get('jwt')
   console.log(jwtDecode(token))
   // {user_id: 1, username: "sht3898", exp: 1574138721, email: "sehyunteg@naver.com"}
   ```

## 7. User별 Todo

### 1. Django

### 2. Vue

## 8. 비로그인시 로그인 페이지로 이동

## 9. delete, update

## 10. Vuex

> Vuex는 Vue에서 활용하는 상태 관리 패턴이다.

## 핵심 개념

1. `state` : 상태, Vue 컴포넌트 상에서 `data`
   * 직접 변경이 불가능하고, 항상 `mutation`를 통해 변경한다.
   * `state`가 변경되면 view(화면)가 업데이트 된다.
2. `mutation` : `state`를 변경하기 위한 `methods`
   * `mutation` 함수는 첫번째 인자로 항상 `state`를 받는다.
   * `mutation` 함수는 항상 `commit`을 통해 호출된다.
3. `action` : 비동기 처리를 하는 `methods`, `mutation`도 호출 가능하다. (`state` 변화를 `mutation`, `commit`을 통해 가능하다.)
   * `action` 함수는 첫번째 인자로 항상 `context`를 받는다.
     * `state`, `commit`, `dispatch`, ...
   * `action` 함수는 항상 `dispatch`를 통해 호출된다.
4. `getters`: Vue component 상에서의 `computed`
   * 일반적인 `state` 값을 활용하는 변수의 경우 `getters`에 정의한다.



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

  

* 개인 토큰 확인

  [링크]( http://127.0.0.1:8000/api-token-auth/ )

  * 아이디 입력해서 자신의 토큰 값 확인
  * 복사해서 [https://jws.io](https://jws.io) 에서 저장된 정보 확인 가능(디코딩)



* vue session 설치

  ```bash
  $ npm i vue-session
  ```

  * vue session은 자동으로 등록이 안되어서 수동으로 등록해야함

    ```js
    // main.js
    
    import VueSession from 'vue-session'
    
    Vue.use(VueSession)
    ```

    

* [mounted vs updated]( https://kr.vuejs.org/v2/guide/instance.html )
  * mounted : 렌더링 되는 시점
  * updated : mounted된 상태에서 

 ![vue lifecycle에 대한 이미지 검색결과](https://joshua1988.github.io/vue-camp/assets/img/lifecycle.dcbe29f6.png) 



## method

GET - 가지고 오는 거시: dataX

POST - 등록 저장: data O

PUT - 수정: data O

DELETE - 삭제: data X, 리소스(url)



## git

* message 수정

  ```bash
  $ git commit --ammend
  ```

* 강제로 push 덮어쓰기

  ```bash
  $ git push -f origin master
  ```



## token

* [비 부모-자식간 통신]( [https://kr.vuejs.org/v2/guide/components.html#%EB%B9%84-%EB%B6%80%EB%AA%A8-%EC%9E%90%EC%8B%9D%EA%B0%84-%ED%86%B5%EC%8B%A0](https://kr.vuejs.org/v2/guide/components.html#비-부모-자식간-통신) )
* [flux 아키텍쳐]( https://haruair.github.io/flux/docs/overview.html )로 관리

* vue에서의 flux 역할이 vuex
* vuex => 상태관리
  * state : data
  * mutations(변이): methods
  * actions: methods(비동기)
  * getters: computed



## Vuex

* npm 설치

  ```bash
  $ npm i vuex
  $ vue add vuex
  # y
  
  ```

* store에 moduels 폴더 생성

* index.js 수정

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  import auth from './moduels/auth' // auth 모듈 추가
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
    // state, mutations, actions 주석 처리  
    // state: {	
    // },
    // mutations: {
    // },
    // actions: {
    // },
    modules: {
      auth  // 모듈 추가
    }
  })
  
  ```

* moduels/auth.js

  ```js
  // state : data와 유사
  const state = {
      token: null
  }
  // mutations : state를 변화시키기 위한 메서드(함수)
  const mutations = {
      // 첫번째 인자는 무적권 state
      // 이후 인자는 payload(즉, 그냥 매개변수)
      setToken(state, token) {
          state.token = token
      }
  }
  
  const actions = {
      // 첫번째 인자는 context (다양한)
      // 이후 인자는 payload(임의의 매개변수 값)
      login(context, token) {
          // mutation 호출 -> commit
          context.commit('setToken', token)
      }
  }
  
  const getters = {   // TodoList.vue에서 가져옴
      options(state) {
          return {
              headers: {
                  Authorization: `JWT ${state.token}`
              }
          }
      }
  }
  
  export default {
      state,
      mutations,
      actions,
      getters
  }
  ```

* LoginForm.vue에서 login할때 기능추가

  ```js
  methods: {
          login() {
              axios.post('http://127.0.0.1:8000/api-token-auth/', this.credentials)
              .then(response => {
                  ...
                  // vuex actions 호출 -> dispatch
                  this.$store.dispatch('login', token)
              })
              )
          }
      }
  ```

* 설정후 vue에서 로그인할때 살펴보면 setToken이 생성

  ![image-20191120101034522](C:\Users\student\Desktop\바탕화면정리\sht\TIL\vue\todo-vue-django\1.png)

* auth.js에서 logout 기능도 추가

  ```js
  logout(context) {
          context.commit('setToken', null)
      }
  ```

* App.vue에서 logout 기능 추가

  ```js
  logout() {
        this.$session.destroy()
        this.$store.dispatch('logout')
        router.push('/login')
      }
  ```

  