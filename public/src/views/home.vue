<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
})

function logout() {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/')
}
</script>

<template>
  <div class="home">
    <h1>Epy To Do</h1>

    <nav>
      <template v-if="isLoggedIn">
        <RouterLink to="/todo">Todo</RouterLink>
        <button class="logout-btn" @click="logout">Log Out</button>
      </template>
      <template v-else>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.home {
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin-bottom: 2rem;
  color: var(--text);
}

nav {
  display: flex;
  gap: 2rem;
}

nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 2rem;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

nav a:hover {
  border-bottom: 2px solid var(--accent);
}

.logout-btn {
  background-color: red;
  color: var(--text);
  border: none;
  font-size: 1.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-btn:hover {
  background-color: darkred;
}
</style>
