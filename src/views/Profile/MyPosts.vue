<template>
  <div class="font-bold">My posts</div>
  <div class="row justify-between">
    <div v-for="(post, index) of listItem" :key="index" class="col-md-6 flex flex-col justify-between  rounded-lg">
      <div>
        <div v-html="post.postData.description" class=""></div>
        <img :src="`http://127.0.0.1:8080/ipfs/${post.postData.post}`" class="rounded-lg h-64 w-full "></img>
        <div class="flex space-x-4 m-4">
          <div class="flex space-x-2">
            <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
            <div>{{ post[4] }}</div>
          </div>
          <div class="flex space-x-2">
            <div><svg-icon :name="'like'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
            <div>{{ post[5] }}</div>
          </div>
          <div class="flex space-x-2">
            <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
            <div>{{ post[6] }}</div>
          </div>
          <div class="flex space-x-2">
            <!-- <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div> -->
            <div>{{ new Date(post[7] * 1000).toLocaleString() }}</div>
          </div>
        </div>
      </div>
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

const alphaConnectStore = useAlphaConnectStore();
const router = useRoute()

// Define posts as a reactive reference
const props = defineProps(['profileContract'])
const { getStoreItem } = storeToRefs(alphaConnectStore)

const listItem = computed(() => {
  return getStoreItem.value("myPosts")
})

onMounted(async () => {
  const connectedAddress = await alphaConnectStore.getConnectedAddress()
  const posts = await alphaConnectStore.loadMyPosts(connectedAddress);
  console.log(posts, "hallleellll");

})

onBeforeMount(async () => {
  await alphaConnectStore.loadMyPosts(await alphaConnectStore.getConnectedAddress());
})

onMounted(async () => {
  socialMedia_contract.on("PostCreated", async () => {
    await alphaConnectStore.loadMyPosts(await alphaConnectStore.getConnectedAddress());
  })

  socialMedia_contract.on("commentMade", async () => {
    await alphaConnectStore.loadMyPosts(await alphaConnectStore.getConnectedAddress());
  })

  socialMedia_contract.on("PostLiked", async () => {
    await alphaConnectStore.loadMyPosts(await alphaConnectStore.getConnectedAddress());
  })

})
</script>