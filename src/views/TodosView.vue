<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import sweetAlert from '@/components/sweetAlert.js'

import TodosContent from '@/components/Todos/TodosContent.vue'

const router = useRouter()
const nickname = ref('')

const getCookie = (name) => {
  const regex = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`)
  return document.cookie.replace(regex, '$1') || null
}

const deleteAllCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = cookie.replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/')
  })
}

const handleLogout = async () => {
  try {
    const response = await axios.post('https://todolist-api.hexschool.io/users/sign_out')
    console.log(response.data.message)
    deleteAllCookies()

    delete axios.defaults.headers.common['Authorization']

    sweetAlert('已成功登出，下次再見👋', '', 'success', '回首頁').then(() => {
      router.push('/login')
    })
  } catch (error) {
    sweetAlert('登出失敗', error.response?.data?.message || '請稍後再試', 'error', 'OK')
  }
}

onMounted(() => {
  const token = getCookie('aaron-todos')

  if (!token) {
    router.push('/login')
    sweetAlert('糟糕！', '您尚未登入', 'warning', '回到登入頁面').then(() => {})
  } else {
    axios.defaults.headers.common['Authorization'] = token
    nickname.value = getCookie('nickname')
  }
})
</script>

<template>
  <section class="container">
    <nav class="navbar">
      <img src="/src/assets/images/logo.webp" alt="網站 Logo" class="logo" />
      <ul class="user-name-and-logout">
        <li class="user-name">{{ nickname }}的待辦清單</li>
        <li class="logout" @click="handleLogout">登出</li>
      </ul>
    </nav>
    <TodosContent />
  </section>
</template>

<style scoped>
@import url('/src/assets/css/TodoNavStyle.css');
</style>
