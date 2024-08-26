<template>
    <PostAnswerForm :discussion-id="discussionId" :open-dialog="showCard" @close-dialog="showCard = false;">
    </PostAnswerForm>
    <div class="flex mt-4 justify-start w-full">
        <div class="rounded-md cursor-pointer intro-x flex items-center" @click="goBack">
            <div><svg-icon :name="'back'" class="icon cursor-pointer p-2 w-8" color="#020202"></svg-icon></div>
            Back
        </div>
    </div>

    <div class="flex items-center border">
        <div class=" border-r-2 flex flex-col p-4">
            <div class="flex items-center space-x-2">
                <div class="flex space-x-4 items-center mt-4">
                    <div class="text-4xl font-mono text-white w-10">
                        <img :src="`http://127.0.0.1:8080/ipfs/${discussion?.image}`" class="rounded-lg"></img>
                        </div>
                    <div class="">{{ discussion?.owner }}</div>
                </div>
            </div>

            <div  class="flex space-x-4 mt-4">
                <div @click="likeDiscussion(discussion)" class="flex space-x-2">
                  <div v-if="!discussion?.liked"><svg-icon :name="'like'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div v-if="discussion?.liked"><svg-icon :name="'likefill'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div>{{ discussion?.like }}</div>
                </div>
                <div @click="unLikeDiscussion(discussion)" class="flex space-x-2">
                  <div v-if="!discussion?.unliked"><svg-icon :name="'dislike'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div v-if="discussion?.unliked"><svg-icon :name="'dislikefill'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div>{{ discussion?.dislike }}</div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <div class="text-2xl font-bold">{{ discussion?.discussionData?.name }}</div>
            <div class="mt-4">{{ discussion?.timestamp }}</div>
        </div>
    </div>

    <div class="border p-4 mt-4">
        <div v-html="discussion?.discussionData?.description">
        </div>
        <!-- <div class="p-2 border bg-gray-400 mt-4">
            <div class="w-full hover:text-blue flex justify-end cursor-pointer">
                <span class="">copy</span>
                <div><svg-icon name="copy" class="icon cursor-pointer p-2" color="#020202"></svg-icon></div>
            </div>
            <div>
                function _offer(address to, uint256 amount) internal {

                balance -= amount;

                (bool success, ) = to.call{value: amount}("");
                if (!success) {
                revert TransferFailed(address(0), address(this), to, amount);
                }
                }
            </div>
        </div> -->
    </div>

    <div class="mt-8 flex justify-between items-center">
        <div class="font-bold text-2xl flex items-center">
            <span>ANSWERS</span>
            <span class="ml-4 flex items-center"> <span>(</span>{{ answers?.length }}<span>)</span> </span>
        </div>
        <div @click="postAnswer()" class="justify-end flex border p-2 rounded-lg bg-primary cursor-pointer">Post Answer
        </div>
    </div>
    <div v-for="(answer, index) of answers" :key="index" class="flex items-center border mt-2">
        <div class=" border-r-2 flex flex-col py-2 px-4">
            <div class="flex items-center space-x-2">
                <div class="flex space-x-4 items-center mt-4">
                    <div class="text-4xl font-mono text-white w-10">
                        <img :src="`http://127.0.0.1:8080/ipfs/${answer?.answerorImage}`" class="rounded-lg"></img>
                        </div>
                    <div class="">{{ answer.answerorName }}</div>
                    
                </div>
            </div>

            <div class="flex items-center space-x-2 mt-2">
                <div @click="likeAnswer(answer)" class="flex space-x-2">
                    <div v-if="!answer?.liked"><svg-icon :name="'like'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div v-if="answer?.liked"><svg-icon :name="'likefill'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div>{{ answer?.like }}</div>
                </div>
                <div @click="unLikeAnswer(answer)" class="flex space-x-2">
                    <div v-if="!answer?.unliked"><svg-icon :name="'dislike'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div v-if="answer?.unliked"><svg-icon :name="'dislikefill'" class="icon cursor-pointer"
                        color="#020202"></svg-icon></div>
                    <div>{{ answer?.dislike }}</div>
                </div>
            </div>
        </div>

        <div class="py-2 px-4">
            <div class="">
                <div class="mb-2">{{ answer?.timestamp }}</div>
                <div v-html="answer?.answerTxt?.answer" class=""></div>
            </div>
        </div>
    </div>

</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import PostAnswerForm from "@/views/Beneficieries/Discussion/PostAnswerForm.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAlphaConnectStore } from "@/store/index.js";
import { getSignerContract } from '../../../scripts/ContractUtils';

const route = useRoute();
let { discussion_contract } = getSignerContract();
const showCard = ref(false);
const discussionId = ref();

const alphaConnectStore = useAlphaConnectStore();
const { getStoreItem } = storeToRefs(alphaConnectStore)

const discussion = computed(() => {
  return getStoreItem.value("currentDiscussion")
})

const postAnswer = () => {
    showCard.value = true
    discussionId.value = route?.params?.discussionId
};

const answers = computed(() => {
  return getStoreItem.value("discussionAnswers")
})


const likeDiscussion = async (discussion) => {
    console.log(discussion, "gfyrefguy");
  try {
    const likeDiscussion = await discussion_contract.likeDiscussion(
        discussion.discussionId,
    )

    let like = await likeDiscussion.wait()
    console.log(like);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

const unLikeDiscussion = async (discussion) => {
  try {
    const unLikeDiscussion = await discussion_contract.unLikeDiscussion(
        discussion.discussionId,
    )

    let unlike = await unLikeDiscussion.wait()
    console.log(unlike);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};


const likeAnswer = async (answer) => {
    console.log(parseInt(answer?.answerID), route?.params?.discussionId);
  try {
    const likeAnswer = await discussion_contract.likeAnswer(
        parseInt(answer?.answerID),
        route?.params?.discussionId
    )

    let like = await likeAnswer.wait()
    console.log(like);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

const unLikeAnswer = async (answer) => {
  try {
    const unLikeAnswer = await discussion_contract.unLikeAnswer(
        parseInt(answer?.answerID),
        route?.params?.discussionId
    )

    let unlike = await unLikeAnswer.wait()
    console.log(unlike);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

onBeforeMount(async () => {
    await alphaConnectStore.loadADiscussion(await alphaConnectStore.getConnectedAddress(), route?.params?.discussionId);
    await alphaConnectStore.loadDiscussionAnswers(route?.params?.discussionId);

})

onMounted(async () => {
    discussion_contract.on("AnswerMade", async () => {
        await alphaConnectStore.loadDiscussionAnswers(route?.params?.discussionId);
    })

    discussion_contract.on("DiscussionLiked", async () => {
        await alphaConnectStore.loadADiscussion(await alphaConnectStore.getConnectedAddress(), route?.params?.discussionId);
    })

    discussion_contract.on("AnswerLiked", async () => {
        await alphaConnectStore.loadDiscussionAnswers(route?.params?.discussionId);
    })

})

</script>