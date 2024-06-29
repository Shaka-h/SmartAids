<template>
  <div>
    <MakeDiscussionForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></MakeDiscussionForm>

    <div class="flex cursor-pointer flex-row space-x-4 items-center">
      <div><svg-icon :name="'add'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
      <div  @click="MakeDiscussion()" class="">New</div>
    </div>

    <div v-if="listItem.length" class=" w-full ">
      <div v-for="(discussion, index) of listItem" :key="index"
        class="border mt-4 flex flex-row space-x-4 items-center" >
        <div class="flex flex-col justify-between border-r-4 p-4">
          <div class="flex items-center">
            <div><svg-icon :name="'comment'" class="icon border-b-4 p-2" color="#020202"></svg-icon>
            </div>
            <div class="flex">{{ discussion?.answer }}</div>
          </div>
          <div class="flex items-center">
            <div v-if="!discussion?.liked"><svg-icon :name="'like'" class="icon p-2"
                color="#020202"></svg-icon></div>
            <div v-if="discussion?.liked"><svg-icon :name="'likefill'" class="icon p-2"
                color="#020202"></svg-icon></div>
            <div>{{ discussion?.like }}</div>
          </div>
        </div>
        <div @click="viewDiscussion(discussion)" class="cursor-pointer w-full">
          <div class="text-2xl font-bold">{{ discussion?.postData?.name }}</div>
          <div class="flex space-x-4 items-center mt-4">
            <!-- <div class="text-4xl font-mono text-white w-10">
              <img :src="`http://127.0.0.1:8080/ipfs/${discussion.image}`" class="rounded-lg"></img>
            </div> -->
            <div class="">{{ discussion.owner }}</div>
            <div class="">{{ discussion.timestamp }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!listItem.length">
      <EmptyPage :message="'You have No Published Presentations'"></EmptyPage>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useAlphaConnectStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';
import { walletAddressConnected, walletConnected } from "@/scripts/ContractConstants";
import { getSignerContract } from '../../../scripts/ContractUtils';
import EmptyPage from '@/components/shared/emptyPage.vue';
import MakeDiscussionForm from "@/views/Discussion/MakeDiscussionForm.vue";
import { useRouter } from 'vue-router';

let { tutorial_contract } = getSignerContract();

const alphaConnectStore = useAlphaConnectStore();
const showCard = ref(false)
const selectedPost = ref()
const router = useRouter()

// Define posts as a reactive reference
const props = defineProps(['profileContract'])
const { getStoreItem } = storeToRefs(alphaConnectStore)

const listItem = computed(() => {
  return getStoreItem.value("myTutorials")
})

const MakeDiscussion = () => {
    showCard.value = true
};

const viewDiscussion = (tutorial) => {
  console.log(tutorial);
  router.push(`/tutorial/${tutorial?.tutorialId}`)
};


onBeforeMount(async () => {
  await alphaConnectStore.loadMyTutorials(await alphaConnectStore.getConnectedAddress());
})

onMounted(async () => {
  // tutorial_contract.on("AnswerLiked", async () => {
  //   await alphaConnectStore.loadMyTutorials(await alphaConnectStore.getConnectedAddress());
  // })

  // tutorial_contract.on("AnswerMade", async () => {
  //   await alphaConnectStore.loadMyTutorials(await alphaConnectStore.getConnectedAddress());
  // })

  tutorial_contract.on("DiscussionLiked", async () => {
    await alphaConnectStore.loadMyTutorials(await alphaConnectStore.getConnectedAddress());
  })

  tutorial_contract.on("TutorialCreated", async () => {
    await alphaConnectStore.loadMyTutorials(await alphaConnectStore.getConnectedAddress());
  })

})
</script>

<style scoped>
.post{
  width: 75%;
  height: 100vh;
}
.sidePost{
  width: 20%;
  height: 100vh;
  background-color: rgb(214, 210, 210);

}
@media (max-width: 991.98px) {
  .post{
      width: 100%;
  }
  .sidePost{
      width: 0%;
  }
}
</style>