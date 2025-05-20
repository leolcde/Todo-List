import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import LoginView from '../views/login.vue'
import RegisterView from '../views/register.vue'
import ToDoView from '../views/todo.vue'
import SuccessRegistereView from '../views/success_register.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDoView,
      meta: { requiresAuth: true }
    },
    {
      path: '/success_register',
      name: 'success_register',
      component: SuccessRegistereView,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('justRegistered')) {
          sessionStorage.removeItem('justRegistered')
          next()
        } else {
          next('/')
        }
      }
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) return next('/')

    try {
      await axios.get('/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      next()
    } catch (err) {
      localStorage.removeItem('token')
      next('/')
    }
  } else {
    next()
  }
})

export default router
