<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <h1>Epy To Do</h1>

    <nav>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
</style>
