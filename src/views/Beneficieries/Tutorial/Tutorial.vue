<template>
  <div class="">
    <MakeTutorialForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></MakeTutorialForm>
    <div v-if="listItem?.length">
      <div class="border p-4 flex justify-between itenms-center">
        <div class="flex flex-row space-x-4 items-center">
          <div><svg-icon :name="'data'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
          <div class="text-2xl font-bold">TUTORIALS</div>
        </div>
        <div class="flex cursor-pointer flex-row space-x-4 items-center">
          <div><svg-icon :name="'add'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
          <div  @click="MakeDiscussion()" class="">New</div>
        </div>
      </div>
    </div>
        <div v-if="listItem?.length">
          <div v-for="(tutorial, index) of listItem" :key="index"
            class="border mt-4 flex flex-row space-x-4 items-center" >
            <div class="flex flex-col justify-between border-r-4 p-4">
              <div class="flex items-center">
                <div><svg-icon :name="'comment'" class="icon border-b-4 p-2" color="#020202"></svg-icon>
                </div>
                <div class="flex">{{ tutorial?.resources }}</div>
              </div>
              <div class="flex items-center">
                <div v-if="!tutorial?.liked"><svg-icon :name="'like'" class="icon p-2"
                    color="#020202"></svg-icon></div>
                <div v-if="tutorial?.liked"><svg-icon :name="'likefill'" class="icon p-2"
                    color="#020202"></svg-icon></div>
                <div>{{ tutorial?.like }}</div>
              </div>
            </div>
            <div @click="viewTutorial(tutorial)" class="cursor-pointer w-full">
              <div class="text-2xl font-bold">{{ tutorial?.tutorialData?.name }}</div>
              <div class="flex space-x-4 items-center mt-4">
                <div class="text-4xl font-mono text-white w-10">
                  <img :src="`http://127.0.0.1:8080/ipfs/${tutorial.image}`" class="rounded-lg"></img>
                </div>
                <div class="">{{ tutorial.owner }}</div>
                <div class="">{{ tutorial.timestamp }}</div>
              </div>
            </div>
          </div>
    
          <div>
    
          </div>
        </div>
    
        <div v-if="!listItem?.length" class="h-full flex items-center justify-center text-center p-2">
          <span class="font-semibold text-base">NO TUTORIAL AVAILABLE</span>
        </div>
      </div>
      </template>
      
      
      <script setup>
      import { ref, onMounted, computed, onBeforeMount } from 'vue';
      import SvgIcon from "@/components/shared/SvgIcon.vue";
      import { getSignerContract } from '../../../scripts/ContractUtils';
      import { useRouter } from 'vue-router';
      import { useAlphaConnectStore } from "@/store/index.js";
      import { storeToRefs } from "pinia";
      import MakeTutorialForm from "@/views/Beneficieries/Tutorial/MakeTutorialForm.vue";
      
      let { tutorial_contract } = getSignerContract();
      const router = useRouter()
      const alphaConnectStore = useAlphaConnectStore();
      
      const showCard = ref(false)
      const selectedPost = ref()
      const props = defineProps(['profileContract'])
      const { getStoreItem } = storeToRefs(alphaConnectStore)
      
      const listItem = computed(() => {
        return getStoreItem.value("allTutorials")
      })

      const MakeDiscussion = () => {
          showCard.value = true
      };
      
      const viewTutorial = (tutorial) => {
        console.log(tutorial);
        router.push(`/tutorial/${tutorial?.tutorialTokenId}`)
      };
      
      
      onBeforeMount(async () => {
      
        await alphaConnectStore.loadAllTutorials(await alphaConnectStore.getConnectedAddress());
      
        // await alphaConnectStore.loadPostsComments(1);
      
        console.log(await alphaConnectStore.getConnectedAddress(), "wallet connected");
      
      })
      
      onMounted(async () => {
        tutorial_contract.on("TutorialCreated", async () => {
          await alphaConnectStore.loadAllTutorials(await alphaConnectStore.getConnectedAddress());
        })
      
        // socialMedia_contract.on("commentMade", async () => {
        //   await alphaConnectStore.loadPostsComments(1);
        //   await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
        // })
      
        tutorial_contract.on("TutorialLiked", async () => {
          await alphaConnectStore.loadAllTutorials(await alphaConnectStore.getConnectedAddress());
        })
      
      })
      </script>