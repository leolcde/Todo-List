import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import LoginView from '../views/login.vue'
import RegisterView from '../views/register.vue'
import UserPageView from '../views/user_page.vue'
import SignUpPageView from '@/views/signup_page.vue'

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
      path: '/user_page',
      name: 'user_page',
      component: UserPageView,
    },
    {
      path: '/signup_page',
      name: 'signup_page',
      component: SignUpPageView,
    },
  ],
})

export default router
