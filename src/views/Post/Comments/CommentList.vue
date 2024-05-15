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

})
</script>