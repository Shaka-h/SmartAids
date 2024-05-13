<template>
    <div class=""> 
      <CommentForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;"></CommentForm>

        <div>
            <div class="font text-2xl">POSTS</div>
            <div class="mt-8 row gap-40" > 
                <div class="col-md-6">
                    <div v-for="(post, index) of listItem" :key="index" class="col-md-12 border cursor-pointer items-center flex flex-col mb-8 mt-4 rounded-lg" >  
                      <div> 
                        <div class="flex space-x-4 mt-4 items-center"> 
                          <div v-if="!post?.image" class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
                            <img src="@/assets/images/profile.png"  alt="Profile picture">
                          </div>
                  
                          <div v-if="post?.image" class=" intro-x ">
                            <img :src="`http://127.0.0.1:8080/ipfs/${post?.image}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
                          </div>
                  
                          <span class="mr-2 font-bold">{{ post?.owner }}</span>
                        </div>
                        <div v-html="post.postData.description" class=""></div>
                        <img :src="`http://127.0.0.1:8080/ipfs/${post.postData.post}`" class="rounded-lg h-64 w-full "></img>
                        <div class="flex space-x-4 m-4"> 
                          <div @click="commentPost(post)" class="flex space-x-2">
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

                <div class="col-md-4">
                  <div class=""> 
                    <div class="font text-2xl">COMMENTS</div> 
                    <div v-for="(comment, index) of comments" :key="index" class="col-md-12 flex flex-col border-b-4 border-gray-600 justify-center mb-8 mt-4 rounded-lg" > 
                     
                      <div> 
                        <div class="flex space-x-4 mt-4 items-center"> 
                          <div v-if="!comment?.commentorImage" class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
                            <img src="@/assets/images/profile.png"  alt="Profile picture">
                          </div>
                  
                          <div v-if="comment?.commentorImage" class=" intro-x ">
                            <img :src="`http://127.0.0.1:8080/ipfs/${comment?.commentorImage}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
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
    </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import {nftMyProfile_ABI} from '@/scripts/ContractConstants'
import {ethers} from 'ethers';
import CommentForm from "@/views/Post/Comments/CommentForm.vue"
import CommentList from "@/views/Post/Comments/CommentList.vue"

let {signer, nftProfileFactory_contract, socialMedia_contract} = getSignerContract();
const router = useRoute()

// Define posts as a reactive reference
const posts = ref([]);
const postDetails = ref();
const showCard = ref(false)
const selectedPost = ref()
const postComments = ref()
const props = defineProps(['profileContract'])
const listItem = ref()
const nftMyProfile_contract = ref()
const profile = ref()
const comments = ref([]);

const commentPost = (post) => {
  showCard.value = true
  selectedPost.value = parseInt(post?.PostId)
};

const fetchToken = async (tokenURI) => {
  try {
    const response = await fetch(`http://127.0.0.1:8080/ipfs/${tokenURI}`);
    const data = await response.json();
    return data

    // Handle data as needed
  } catch (error) {
    console.error('Error fetching data from', router?.params?.tokenId, ':', error);
    // Handle error
  }

};

onMounted( async () => {
  const getMyPosts = await socialMedia_contract.fetchAllPostsCreated()
  posts.value = getMyPosts

  nftMyProfile_contract.value = new ethers.Contract(posts.value[0]?.profileContract, nftMyProfile_ABI, signer);  

  profile.value = await nftProfileFactory_contract.profileByAddressOwner(router?.params?.wallet);

  const promises = posts.value.map(async (post) => {
    let postUrl = await nftMyProfile_contract.value.getPostsURIById(parseInt(post.PostId._hex));
    const responseData = await fetchToken(postUrl);
    const image = await fetchToken(profile.value.profileUrl)

    let timestamp = parseInt(post);
    let readableDate = new Date(timestamp * 1000).toLocaleString();

    if (typeof post === 'object') {
      return { 
        ...post, 
        hex: parseInt(post._hex),
        timestamp: readableDate,
        postUrl: postUrl,
        postData: responseData,
        owner: profile.value?.username,
        image: image?.photoCID
      };
    } 
    else {
      return post;
    }
  });

  listItem.value = await Promise.all(promises);
  postComments.value = listItem.value[0]
  posts.value = listItem;


  const comm = await socialMedia_contract.getAllCommentsMadeToPost(postComments.value?.PostId)
  console.log(comments.value);
  const commentTxt = comm.map(async (comment) => {
    let commentsUrl = await fetchToken(comment.commentUrl)
    let commentor = await nftProfileFactory_contract.profileByAddressOwner(comment?.commentor);
    let image = await fetchToken(commentor?.profileUrl)
    let timestamp = parseInt(comment?.time);
    let readableDate = new Date(timestamp * 1000).toLocaleString();

    if (typeof comment === 'object') {
      return { 
        ...comment,
        timestamp: readableDate,
        commentTxt: commentsUrl,
        commentorName: commentor?.username,
        commentorImage: image?.photoCID
      };
    } 
    else {
      return comment;
    }
  });

  comments.value = await Promise.all(commentTxt);
  console.log(comments.value, "commmm");
})
</script>