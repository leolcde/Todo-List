<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin() {
  error.value = ''
  try {
    const data = await login(email.value, password.value)
    localStorage.setItem('token', data.token)
    router.push('/user_page')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
<div class="form-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
    <input
        v-model="email"
        placeholder="Email"
        required
    />
    <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
    />
    <button type="submit">Log In</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
</div>
</template>

<style scoped>
.form-container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 80vh;
max-width: 360px;
margin: 2rem auto;
text-align: center;
color: var(--text);
}

h1 {
margin-bottom: 2rem;
font-size: 2rem;
}

input {
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

input::placeholder {
color: var(--muted);
}

button {
background-color: var(--accent);
color: black;
padding: 0.6rem 1rem;
font-weight: 600;
border: none;
border-radius: 8px;
cursor: pointer;
width: 100%;
transition: background-color 0.2s ease;
}

button:hover {
background-color: #2eaf74;
}

p {
margin-top: 1.5rem;
font-size: 0.9rem;
}

p a {
color: var(--accent);
text-decoration: none;
}

p a:hover {
text-decoration: underline;
}
</style>
