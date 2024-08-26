<template>
  <div class="">
    <MakeDiscussionForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></MakeDiscussionForm>
    <div class="border p-4 flex justify-between itenms-center">
      <div class="flex flex-row space-x-4 items-center">
        <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
        <div class="text-2xl font-bold">DISCUSSIONS</div>
      </div>
      <div class="flex cursor-pointer flex-row space-x-4 items-center">
        <div><svg-icon :name="'add'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
        <div  @click="MakeDiscussion()" class="">New</div>
      </div>
    </div>

    <div v-if="listItem?.length">
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
          <div class="text-2xl font-bold">{{ discussion?.discussionData?.name }}</div>
          <div class="flex space-x-4 items-center mt-4">
            <div class="text-4xl font-mono text-white w-10">
              <img :src="`http://127.0.0.1:8080/ipfs/${discussion.image}`" class="rounded-lg"></img>
            </div>
            <div class="">{{ discussion.owner }}</div>
            <div class="">{{ discussion.timestamp }}</div>
          </div>
        </div>
      </div>

      <div>

      </div>
    </div>

    <div v-if="!listItem?.length" class="h-full flex items-center justify-center text-center p-2">
      <span class="font-semibold text-base">NO DISCUSSION AVAILABLE</span>
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
import MakeDiscussionForm from "@/views/Beneficieries/Discussion/MakeDiscussionForm.vue";

let { signer, nftProfileFactory_contract, socialMedia_contract, discussion_contract } = getSignerContract();
const router = useRouter()
const alphaConnectStore = useAlphaConnectStore();

// Define posts as a reactive reference
const posts = ref([
  {
    title: "Reentrancy vulnerability",
    date: "May 23 ,2024",
    owner: "shaka",
    id: 1
  }
]);
const postDetails = ref();
const showCard = ref(false)
const selectedPost = ref()
const postComments = ref()
const props = defineProps(['profileContract'])
const nftMyProfile_contract = ref()
const profile = ref()
const { getStoreItem } = storeToRefs(alphaConnectStore)

const listItem = computed(() => {
  return getStoreItem.value("allDiscussions")
})

const post = ref(
    {
        title: "Reentrancy vulnerability",
        date: "May 23 ,2024",
        owner: "shaka",
        id: 1
    }
);

const MakeDiscussion = () => {
    showCard.value = true
};

const viewDiscussion = (discussion) => {
  console.log(discussion);
  router.push(`/discussion/${discussion?.discussionId}`)
};


onBeforeMount(async () => {

  await alphaConnectStore.loadAllDiscussions(await alphaConnectStore.getConnectedAddress());

  // await alphaConnectStore.loadPostsComments(1);

  console.log(await alphaConnectStore.getConnectedAddress(), "wallet connected");

})

onMounted(async () => {
  discussion_contract.on("DiscussionCreated", async () => {
    await alphaConnectStore.loadAllDiscussions(await alphaConnectStore.getConnectedAddress());
  })

  // socialMedia_contract.on("commentMade", async () => {
  //   await alphaConnectStore.loadPostsComments(1);
  //   await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  // })

  // socialMedia_contract.on("PostLiked", async () => {
  //   await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  // })

})
</script>