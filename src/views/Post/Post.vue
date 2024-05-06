<template>
    <div class=""> 
        <div>
            <div class="font text-2xl">POSTS</div>
            <div class="mt-8 row" > 
                <div class="col-md-8">
                    <div v-for="(post, index) of posts" :key="index" class="col-md-12 flex flex-col justify-center mb-8 mt-4 rounded-lg" > 
                      <div>{{ post.details }}</div>
                      <div> 
                          <div class="">
                              <img :src="post.image" class="rounded-lg h-64 "></img>
                          </div>
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

                <div class="col-md-4">
                    <div class="font text-2xl">COMMENTS</div>
                    <div v-for="(post, index) of posts" :key="index" class="col-md-12 flex flex-col border-b-4 border-gray-600 justify-center mb-8 mt-4 rounded-lg" > 
                      <div>{{ post.details }}</div>
                      <div> 
                          <div v-if="post.image" class="">
                              <img :src="post.image" class="rounded-lg h-64 "></img>
                          </div>
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
    </div>
</template>

  
<script setup>
import { ref } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";

// Define posts as a reactive reference
const posts = ref([
  {
    postId: "123",
    details: "Welcome to all to the upcoming blockchain event in Tanzania on May 26th, Dar-es-Salaam",
    image: "/src/assets/images/landing/landing4.jpg",
    comment: 2,
    likes: 3,
    unlikes: 3
  },
  {
    postId: "124",
    details: "Join us for an exciting discussion on the future of decentralized finance (DeFi)!",
    comment: 5,
    likes: 10,
    unlikes: 3
  },
  {
    postId: "124",
    details: "Join us for an exciting discussion on the future of decentralized finance (DeFi)!",
    image: "/src/assets/images/landing/landing4.jpg",
    comment: 5,
    likes: 10,
    unlikes: 3
  }
]);
</script>