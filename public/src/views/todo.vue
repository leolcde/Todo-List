<script setup>
import { ref, onMounted } from 'vue'
import { addTask } from '@/services/tasks'
import { removeTask } from '@/services/tasks'
import { updateTaskStatus } from '@/services/tasks'
import { getTasks } from '@/services/tasks'

const title = ref('')
const description = ref('')
const due_time = ref('')
const tasks = ref([])
const error = ref('')
const token = localStorage.getItem('token')

onMounted(async () => {
  tasks.value = await getTasks(token)
})

async function handleAddTask() {
  error.value = ''
  try {
    await addTask(title.value, description.value, due_time.value, token)
    tasks.value = await getTasks(token)
    title.value = ''
    description.value = ''
    due_time.value = ''
  } catch (err) {
    error.value = err.message
  }
}

async function handleRemoveTask(task_id) {
  error.value = ''
  try {
    await removeTask(task_id)
    tasks.value = await getTasks(token)
  } catch (err) {
    error.value = err.message
  }
}

async function toggleTask(task) {
  if (task.status == 'done') {
    await updateTaskStatus(task.id, token, 'todo')
  }
  if (task.status == 'todo') {
    await updateTaskStatus(task.id, token, 'done')
  }
  tasks.value = await getTasks(token)
}
</script>


<template>
  <div class="tasks">
    <div class="form-container">
      <h1>📝 Todo List</h1>
      <form @submit.prevent="handleAddTask">
      <input
        v-model="title"
        placeholder="Title"
        required
      />
      <input
        v-model="description"
        placeholder="Description"
      />
      <input
        type="datetime-local"
        v-model="due_time"
        placeholder="Due time"
        required
      />
      <button type="submit">Add</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
      </form>
    </div>
    <ul class="tasks-list">
      <li
        v-if="tasks.length > 0"
        v-for="task in tasks"
        :key="task.id"
        :class="{ done: task.status == 'done' }"
      >
        <div class="text-container">
          <span @click="toggleTask(task)">{{ task.title }}</span>
          <p>{{ task.description }}</p>
        </div>
        <button @click="handleRemoveTask(task.id)">❌</button>
      </li>
      <p v-else class="no-tasks">No tasks.</p>
    </ul>
  </div>
</template>


<style scoped>

.tasks {
  margin-top: 7rem;
  display: flex;
  flex-direction: row;
  gap: 10rem;
}

.form-container {
min-height: 80vh;
max-width: 360px;
text-align: center;
color: var(--text);
}

.form-container h1 {
text-align: center;
margin-bottom: 2rem;
font-size: 2rem;
}

.form-container input {
width: 100%;
padding: 0.6rem 0.5rem;
margin-bottom: 1.5rem;
background: transparent;
border: none;
border-bottom: 1px solid var(--border);
color: var(--text);
font-size: 1rem;
outline: none;
}

.form-container button {
background-color: var(--accent);
color: black;
padding: 0.6rem 1rem;
margin-bottom: 3rem;
font-weight: 600;
border: none;
border-radius: 8px;
cursor: pointer;
width: 100%;
transition: background-color 0.2s ease;
}

.form-container button:hover {
background-color: #2eaf74;
}

.tasks-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-auto-rows: minmax(min-content, max-content);
  align-items: stretch;
  column-gap: 5%;
  row-gap: 5rem;
  border: var(--border) 2px solid;
  border-radius: 8px;
  padding: 5rem 5rem 0 5rem;
  width: 70%;
}

.tasks-list li {
  display: flex;
  align-self: flex-start;
  height: 100%;
  padding: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 2rem 1rem 2rem 2rem;
  color: var(--text);
}

.tasks-list button {
  align-self: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 2rem;
}

.no-tasks {
  color: var(--text);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 3rem;
}

.tasks-list .text-container {
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1;
}

.tasks-list span {
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  word-break: break-word;
}

.tasks-list li p {
  font-style: italic;
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  word-break: break-word;
}

.tasks-list li.done span {
  text-decoration: line-through;
  color: #999;
}
</style>
