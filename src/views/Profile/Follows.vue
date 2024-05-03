<template>
    <div class="flex flex-col p-4 h-full" style="background-color: blanchedalmond">

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
                <div v-for="(follow, index) of followersList" :key="index" class="bg-pink border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow.name }}</div>
                    <div class="hover:border-b cursor-pointer">follow</div>
                </div>
            </div>

            <div v-if="activeTab === 'following'">
                <div v-for="(follow, index) of followingList" :key="index" class="bg-pink border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow.name }}</div>
                    <div class="hover:border-b cursor-pointer">Unfollow</div>
                </div>
            </div>
        </div>
    
    </div>
  
</template>

<script setup>
import { ref } from "vue"

const activeTab = ref("followers")

const follows = ref([
  {
    name: "Followers",
    id: 'followers'
  },
  {
    name: "Following",
    id: 'following'
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
