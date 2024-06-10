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
                    <div class="text-4xl font-mono text-white w-10"><img width="100%"
                            src="/src/assets/images/eGAlogo.png" alt=""></div>
                    <div class="">{{ post.owner }}</div>
                    <div class="">{{ post.date }}</div>
                </div>
            </div>

            <div class="flex items-center space-x-2 mt-2">
                <div><svg-icon :name="'like'" class="icon cursor-pointer p-2" color="#020202"></svg-icon></div>
                <div class="font-bold">0</div>
                <div><svg-icon :name="'dislike'" class="icon cursor-pointer p-2" color="#020202"></svg-icon></div>
            </div>
        </div>

        <div class="p-4">
            <div class="text-2xl font-bold">{{ post.title }}</div>
        </div>
    </div>

    <div class="border p-4 mt-4">
        <div>
            Hello everyone , I've noticed that the offer function uses the .call{value: amount}("") method to send Ether
            to the recipient's address.

            Could anyone provide insight into whether this function is indeed vulnerable to reentrancy and suggest any
            best practices or modifications to mitigate such risks?
        </div>
        <div class="p-2 border bg-gray-400 mt-4">
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
        </div>
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
                <div v-if="resource.type === 'link'">
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

                <div v-if="resource.type === 'code'" class="">
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
import PostAnswerForm from "@/views/Discussion/MakeDiscussionForm.vue";

const currentresources = ref("all1")
const resource = ref(
    {
        title: "Reentrancyll.sol",
        type: "code",
        data: "function _offer(address to, uint256 amount) internal ",
        resourceId: "all1"
    },
)
const showCard = ref(false);
const post = ref(
    {
        title: "Reentrancy vulnerability",
        date: "May 23 ,2024",
        owner: "shaka",
        id: 1
    }
);

const postAnswer = () => {
    showCard.value = true
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

</script>