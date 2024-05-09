<template>
    <div class="font-bold">My posts</div>
    <div class="row justify-between">
      <div v-for="(post, index) of listItem" :key="index" class="col-md-6 flex flex-col justify-between  rounded-lg" > 
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
import { ref, onMounted } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import {nftMyProfile_ABI} from '@/scripts/ContractConstants'
import {ethers} from 'ethers';

let {signer, nftProfileFactory_contract, socialMedia_contract} = getSignerContract();
const router = useRoute()

// Define posts as a reactive reference
const posts = ref([]);
const postDetails = ref();
const profileContract = ref()
const props = defineProps(['profileContract'])
const listItem = ref()
const nftMyProfile_contract = ref()

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

  console.log(responseData, "yuio");

  return responseData; // Return the array of response data
};

onMounted( async () => {
  const getMyPosts = await socialMedia_contract.fetchMyPostsCreated()
  posts.value = getMyPosts
  console.log(posts.value, "posts");

  nftMyProfile_contract.value = new ethers.Contract(props?.profileContract, nftMyProfile_ABI, signer);  
  console.log(nftMyProfile_contract.value, "jamaniii")

  const promises = posts.value.map(async (post) => {
    let postUrl = await nftMyProfile_contract.value.getPostsURIById(parseInt(post.PostId._hex));
    console.log(postUrl, "postUrl"); 
    const responseData = await fetchToken(postUrl);
    console.log(responseData, "responseData");

    let timestamp = parseInt(post);
    let readableDate = new Date(timestamp * 1000).toLocaleString();

    if (typeof post === 'object') {
      return { 
        ...post, 
        hex: parseInt(post._hex),
        timestamp: readableDate,
        postUrl: postUrl,
        postData: responseData
      };
    } 
    else {
      return post;
    }

    // const result = [...post];
    // const responseData = await fetchToken(parseInt(post.PostId));
    // result.push(responseData);
    // console.log(result, "trial");
    // return result;
  });

  listItem.value = await Promise.all(promises);
  console.log(listItem.value, "list");

  posts.value = listItem;


  // await fetchData().then((responseData) => {
  //     console.log('All response data:', responseData);
  //     itemData.value = responseData
  // });


})
  </script>
  