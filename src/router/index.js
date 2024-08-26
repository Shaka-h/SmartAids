import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Connected from '@/views/Connected.vue'
import beneficieriesRouter from '@/views/Beneficieries/beneficieriesRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
