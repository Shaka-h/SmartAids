<template>
  <div class="">
    <CommentForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></CommentForm>

    <div v-if="listItem?.length">
      <div class="font text-2xl">POSTS</div>
      <div class="mt-8 row gap-40">
        <div class="col-md-6">
          <div v-for="(post, index) of listItem" :key="index"
            class="col-md-12 border cursor-pointer items-center flex flex-col mb-8 mt-4 rounded-lg">
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
              <div class="flex space-x-4 m-4">
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

        <div class="col-md-4">
          <div class="">
            <div class="font text-2xl">COMMENTS</div>
            <div v-for="(comment, index) of comments" :key="index"
              class="col-md-12 flex flex-col border-b-4 border-gray-600 justify-center mb-8 mt-4 rounded-lg">

              <div>
                <div class="flex space-x-4 mt-4 items-center">
                  <div v-if="!comment?.commentorImage"
                    class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
                    <img src="@/assets/images/profile.png" alt="Profile picture">
                  </div>

                  <div v-if="comment?.commentorImage" class=" intro-x ">
                    <img :src="`http://127.0.0.1:8080/ipfs/${comment?.commentorImage}`" class="w-10 h-10 rounded-full"
                      alt="Profile picture" />
                  </div>

                  <span class="mr-2 font-bold">{{ comment?.commentorName }}</span>
                  <div class="flex space-x-2">
                    <div>{{ comment?.timestamp }}</div>
                  </div>
                </div>
                <div v-html="comment.commentTxt?.comment" class="mt-4"></div>
              </div>
            </div>
          </div>
          <!-- <CommentList :selected-post="postComments"></CommentList> -->
        </div>

      </div>

    </div>

    <div v-if="!listItem?.length" class="h-full flex items-center justify-center text-center p-2">
      <span class="font-semibold text-base">NO POSTS AVAILABLE</span>
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
import { walletAddressConnected, walletConnected } from "@/scripts/ContractConstants";

let { signer, nftProfileFactory_contract, socialMedia_contract } = getSignerContract();
const router = useRoute()
const alphaConnectStore = useAlphaConnectStore();

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
  showCard.value = true
  selectedPost.value = parseInt(post?.PostId)
};

const likePost = async (post) => {
  try {
    const likePost = await socialMedia_contract.likePost(
      parseInt(post?.PostId)
    )

    let like = await likePost.wait()
    console.log(like);

    window.location.reload();

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

    window.location.reload();

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

onBeforeMount(async () => {

  await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());

  await alphaConnectStore.loadPostsComments(1);

  console.log(await alphaConnectStore.getConnectedAddress(), "wallet connected");

})

onMounted(async () => {
  socialMedia_contract.on("PostCreated", async () => {
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  })

  socialMedia_contract.on("commentMade", async () => {
    await alphaConnectStore.loadPostsComments(1);
  })

})
</script>