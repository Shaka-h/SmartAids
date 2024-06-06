<template>
        <div v-if="myProfile.length" class="row h-full p-4" >
            <div class="col-md-10 pr-10 md:w-full detail" style=""> 
                <div class="h-1/2 rounded-lg" style="background-color: #40128B42">
                    <Details />
                </div>
                <div class="mt-8 h-1/2">
                    <MyPosts :profile-contract="myProfile[0]?.profileContract"/>
                </div>
            </div>
    
            <div class="col-md-2 border-l-2 follow">
                <Follows />
            </div>  
        </div>
    
       <div v-if="!myProfile.length" class="flex justify-center h-1/3 items-center">
        <div class="px-4  cursor-pointer ">
            <ProfileForm @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></ProfileForm>
        </div>
       </div>

   
</template>

<script setup>
import Follows from '../Profile/Follows.vue';
import Details from './Details.vue';
import MyPosts from '../Profile/MyPosts.vue'
import { onMounted, ref, computed } from 'vue';
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import ProfileForm from '../../views/Profile/ProfileForm.vue'
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const alphaConnectStore = useAlphaConnectStore();
const makeAPost = ref(false)
const { getStoreItem } = storeToRefs(alphaConnectStore)

// const myProfile = computed(() => {
//   return getStoreItem.value("myProfile").map(profile => {
//     return {
//         ...profile,
//         profileContract: `${profile[0]?.profileContract}`
//     }
//   })
// })
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