<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([])

function addTask() {
  if (newTask.value.trim() !== '') {
    tasks.value.push({
      text: newTask.value,
      done: false
    })
    newTask.value = ''
  }
}

function removeTask(index) {
  tasks.value.splice(index, 1)
}

function toggleTask(index) {
  tasks.value[index].done = !tasks.value[index].done
}
</script>

<template>
  <div class="text">
    <h1>📝 EpyTodo List</h1>

    <div class="input-group">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Ajoute une tâche..."
      />
      <button
        @click="addTask">Ajouter
      </button>
    </div>
    <ul class="task-list">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        :class="{ done: task.done }"
      >
        <span @click="toggleTask(index)">{{ task.text }}</span>
        <button @click="removeTask(index)">❌</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  padding-top: 2rem;
  text-align: center;
  font-family: sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #42b983;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.task-list li.done span {
  text-decoration: line-through;
  color: #999;
}

.task-list span {
  cursor: pointer;
  flex: 1;
  text-align: left;
}
</style>
