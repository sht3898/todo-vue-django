<template>
  <div>
      <!--
          form에 이벤트 리스너 달아서,
          1) 사용값 출력
          2) /api-token-auth/로 요청 보내서 토큰값 출력
        -->
        <form @submit.prevent="login" action="">
            <!-- 
                submit을 실행하면 다른거 안하고 login 함수 기능만 실행
                이거 안하면 url 주소 바꾸는 원래 form 기능 실행함
            -->
          <label for="username">ID: </label>
          <input v-model="credentials.username" 
            type="text" id="username">
          <label for="password">비밀번호</label>
          <input v-model="credentials.password" 
            type="password" id="password">
          <button type="submit">로그인</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'
// 특정 폴더명으로 경로가 끝나게 되면, 폴더 내부의 index.js를 뜻함.
import router from '../router'

export default {
    name: 'LoginForm',
    data() {
        return {
            credentials: {}
        }
    },
    methods: {
        login() {
            // this.$emit('login-event', this.credentials)
            // this.credentials = {}
            axios.post('http://127.0.0.1:8000/api-token-auth/', this.credentials)
            .then(response => {
                console.log(response)
                const token = response.data.token
                this.$session.start()
                this.$session.set('jwt', token)
                // vuex actions 호출 -> dispatch
                this.$store.dispatch('login', token)
                router.push('/')    // redirect와 유사, '/' 이 경로로 가라
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>