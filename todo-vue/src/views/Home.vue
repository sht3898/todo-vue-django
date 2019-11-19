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
import axios from 'axios'
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
  methods: {
    todoCreate(title) {
      console.log('==부모컴포넌트==')
      console.log(title)
      // axios 요청 POST /todos/
      const data = {
        title: title,
        user: 1
      }
      // request.POST인 경우는 반드시 FormData!
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('user', 1)
      axios.post('http://127.0.0.1:8000/api/v1/todos/', data)
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
      this.$session.start()
      const token = this.$session.get('jwt')
      const options = {
        headers: {
          Authorization: `JWT ${token}` // JWT 다음에 공백있음.
        }
      }
      axios.get('http://127.0.0.1:8000/api/v1/todos/', options)
    .then(response => {
      console.log(response) // 만약, 오류가 발생하게 되면 ESLint 설정을 package.json에 설치
      this.todos = response.data
    })
    .catch(error => {
      console.log(error)
    })
    }
  },
  mounted() {
    this.getTodos()
  }
}
</script>
