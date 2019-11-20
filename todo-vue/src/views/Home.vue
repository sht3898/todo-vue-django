<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TodoForm @todoCreate-event="todoCreate"/> 
    <!-- Pascalcase, uppercamelcase -->
    <!-- kebab-case -->
    <TodoList :todos=todos></TodoList>
  </div>
</template>

<script>
// @ is an alias to /src, src경로는 @로 표시
import axios from 'axios' // import requests와 유사
// import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex' // from bs4 import BeautifulSoup와 유사
import router from '../router'

import TodoList from '@/components/TodoList.vue'
import TodoForm from '@/components/TodoForm.vue'

export default {
  name: 'home',
  components: {
    TodoList,
    TodoForm
  },
  data() {
    // 컴포넌트에서는 반드시 data를 함수로 작성하고, object를 리턴한다.
    return {
      todos: [],
    }

  },
  computed: {
    // spread 문법
    ...mapGetters(
      [
        'options',
        'user'
      ]
    )
    // options() {
    //   return this.$store.getters.options
    // },
    // user() {
    //   return this.$store.getters.user
    // }
  },
  methods: {
    todoCreate(title) {
      console.log('==부모컴포넌트==')
      console.log(title)
      // axios 요청 POST /todos/
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const options = {
      //   headers: {
      //     Authorization: `JWT ${token}` // JWT 다음에 공백있음.
      //   }
      // }
      // console.log(jwtDecode(token))
      // {user_id: 1, username: "sht3898", exp: 1574138721, email: "sehyunteg@naver.com"}
      const data = {
        title: title,
        // user: jwtDecode(token).user_id  // decording 해서 user에 저장
        user: this.user
      }
      // request.POST인 경우는 반드시 FormData!
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('user', 1)
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data, this.options)
      .then(response => {
        console.log(response)
        this.todos.push(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getTodos() {
      // axios 요청시마다 헤더를 추가해서 보내야 함
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const options = {
      //   headers: {
      //     Authorization: `JWT ${token}` // JWT 다음에 공백있음.
      //   }
      // }
    axios.get(`http://127.0.0.1:8000/api/v1/users/${this.user}/`, this.options) // 여기서 user = user_id
    .then(response => {
      console.log(response) // 만약, 오류가 발생하게 되면 ESLint 설정을 package.json에 설치
      this.todos = response.data.todo_set
    })
    .catch(error => {
      console.log(error)
    })
    },
    isLogin() {
      this.$session.start()
      // session에 jwt가 없다면, 즉 토큰이 없다면, 비로그인이라면,
      if (!this.$session.has('jwt')){
        router.push('/login')
      } else {
        // 로그인 되어있다면, vuex token 업데이트
        this.$store.dispatch('login', this.$session.get('jwt'))
      }
    }
  },
  mounted() {
    this.isLogin()  // 반드시 위에 있어야 함, 로그인부터 되야하기 때문, 로그인 되어있으면
    this.getTodos() // 가져온다.
  }
}
</script>
