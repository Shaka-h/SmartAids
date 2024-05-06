import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Connected from '@/views/Connected.vue'
import Profile from '@/views/Profile/Profile.vue'
import Post from '@/views/Post/Post.vue'
import Setting from '@/views/Setting.vue'
import news from '@/views/news.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:wallet', // Dynamic segment for wallet address
      name: 'landing',
      component: Connected,
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        },
        {
          path: 'posts',
          name: 'post',
          component: Post
        },
        {
          path: 'news',
          name: 'news',
          component: news 
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting
        }
      ]
    }
  ]
});

export default router
