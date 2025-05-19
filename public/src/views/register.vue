<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const name = ref('')
const firstname = ref('')
const router = useRouter()

async function handleRegister() {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        firstname: firstname.value
      })
    })
    router.push('/signup_page')
  } catch (err) {
    console.error('ERREUR inscription', err)
  }
}

</script>

<template>
<div class="form-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
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
    <input
        v-model="name"
        type="name"
        placeholder="Name"
        required
    />
    <input
        v-model="firstname"
        type="firstname"
        placeholder="Firstname"
        required
    />
    <button type="submit">Sign Up</button>
    </form>
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
