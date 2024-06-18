<template>
    <div class="p-2">
      <CommentForm :selected-post="props?.selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></CommentForm>       
            <div class="">
                <div class="cursor-pointer flex justify-end overflow-hidden mb-4">
                    <div class="text-red cursor-pointer" @click="closeComments()">          
                        <div>
                            <svg-icon name="close" class="icon cursor-pointer w-5 h-5" color="#a91926"></svg-icon>
                        </div>
                </div>
                </div>
                <!-- <div v-if="props?.selectedPost">
                    <div class="flex space-x-4 mt-4 items-center">
                      <div v-if="!props?.selectedPost?.image"
                        class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
                        <img src="@/assets/images/profile.png" alt="Profile picture">
                      </div>
      
                      <div v-if="props?.selectedPost?.image" class=" intro-x ">
                        <img :src="`http://127.0.0.1:8080/ipfs/${props?.selectedPost?.image}`" class="w-10 h-10 rounded-full"
                          alt="Profile picture" />
                      </div>
      
                      <span class="mr-2 font-bold">{{ props?.selectedPost?.owner }}</span>
                    </div>
                    <div v-html="props?.selectedPost.postData.description" class=""></div>
                    
                </div> -->
   
              <div class="flex justify-between">
                <div class="font text-2xl">COMMENTS</div>
                <div @click="commentPost()" class="cursor-pointer flex justify-end overflow-hidden">
                    <div class="border p-1 bg-primary rounded-lg">Add Comment</div>
                </div>
              </div>
              
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
  
   
  
      <div v-if="!comments?.length" class="lex items-center justify-center text-center p-2">
        <span class="font-semibold text-base">NO COMMENTS AVAILABLE</span>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
  import SvgIcon from "@/components/shared/SvgIcon.vue";
  import { getSignerContract } from '../../../scripts/ContractUtils';
  import { useRoute } from 'vue-router';
  import CommentForm from "@/views/Post/Comments/CommentForm.vue"
  import { useAlphaConnectStore } from "@/store/index.js";
  import { storeToRefs } from "pinia";
  import { walletAddressConnected, walletConnected } from "@/scripts/ContractConstants";
  
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
  const props = defineProps(['selectedPost'])
  const emits = defineEmits(['showComments'])
  const nftMyProfile_contract = ref()
  const profile = ref()
  const { getStoreItem } = storeToRefs(alphaConnectStore)

  const post = ref(props?.selectedPost)
  
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


  const closeComments = () => {
    emits('showComments', true);
  };

  watch(() => props?.selectedPost, async (value) => {
    await alphaConnectStore.loadPostsComments(value?.PostId);
    console.log(value, "humming aiiiiiooiiooi");
  })

  onBeforeMount(async () => {
  
    await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
  
    await alphaConnectStore.loadPostsComments(props?.selectedPost?.PostId);
  
    console.log(await alphaConnectStore.getConnectedAddress(), "wallet connected");
  
  })
  
  onMounted(async () => {
    socialMedia_contract.on("PostCreated", async () => {
      await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());
    })
  
    socialMedia_contract.on("commentMade", async () => {
      await alphaConnectStore.loadPostsComments(props?.selectedPost?.PostId);
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
    background-color: #0D104283;
  }
  </style>