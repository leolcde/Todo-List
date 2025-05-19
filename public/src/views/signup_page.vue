<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text">
    <h1>You are registered, you can return to the main page to log in.</h1>
  </div>
</template>

<style scoped>
.text {
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
</style>