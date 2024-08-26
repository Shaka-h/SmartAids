import Connected from '@/views/Connected.vue'
import Profile from '@/views/Beneficieries/Profile/Profile.vue'
import Post from '@/views/Beneficieries/Post/Post.vue'
import Setting from '@/views/Beneficieries/Setting.vue'
import Discussion from '@/views/Beneficieries/Discussion/Discussion.vue'
import DiscussionDetails from '@/views/Beneficieries/Discussion/DiscussionDetails.vue'
import QnA from '@/views/Beneficieries/QnA/QnA.vue'
import QnADetails from '@/views/Beneficieries/QnA/QnADetails.vue'
import Tutorial from '@/views/Beneficieries/Tutorial/Tutorial.vue'
import TutorialDetails from '@/views/Beneficieries/Tutorial/TutorialDetails.vue'
import news from '@/views/Beneficieries/News/news.vue'
import NewsDetails from '@/views/Beneficieries/News/newsDetails.vue'
import BeneficieriesMain from '@/views/Beneficieries/BeneficieriesMain.vue'

export default [
    {
        path: "/beneficieries",
        component: BeneficieriesMain,
        meta: {
            profileType: 'BENEFICIERIES',
        },
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
              component: Discussion
            },
            {
              path: '/discussion/:discussionId',
              name: 'discussionDetail',
              component: DiscussionDetails 
            },
            {
              path: 'qna',
              name: 'qna',
              component: QnA
            },
            {
              path: '/qna/:qnaId',
              name: 'qnaDetail',
              component: QnADetails 
            },
            {
              path: 'tutorial',
              name: 'tutorial',
              component: Tutorial
            },
            {
              path: '/tutorial/:tutorialId',
              name: 'tutorialDetail',
              component: TutorialDetails 
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
    },
];
