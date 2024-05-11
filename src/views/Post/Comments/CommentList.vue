<template>
    <div class=""> 
        <div class="font text-2xl">COMMENTS</div>{{ comments }}
        <div v-for="(comment, index) of comments" :key="index" class="col-md-12 flex flex-col border-b-4 border-gray-600 justify-center mb-8 mt-4 rounded-lg" > 
          <div>{{ comment.details }}</div>
          <div> 
              <div v-if="comment.image" class="">
                  <img :src="comment.image" class="rounded-lg h-64 "></img>
              </div>
              <div class="flex space-x-4 m-4"> 
                <div class="flex space-x-2">
                  <div><svg-icon :name="'comment'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                  <div>{{ comment.comment }}</div>
                </div>
                <div class="flex space-x-2">
                  <div><svg-icon :name="'like'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                  <div>{{ comment.likes }}</div>
                </div>
                <div class="flex space-x-2">
                  <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div>
                  <div>{{ comment.unlikes }}</div>
                </div>
                <div class="flex space-x-2">
                  <div>time</div>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>

  
<script setup>
import { ref, onMounted, watch } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {getSignerContract} from '../../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import {nftMyProfile_ABI} from '@/scripts/ContractConstants'
import {ethers} from 'ethers';

let {signer, nftProfileFactory_contract, socialMedia_contract} = getSignerContract();
const router = useRoute()

// Define comments as a reactive reference
const comments = ref([]);
const props = defineProps(['selectedPost'])
const postId = ref()
const nftMyProfile_contract = ref()
const profile = ref()



const fetchToken = async (tokenURI) => {
  try {
    const response = await fetch(`http://127.0.0.1:8080/ipfs/${tokenURI}`);
    const data = await response.json();
    console.log('Data for', tokenURI, ':', data);
    return data

    // Handle data as needed
  } catch (error) {
    console.error('Error fetching data from', router?.params?.tokenId, ':', error);
    // Handle error
  }

};

watch(() => props.selectedPost, (value) => {
    if (value){
        console.log(parseInt(value?.PostId), "props.selectedPost");
        postId.value = parseInt(value?.PostId)
    }
})

const getAllCommentsMadeTocomment = async () => {
    comments.value = await socialMedia_contract.getAllCommentsMadeToPost(postId.value)

}
onMounted( async () => {
    await getAllCommentsMadeTocomment()
    console.log(comments.value, "come 2");

//   const getAllCommentsMadeTocomment = await socialMedia_contract.getAllCommentsMadeToPost(postId.value)
//   comments.value = getAllCommentsMadeTocomment
//   console.log(props.selectedPost, "commentsyeleuwiiiiiiiiiiiiiiiiiiiiiiiii");

//   const promises = comments.value.map(async (comment) => {
//     let commentUrl = await nftMyProfile_contract.value.getcommentsURIById(parseInt(comment.commentId._hex));
//     console.log(commentUrl, "commentUrl"); 
//     const responseData = await fetchToken(commentUrl);
//     console.log(responseData, "responseData");
//     const image = await fetchToken(profile.value.profileUrl)

//     let timestamp = parseInt(comment);
//     let readableDate = new Date(timestamp * 1000).toLocaleString();

//     if (typeof comment === 'object') {
//       return { 
//         ...comment, 
//         hex: parseInt(comment._hex),
//         timestamp: readableDate,
//         commentUrl: commentUrl,
//         commentData: responseData,
//         owner: profile.value?.username,
//         image: image?.photoCID
//       };
//     } 
//     else {
//       return comment;
//     }
//   });

//   listItem.value = await Promise.all(promises);
//   console.log(listItem.value, "list");

//   comments.value = listItem;
})
</script>