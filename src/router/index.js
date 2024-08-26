import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Connected from '@/views/Connected.vue'
import beneficieriesRouter from '@/views/Beneficieries/beneficieriesRouter'
import Login from '@/views/register/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Login
    },
    ...beneficieriesRouter

    // {
    //   path: '/', // Dynamic segment for wallet address
    //   name: 'landing',
    //   component: Connected,
    //   children: [
    //     ...beneficieriesRouter
    //   ]
    // }
  ]
});

export default router
