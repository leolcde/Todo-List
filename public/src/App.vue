<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
  <RouterView />

  <RouterLink to="/" class="logo">
    <div class="bar"></div>
    <div class="text_logo">ETD</div>
  </RouterLink>

  <p class="copyright">© Created by Jules & Leo</p>
</template>

<style scoped>
.logo {
  position: absolute;
  top: 1rem;
  left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  z-index: 1000;
}

.bar {
  width: 5px;
  height: 50px;
  background-color: var(--accent);
  margin-top: 4px;
  margin-right: 15px;
  border-radius: 2px;
}

.text_logo{
  font-weight: 700;
  font-size: 3rem;
  color: var(--text);
  letter-spacing: 0.1em;
  user-select: none;
}

.copyright {
  color: var(--text);
  font-style: italic;
  position: sticky;
  text-align: center;
  bottom: -100px;
}
</style>
