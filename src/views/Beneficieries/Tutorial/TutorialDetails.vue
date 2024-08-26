<template>
    <PostAnswerForm :selected-post="selectedPost" :open-dialog="showCard" @close-dialog="showCard = false;">
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
                        <img :src="`http://127.0.0.1:8080/ipfs/${tutorial?.image}`" class="rounded-lg"></img>
                        </div>
                    <div class="">{{ tutorial?.owner }}</div>
                </div>
            </div>

            <div  class="flex space-x-4 mt-4">
                <div @click="likeTutorial(tutorial)" class="flex space-x-2">
                  <div v-if="!tutorial?.liked"><svg-icon :name="'like'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div v-if="tutorial?.liked"><svg-icon :name="'likefill'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div>{{ tutorial?.like }}</div>
                </div>
                <div @click="unLikeTutorial(tutorial)" class="flex space-x-2">
                  <div v-if="!tutorial?.unliked"><svg-icon :name="'dislike'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div v-if="tutorial?.unliked"><svg-icon :name="'dislikefill'" class="icon cursor-pointer"
                      color="#020202"></svg-icon></div>
                  <div>{{ tutorial?.dislike }}</div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <div class="text-2xl font-bold">{{ tutorial?.tutorialData?.name }}</div>
            <div class="mt-4">{{ tutorial?.timestamp }}</div>

        </div>
    </div>

    <div class="border p-4 mt-4">
        <div v-html="tutorial?.tutorialData?.description">
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
                }S
                }
            </div>
        </div> -->
    </div>

    <div class="mt-8 flex justify-between items-center">
        <div class="font-bold text-2xl">RESOURCES</div>
        <div @click="postAnswer()" class="justify-end flex border p-2 rounded-lg bg-primary cursor-pointer">Upload
            Resource
        </div>
    </div>
    <div v-if="resources.length" style="background-color: rgba(255,255,255,0.35)" class="items-center border mt-2">
        <div class="row ">
            <div class="col-md-3 ">
                <div class=" border-b border-r cursor-pointer p-4"
                    @click="view(resource)" v-for="(resource, index) of resources" :key="index"
                    :style="{ backgroundColor: currentresources === resource?.resourceId ? 'rgba(108,70,195,0.22)' : ' #E8E8E8' }">
                    <div class="flex flex-wrap space-x-4 items-center">
                        <div class="">{{ index + 1 }}.</div>
                        <div class="">{{ resource.title }}</div>
                    </div>
                </div>
            </div>

            <div  class="col-md-9 p-2">
                <div v-if="resource?.type === 'link'">
                    <div class="flex items-center space-x-2 mt-2">
                        <div><svg-icon :name="'like'" class="icon cursor-pointer p-1" color="#020202"></svg-icon></div>
                        <div class="font-bold">0</div>
                        <div><svg-icon :name="'dislike'" class="icon cursor-pointer p-1" color="#020202"></svg-icon>
                        </div>
                    </div>
                    <div class="">
                        I've noticed that the offer function uses the .call{value: amount}("") method to send Ether to
                        the
                        recipient's address.
                    </div>
                </div>

                <div v-if="resource?.type === 'code'" class="">
                    <div class="w-full hover:text-blue flex justify-end cursor-pointer">
                        <span class="">copy</span>
                        <div><svg-icon name="copy" class="icon cursor-pointer p-2" color="#020202"></svg-icon></div>
                    </div>
                    <div>
                        {{resource.data}}
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import PostAnswerForm from "@/views/Beneficieries/Discussion/MakeDiscussionForm.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAlphaConnectStore } from "@/store/index.js";
import { getSignerContract } from '../../../scripts/ContractUtils';

const route = useRoute();
let { tutorial_contract } = getSignerContract();
const showCard = ref(false);
const tutorialId = ref();

const alphaConnectStore = useAlphaConnectStore();
const { getStoreItem } = storeToRefs(alphaConnectStore)

const tutorial = computed(() => {
  return getStoreItem.value("currentTutorial")
})

const postAnswer = () => {
    showCard.value = true
    tutorialId.value = route?.params?.tutorialId
};

const answers = computed(() => {
  return getStoreItem.value("discussionAnswers")
})


const likeTutorial = async (tutorial) => {
    console.log(tutorial, "gfyrefguy");
  try {
    const likeTutorial = await tutorial_contract.likeDiscussion(
        tutorial.tutorialId,
    )

    let like = await likeTutorial.wait()
    console.log(like);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

const unLikeTutorial = async (tutorial) => {
  try {
    const unLikeTutorial = await tutorial_contract.unLikeDiscussion(
        tutorial.tutorialId,
    )

    let unlike = await unLikeTutorial.wait()
    console.log(unlike);

  } catch (error) {
    console.error('Error creating collection:', error);
  }
};



const view = (resource) => {
    currentresources.value = resource?.resourceId
    console.log(resource);
    resource.value = resource
    console.log(resource.value.title);
}

const resources = ref([
    {
        title: "Reentrancy1.sol",
        type: "code",
        data: "function _offer(address to, uint256 amount) internal ",
        resourceId: "all1"
    },
    {
        title: "Reentrancy2.sol",
        type: "link",
        data: "function _offer(address to, uint256 amount) internal ",
        resourceId: "all2"
    },
    {
        title: "Reentrancy3.sol",
        type: "image",
        data: "function _offer(address to, uint256 amount) internal ",
        resourceId: "all3"
    },
    {
        title: "Reentrancy.sol",
        type: "video",
        data: "function _offer(address to, uint256 amount) internal ",
        resourceId: "all4"
    }
])

onBeforeMount(async () => {
    await alphaConnectStore.loadATutorial(await alphaConnectStore.getConnectedAddress(), route?.params?.tutorialId);
    // await alphaConnectStore.loadDiscussionAnswers(route?.params?.tutorialId);

})

onMounted(async () => {
    // discussion_contract.on("AnswerMade", async () => {
    //     await alphaConnectStore.loadDiscussionAnswers(route?.params?.tutorialId);
    // })

    tutorial_contract.on("TutorialLiked", async () => {
        await alphaConnectStore.loadATutorial(await alphaConnectStore.getConnectedAddress(), route?.params?.tutorialId);
    })

    // discussion_contract.on("AnswerLiked", async () => {
    //     await alphaConnectStore.loadDiscussionAnswers(route?.params?.tutorialId);
    // })

})

 

</script>