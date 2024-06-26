<template>
  <div class="flex justify-between">
    <div class="sidePost flex flex-col p-10 space-y-10">
      <div class="font-bold flex justify-center">My</div>

      <template v-for="(tab, index) of follows" :key="index">
        <button class="primary2-action-btn mx-1" v-if="tab.id === activeTab">
          {{ tab.name }}
        </button>
        <button class="primary-action-btn mx-1 " v-else @click="activeTab = tab.id">
          {{ tab.name }}
        </button>
      </template>
    </div>

    <div class="post ">
      <div class=" justify-between">
        <div v-if="activeTab === 'posts'" >
          <div v-if="listItem.length" class="row w-full ">
            <div v-for="(post, index) of listItem" :key="index" class="col-md-5 ml-5 mt-5 flex bg-gray-200 flex-col justify-between  rounded-lg">
              <div>
                <div v-html="post.postData.description" class=""></div>
                <img :src="`http://127.0.0.1:8080/ipfs/${post.postData.post}`" class="rounded-lg h-64"></img>
                <div class="flex space-x-4 m-4">
                  <div class="flex space-x-2">
                    <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                    <div>{{ post[6] }}</div>
                  </div>
                  <div class="flex space-x-2">
                    <div><svg-icon :name="'like'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                    <div>{{ post[4] }}</div>
                  </div>
                  <div class="flex space-x-2">
                    <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                    <div>{{ post[5] }}</div>
                  </div>
                  <div class="flex space-x-2">
                    <!-- <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div> -->
                    <div>{{ new Date(post[7] * 1000).toLocaleString() }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!listItem.length">
            <EmptyPage :message="'You Have No Published Tweets'"></EmptyPage>
          </div>
        </div>
        <div v-if="activeTab === 'discussions'">
          <EmptyPage :message="'You Have No Published Discussions'"></EmptyPage>
        </div>
        <div v-if="activeTab === 'presentations'">
          <EmptyPage :message="'You have No Published Presentations'"></EmptyPage>
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
import { getSignerContract } from '../../scripts/ContractUtils';
import EmptyPage from '@/components/shared/emptyPage.vue';

let { socialMedia_contract } = getSignerContract();

const alphaConnectStore = useAlphaConnectStore();
const router = useRoute()

// Define posts as a reactive reference
const props = defineProps(['profileContract'])
const { getStoreItem } = storeToRefs(alphaConnectStore)

const listItem = computed(() => {
  return getStoreItem.value("myPosts")
})
const activeTab = ref("posts")

const follows = ref([
    {
        name: "Tweets",
        id: 'posts'
    },
    {
        name: "Discussions",
        id: 'discussions'
    },
    {
        name: "Presentations",
        id: 'presentations'
    },
    
    
])

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