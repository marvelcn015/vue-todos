<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const todos = ref([])
const activeTab = ref('all')

const getTodos = async () => {
  try {
    const response = await axios.get('https://todolist-api.hexschool.io/todos')
    todos.value = response.data.data
  } catch (error) {
    console.error('無法獲取待辦事項列表:', error.message)
  }
}

defineExpose({
  getTodos,
})

const deleteTodo = async (id) => {
  const todoToDelete = todos.value.find((todo) => todo.id === id)
  try {
    await axios.delete(`https://todolist-api.hexschool.io/todos/${id}`)
    console.log(`已刪除待辦事項：${todoToDelete.content}，ID 為：${todoToDelete.id}`)
    getTodos()
  } catch (error) {
    console.error(
      `刪除待辦事項失敗：${todoToDelete.content}，ID 為：${todoToDelete.id}，錯誤訊息：${error.message}`,
    )
  }
}

const toggleStatus = async (id) => {
  const todoToToggle = todos.value.find((todo) => todo.id === id)
  try {
    await axios.patch(`https://todolist-api.hexschool.io/todos/${id}/toggle`)
    console.log(`待辦事項：「${todoToToggle.content}」已切換狀態`)
    getTodos()
  } catch (error) {
    console.error(
      `切換待辦事項狀態失敗：「${todoToToggle.content}」，ID 為：${todoToToggle.id}，錯誤訊息：${error.message}`,
    )
  }
}

const filteredTodos = computed(() => {
  if (activeTab.value === 'all') {
    return todos.value
  } else if (activeTab.value === 'pending') {
    return todos.value.filter((todo) => !todo.status)
  } else if (activeTab.value === 'completed') {
    return todos.value.filter((todo) => todo.status)
  }
})

const pendingTodosCount = computed(() => {
  return todos.value.filter((todo) => !todo.status).length
})

const completedTodosCount = computed(() => {
  return todos.value.filter((todo) => todo.status).length
})

onMounted(() => {
  getTodos()
})
</script>

<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <a href="#" :class="{ active: activeTab === 'all' }" @click.prevent="activeTab = 'all'"
          >全部</a
        >
      </li>
      <li>
        <a
          href="#"
          :class="{ active: activeTab === 'pending' }"
          @click.prevent="activeTab = 'pending'"
          >待完成</a
        >
      </li>
      <li>
        <a
          href="#"
          :class="{ active: activeTab === 'completed' }"
          @click.prevent="activeTab = 'completed'"
          >已完成</a
        >
      </li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <li v-for="todo in filteredTodos" :key="todo.id">
          <label class="todoList_label">
            <input
              class="todoList_input"
              type="checkbox"
              :checked="todo.status"
              @change="toggleStatus(todo.id)"
            />
            <span>{{ todo.content }}</span>
          </label>
          <img src="/src/assets/icons/delete.svg" @click="deleteTodo(todo.id)" />
        </li>
      </ul>
      <div class="todoList_statistics">
        <p>{{ pendingTodosCount }} 個待完成項目 | {{ completedTodosCount }} 個已完成項目</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('/src/assets/css/TodoListItemStyle.css');
</style>
