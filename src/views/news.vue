<template>
    <div class=""> 
        <div>
            <div class="font text-2xl">NEWS</div>
            <div class="mt-8 row" > 
                <div v-for="(post, index) of posts" :key="index" class="col-md-5 flex flex-col justify-center border m-4 p-4 cursor-pointer mt-4 rounded-lg" > 
                    <div class="font-bold">{{ post.title }}</div>
                    <div class="mt-2 ">
                        <img :src="post.image" class="rounded-lg h-64 "></img>
                    </div>
                    <div> 
                        <div class="mt-2 ">{{ post.details }}</div>
                        <div class="flex space-x-4 m-4"> 
                          <div class="flex space-x-2">
                            <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                            <div>{{ post.comment }}</div>
                          </div>
                          <div class="flex space-x-2">
                            <div><svg-icon :name="'like'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                            <div>{{ post.likes }}</div>
                          </div>
                          <div class="flex space-x-2">
                            <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                            <div>{{ post.unlikes }}</div>
                          </div>
                        </div>
                    </div>
                  </div>

            </div>
    
        </div>
    </div>
</template>

  
<script setup>
import { ref } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";

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