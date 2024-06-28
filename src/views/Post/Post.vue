<template>
  <div class="">
    <CommentForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></CommentForm>
    <div class="border p-3 flex justify-between itenms-center">
      <div class="flex flex-row space-x-4 items-center">
        <div><svg-icon :name="'testimonials'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
        <div class="text-2xl font-bold">POSTS</div>
      </div>
      
    </div>
    <div v-if="listItem?.length">
    

      <div class="flex justify-between overflow-hidden">
        <div class="posts">
          <div v-for="(post, index) of listItem" :key="index"
            class="col-md-12 border items-center flex flex-col mb-8 mt-4 rounded-lg">
            <div>
              <div class="flex space-x-4 mt-4 items-center">
                <div v-if="!post?.image"
                  class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
                  <img src="@/assets/images/profile.png" alt="Profile picture">
                </div>

                <div v-if="post?.image" class=" intro-x ">
                  <img :src="`http://127.0.0.1:8080/ipfs/${post?.image}`" class="w-10 h-10 rounded-full"
                    alt="Profile picture" />
                </div>

                <span class="mr-2 font-bold">{{ post?.owner }}</span>
              </div>
              <div v-html="post.postData.description" class=""></div>
              <img :src="`http://127.0.0.1:8080/ipfs/${post.postData.post}`" class="rounded-lg h-64 "></img>
              <div  class="flex space-x-4 m-4">
                <div @click="commentPost(post)" class="flex space-x-2">
                  <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
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
        </div>

        <div class="comments" :style="commentsList">
          <CommentsList :selected-post="selectedPost" @show-comments="showComments=false"></CommentsList>
         </div>

      </div>

    </div>

    <div v-if="!listItem?.length" class="h-full flex items-center justify-center text-center p-2">
      <EmptyPage :message="'NO POSTS AVAILABLE'"></EmptyPage>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { getSignerContract } from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import CommentForm from "@/views/Post/Comments/CommentForm.vue"
import { useAlphaConnectStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import CommentsList from "@/views/Post/Comments/CommentsList.vue";
import { walletAddressConnected, walletConnected } from "@/scripts/ContractConstants";
import EmptyPage from '@/components/shared/emptyPage.vue';

let { signer, nftProfileFactory_contract, socialMedia_contract } = getSignerContract();
const router = useRoute()
const alphaConnectStore = useAlphaConnectStore();
const showComments = ref(false)
// Define posts as a reactive reference
const posts = ref([]);
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

const comments = computed(() => {
  return getStoreItem.value("postComments")
})

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

  await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());

  // await alphaConnectStore.loadPostsComments(1);

  console.log(await alphaConnectStore.getConnectedAddress(), "wallet connected");

})

onMounted(async () => {
  socialMedia_contract.on("PostCreated", async () => {
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  })



  socialMedia_contract.on("PostLiked", async () => {
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  })

})
</script>

<style scoped>
.posts{
  width: 50%;
}

.comments{
  width: 0%;
  transition: width 0.5s;
  background-color: #786A92;
}
</style>