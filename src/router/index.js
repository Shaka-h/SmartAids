import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Connected from '@/views/Connected.vue'
import Profile from '@/views/Profile/Profile.vue'
import Post from '@/views/Post/Post.vue'
import Setting from '@/views/Setting.vue'
import news from '@/views/News/news.vue'
import NewsDetails from '@/views/News/newsDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/', // Dynamic segment for wallet address
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
          path: '/news/:newsId',
          name: 'newsDetail',
          component: NewsDetails 
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting
        },
        {
          path: 'discussion',
          name: 'discussion',
          component: Setting
        },
        {
          path: 'qna',
          name: 'qna',
          component: Setting
        },
        {
          path: 'tutorial',
          name: 'tutorial',
          component: Setting
        },
        {
          path: 'presentation',
          name: 'presentation',
          component: Setting
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: Setting
        }
      ]
    }
  ]
});

export default router
