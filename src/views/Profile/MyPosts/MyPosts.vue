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
                <div  class="flex space-x-4 m-4">
                  <div @click="commentPost(post)" class="flex space-x-2">
                    <div><svg-icon :name="'comment'" class="icon " color="#020202"></svg-icon></div>
                    <div>{{ post?.comment }}</div>
                  </div>
                  <div @click="likePost(post)" class="flex space-x-2">
                    <div v-if="!post.liked"><svg-icon :name="'like'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div v-if="post.liked"><svg-icon :name="'likefill'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div>{{ post?.like }}</div>
                  </div>
                  <div @click="unLikePost(post)" class="flex space-x-2">
                    <div v-if="!post.unliked"><svg-icon :name="'dislike'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div v-if="post.unliked"><svg-icon :name="'dislikefill'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div>{{ post?.dislike }}</div>
                  </div>
                  <div class="flex space-x-2">
                    <!-- <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div> -->
                    <div>{{ new Date(post[7] * 1000).toLocaleString() }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="comments" :style="commentsList">
              <CommentsList :selected-post="selectedPost" @show-comments="showComments=false"></CommentsList>
             </div> -->
          </div>
          <div v-if="!listItem.length">
            <EmptyPage :message="'You Have No Published Tweets'"></EmptyPage>
          </div>
        </div>
        
        <div v-if="activeTab === 'discussions'">
          <MyDiscussions></MyDiscussions>
        </div>
        <div v-if="activeTab === 'tutorial'">
          <MyTutorials></MyTutorials>
        </div>
        <div v-if="activeTab === 'presentations'">
          <EmptyPage :message="'This module is still in development'"></EmptyPage>
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
import { getSignerContract } from '../../../scripts/ContractUtils';
import EmptyPage from '@/components/shared/emptyPage.vue';
import MyDiscussions from './MyDiscussions.vue';
import MyTutorials from './MyTutorials.vue';

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
const showComments = ref(false)
const selectedPost = ref()

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
        name: "Tutorial",
        id: 'tutorial'
    },
    {
        name: "Presentations",
        id: 'presentations'
    },
    
    
])

const commentPost = (post) => {
  showComments.value = true
  // showCard.value = true
  // selectedPost.value = parseInt(post?.PostId)
  selectedPost.value = post

};

const likePost = async (post) => {
  try {
    const likePost = await socialMedia_contract.likePost(
      parseInt(post?.PostId)
    )

    let like = await likePost.wait()
    console.log(like);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

const unLikePost = async (post) => {
  try {
    const unLikePost = await socialMedia_contract.unLikePost(
      parseInt(post?.PostId)
    )

    let like = await unLikePost.wait()
    console.log(like);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

const commentsList = computed(() => {
  return { width:  !showComments.value ? '0%' : '40%' }
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