<template>
  <div class="">
    <MakeDiscussionForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></MakeDiscussionForm>

    <div v-if="listItem?.length">
      <div class="border p-4 flex justify-between itenms-center">
        <div class="flex flex-row space-x-4 items-center">
          <div><svg-icon name="category" class="icon cursor-pointer" color="#020202"></svg-icon></div>
          <div class="text-2xl font-bold">EXPERT Q&A</div>
        </div>
        <div class="flex cursor-pointer flex-row space-x-4 items-center">
          <div><svg-icon :name="'add'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
          <div  @click="MakeDiscussion()" class="">New</div>
        </div>
      </div>

      <div v-for="(post, index) of posts" :key="index"
        class="border mt-4 flex flex-row space-x-4 cursor-pointer items-center" @click="viewQnA(post)">
        <div class="flex flex-col justify-between border-r-4 p-4">
          <div class="flex items-center">
            <div><svg-icon :name="'comment'" class="icon cursor-pointer border-b-4 p-2" color="#020202"></svg-icon>
            </div>
            <div class="flex">0</div>
          </div>
          <div class="flex items-center">
            <div><svg-icon :name="'like'" class="icon cursor-pointer p-2" color="#020202"></svg-icon></div>
            <div class="flex">0</div>
          </div>
        </div>
        <div>
          <div class="text-2xl font-bold">{{ post.title }}</div>
          <div class="flex space-x-4 items-center mt-4">
            <div class="text-4xl font-mono text-white w-10"><img width="100%" src="/src/assets/images/eGAlogo.png"
                alt=""></div>
            <div class="">{{ post.owner }}</div>
            <div class="">{{ post.date }}</div>
          </div>
        </div>
      </div>

      <div>

      </div>
    </div>

    <div v-if="listItem?.length" class="h-full flex items-center justify-center text-center p-2">
      <span class="font-semibold text-base">NO POSTS AVAILABLE</span>
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

let { signer, nftProfileFactory_contract, socialMedia_contract } = getSignerContract();
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
  return getStoreItem.value("allPosts")
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

const viewQnA = (discussion) => {
  router.push(`/qna/${discussion.id}`)
};


onBeforeMount(async () => {

  await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());

  // await alphaConnectStore.loadPostsComments(1);

  console.log(await alphaConnectStore.getConnectedAddress(), "wallet connected");

})

onMounted(async () => {
  socialMedia_contract.on("PostCreated", async () => {
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  })

  socialMedia_contract.on("commentMade", async () => {
    // await alphaConnectStore.loadPostsComments(1);
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  })

  socialMedia_contract.on("PostLiked", async () => {
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  })

})
</script>