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
        <div class="font-bold text-2xl">ANSWERS</div>
        <div @click="postAnswer()" class="justify-end flex border p-2 rounded-lg bg-primary cursor-pointer">Post Answer
        </div>
    </div>
    <div class="flex items-center border mt-2">
        <div class=" border-r-2 flex flex-col p-2">
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

        <div class="p-2">
            <div class="">
                I've noticed that the offer function uses the .call{value: amount}("") method to send Ether to the
                recipient's address.
            </div>
        </div>
    </div>

</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import PostAnswerForm from "@/views/Discussion/MakeDiscussionForm.vue";

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

</script>