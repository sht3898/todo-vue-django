<template>
  <div class="login">
      <h2>로그인</h2>
      <!-- <LoginForm @login-event="login"/> -->
      <LoginForm/>
  </div>
</template>

<script>
// import axios from 'axios'
import LoginForm from '@/components/LoginForm.vue'

export default {
    name: 'Login',
    components: {
            LoginForm
    },
    // methods: {
    //     login(credentials) {
    //         axios.post('http://127.0.0.1:8000/api-token-auth/', credentials)
    //         .then(response => {
    //             console.log(response)
    //             console.log(response.data.token)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //     }
    // }
}
</script>
<style>

</style>