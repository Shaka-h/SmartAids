<template>
    <div class=""> 
        <div>
            <div class="font text-2xl">NEWS</div>
            <div class="p-2 flex justify-end mx-8 cursor-pointer">
                <NewsForm @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></NewsForm>
              </div>
            <div class="mt-8 row" > 
                <div @click="viewNews(post.postId)" v-for="(post, index) of posts" :key="index" class="col-md-5 flex flex-col justify-center border m-4 p-4 cursor-pointer mt-4 rounded-lg" > 
                    <div class="font-bold">{{ post.title }}</div>{{ post.postId }}
                    <div class="mt-2 ">
                        <img :src="post.image" class="rounded-lg h-64 "></img>
                    </div>
                    <div> 
                        <div class="mt-2 ">{{ post.details }}</div>
                    </div>
                  </div>

            </div>
    
        </div>
    </div>
</template>

  
<script setup>
import { ref } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import NewsForm from '@/views/News/NewsForm.vue';
import { useRouter } from 'vue-router';

const makeAPost = ref(false)
const router = useRouter()

const viewNews = (postId) => {
  router.push(`/news/${postId}`)
}
// Define posts as a reactive reference
const posts = ref([
  {
    postId: "123",
    title: "eGA Annual Conference 2024",
    details: "Welcome to all to the upcoming blockchain event in Tanzania on May 26th, Dar-es-Salaam",
    image: "/src/assets/images/landing/landing4.jpg",
    comment: 2,
    likes: 3,
    unlikes: 3
  },
  {
    postId: "124",
    title: "eGA Annual Conference 2024",
    details: "Join us for an exciting discussion on the future of decentralized finance (DeFi)!",
    image: "/src/assets/images/landing/landing4.jpg",
    comment: 5,
    likes: 10,
    unlikes: 3
  },
  {
    postId: "124",
    title: "eGA Annual Conference 2024",
    details: "Join us for an exciting discussion on the future of decentralized finance (DeFi)!",
    image: "/src/assets/images/landing/landing4.jpg",
    comment: 5,
    likes: 10,
    unlikes: 3
  }
]);
</script>