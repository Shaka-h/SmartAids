<template>
    <div v-if="myProfile?.length">
        <div class="border p-4 flex justify-between itenms-center">
        <div class="flex flex-row space-x-4 items-center">
            <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
            <div class="text-2xl font-bold">MY ACCOUNT</div>
        </div>
        
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

        </div>

        <div class="mt-4">
            <div v-if="activeTab === 'all'" class="flex justify-center">
                <div class="rounded-lg  w-2/3" style="background-color: #40128B42">
                    <Details />
                </div>
            </div>

            <div v-if="activeTab === 'followers'">
                <div class="">
                    <Follows />
                </div>
            </div>

            <div v-if="activeTab === 'following'">
                <div class="">
                    <MyPosts :profile-contract="myProfile[0]?.profileContract"/>
                </div>
            </div>
            
             
        </div>
        
    </div>

    <div v-if="!myProfile?.length" class="flex justify-center items-center">
    <div class="px-4 w-full bg-gray-300 h-full flex justify-center items-center">
        <NoProfile></NoProfile>
    </div>
    </div>

   
</template>

<script setup>
import Follows from './Follows.vue';
import Details from './Details.vue';
import MyPosts from './MyPosts/MyPosts.vue'
import { onMounted, ref, computed } from 'vue';
import {getSignerContract} from '../../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import ProfileForm from '@/views/Beneficieries/Profile/ProfileForm.vue'
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import NoProfile from './NoProfile.vue';

const alphaConnectStore = useAlphaConnectStore();
const makeAPost = ref(false)
const { getStoreItem } = storeToRefs(alphaConnectStore)
const activeTab = ref("all")

// const myProfile = computed(() => {
//   return getStoreItem.value("myProfile").map(profile => {
//     return {
//         ...profile,
//         profileContract: `${profile[0]?.profileContract}`
//     }
//   })
// })

const follows = ref([
    {
        name: "Profile",
        id: 'all'
    },
    {
        name: "My Network",
        id: 'followers'
    },
    {
        name: "My Posts",
        id: 'following'
    },
    
])

const myProfile = computed(() => {
  return getStoreItem.value("myProfile")
})



onMounted(async () => {
    await alphaConnectStore.loadMyProfile(alphaConnectStore.getConnectedAddress()); 
});

</script>

<style scoped>
.detail{
    width: 70%;
}
.follow{
    width: 30%;
}
@media (max-width: 991.98px) {
    .detail{
        width: 100%;
    }
    .follow{
        width: 0%;
    }
}
</style>