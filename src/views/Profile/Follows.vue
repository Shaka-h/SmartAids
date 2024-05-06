<template>
    <div class="flex flex-col p-4 h-full rounded-lg" style="background-color: #40128B42">
        <BusinessCard :open-dialog="addEditTestimonials" @close-dialog="addEditTestimonials = false;"></BusinessCard>

        <div class="flex">
            <template v-for="(tab, index) of follows" :key="index">
              <button class="primary2-action-btn mx-1" v-if="tab.id === activeTab">
                {{ tab.name }}
              </button>
              <button class="primary-action-btn mx-1" v-else @click="activeTab = tab.id">
                {{ tab.name }}
              </button>
            </template>
        </div>

        <div class="mt-4">
            <div v-if="activeTab === 'followers'">
                <div v-for="(follow, index) of followersList" :key="index" class="bg-gradient border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow.name }}</div>
                    <div class="hover:border-b cursor-pointer">follow</div>
                </div>
            </div>

            <div v-if="activeTab === 'following'">
                <div v-for="(follow, index) of followingList" :key="index" class="bg-gradient hover:bg-blue border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow.name }}</div>
                    <div class="hover:border-b cursor-pointer">Unfollow</div>
                </div>
            </div>
            <div v-if="activeTab === 'cards'">
                <div @click="viewProfile()" v-for="(follow, index) of followingList" :key="index" class="bg-gradient hover:bg-blue border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow.name }}</div>
                    <div class="cursor-pointer">
                        <svg-icon :name="'download3'" class="icon cursor-pointer" color="#020202"></svg-icon>
                    </div>
                </div>
            </div>
            <!-- <div class="p-2 mt-8 mx-8 cursor-pointer">
                <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>
            </div> -->
        </div>
    
    </div>
  
</template>

<script setup>
import { ref } from "vue"
import SvgIcon from "@/components/shared/SvgIcon.vue";
import BusinessCard from "@/views/Profile/BusinessCard.vue"

const activeTab = ref("followers")
const addEditTestimonials = ref(false)

const viewProfile = () => {
  addEditTestimonials.value = true
};

const follows = ref([
  {
    name: "Followers",
    id: 'followers'
  },
  {
    name: "Following",
    id: 'following'
  },
  {
    name: "Business Cards",
    id: 'cards'
  },
])

const followersList = ref([
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    }
])

const followingList = ref([
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    }
])
</script>
