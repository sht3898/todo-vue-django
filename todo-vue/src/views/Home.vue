<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TodoList :todos=todos></TodoList>
  </div>
</template>

<script>
// @ is an alias to /src, src경로는 @로 표시
import axios from 'axios'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'home',
  components: {
    TodoList
  },
  data() {
    // 컴포넌트에서는 반드시 data를 함수로 작성하고, object를 리턴한다.
    return {
      todos: [],
    }

  },
  mounted() {
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
}
</script>
