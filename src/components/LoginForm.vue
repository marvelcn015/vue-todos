<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import sweetAlert from './sweetAlert.js'

const router = useRouter()

const email = ref('')
const password = ref('')

const emailError = ref(false)
const passwordError = ref(false)

const setCookie = (name, value, days) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  setCookie
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}

const handleInput = (field) => {
  if (field === 'email') {
    emailError.value = !email.value
  } else if (field === 'password') {
    passwordError.value = !password.value
  }
}

const handleSubmit = async () => {
  emailError.value = !email.value
  passwordError.value = !password.value

  if (!emailError.value && !passwordError.value) {
    try {
      const response = await axios.post('https://todolist-api.hexschool.io/users/sign_in', {
        email: email.value,
        password: password.value,
      })

      const token = response.data.token
      const nickname = response.data.nickname

      setCookie('aaron-todos', token, 1)
      setCookie('nickname', nickname, 1)

      sweetAlert('登入成功💯', '', 'success', "Let's Go Todos!").then(() => {
        router.push('/todos')
      })
    } catch (error) {
      sweetAlert(
        'Error 🥲',
        error.response?.data?.message || '登入失敗，請稍後再試',
        'error',
        '重新嘗試登入',
      )
    }
  }
}
</script>

<template>
  <form class="formControls" @submit.prevent="handleSubmit">
    <h2 class="formControls_txt">最實用的線上待辦事項服務</h2>
    <label class="formControls_label" for="email">Email</label>
    <input
      class="formControls_input"
      type="email"
      name="email"
      v-model="email"
      @input="handleInput('email')"
      placeholder="請輸入 email"
      required
    />
    <span v-if="emailError">此欄位不可留空</span>

    <label class="formControls_label" for="password">密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="password"
      v-model="password"
      @input="handleInput('password')"
      placeholder="請輸入密碼"
      required
    />
    <span v-if="passwordError">此欄位不可留空</span>

    <input class="formControls_btnSubmit" type="button" value="登入" @click="handleSubmit" />

    <RouterLink to="/register" class="formControls_btnLink link-underlined">註冊帳號</RouterLink>
  </form>
</template>

<style scoped>
@import url('/src/assets/css/FormStyle.css');
</style>
