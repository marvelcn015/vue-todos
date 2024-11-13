<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import axios from 'axios'

import TodosInput from './TodosInput.vue'
import TodosListItem from './TodosListItem.vue'
import TodosNoItem from './TodosNoItem.vue'

const todos = ref([])

const checkTodos = async () => {
  try {
    const response = await axios.get('https://todolist-api.hexschool.io/todos')
    todos.value = response.data.data
  } catch (error) {
    console.error('無法檢查待辦事項列表:', error.message)
  }
}

const hasTodos = computed(() => todos.value.length > 0)

const todoListItemRef = ref(null)

const handleTodoAdded = () => {
  if (todoListItemRef.value) {
    todoListItemRef.value.getTodos()
  }
}

onMounted(() => {
  checkTodos()
  const interval = setInterval(checkTodos, 1500)
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <main class="todoList_Content">
    <TodosInput @todo-added="handleTodoAdded" />
    <TodosListItem v-if="hasTodos" ref="todoListItemRef" />
    <TodosNoItem v-else />
  </main>
</template>

<style scoped>
.todoList_Content {
  max-width: 500px;
  margin: 0 auto;
}
</style>
