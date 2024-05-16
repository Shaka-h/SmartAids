<template>
    <div class="flex flex-col p-4 h-full rounded-lg" style="background-color: #40128B42">
        <BusinessCard :open-dialog="showCard" :selected-card="selectedCard"  @close-dialog="showCard = false; "></BusinessCard>

        <div class="flex">
            <template v-for="(tab, index) of follows" :key="index">
              <button class="primary2-action-btn mx-1" v-if="tab.id === activeTab">
                {{ tab.name }}
              </button>
              <button class="primary-action-btn mx-1" v-else @click="activeTab = tab.id">
                {{ tab.name }}
              </button>
            </template>
        </div>

        <div class="mt-4">
            <div v-if="activeTab === 'all'">
                <div v-for="(profile, index) of allDeployedNFTCollections" :key="index" class="bg-gradient border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ profile[2] }}</div>
                    <div @click="follow(profile)" class="hover:border-b cursor-pointer">follow</div>
                </div>
            </div>

            <div v-if="activeTab === 'followers'">
                <div v-for="(follow, index) of allfollowers" :key="index" class="bg-gradient hover:bg-gray-100 border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow[0][2] }}</div>
                </div>
            </div>

            <div v-if="activeTab === 'following'">
                <div v-for="(follow, index) of allfollowing" :key="index" class="bg-gradient hover:bg-gray-100 border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow[0][2] }}</div>
                </div>
            </div>
            <div v-if="activeTab === 'cards'">
                <div @click="viewProfile(card)" v-for="(card, index) of businessCards" :key="index" class="bg-gradient border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ card[0][2] }}</div>
                    <div class="cursor-pointer hover:bg-white p-1 rounded-lg">
                        <svg-icon :name="'download3'" class="icon cursor-pointer" color="#020202"></svg-icon>
                    </div>
                </div>
            </div>
             
        </div>
    
    </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import BusinessCard from "@/views/Profile/BusinessCard.vue"
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const alphaConnectStore = useAlphaConnectStore();
let {nftProfileFactory_contract} = getSignerContract();
const router = useRoute();
const activeTab = ref("all")
const showCard = ref(false)
const selectedCard = ref();
const { getStoreItem } = storeToRefs(alphaConnectStore)

const viewProfile = async (card) => {
  showCard.value = true
  console.log(card[0]?.owner, "xxxxxxxxxxxxxxxxx");
  selectedCard.value = await alphaConnectStore.loadProfile(card[0]?.owner);
};

const follows = ref([
    {
        name: "All",
        id: 'all'
    },
    {
        name: "Followers",
        id: 'followers'
    },
    {
        name: "Following",
        id: 'following'
    },
    {
        name: "Cards",
        id: 'cards'
    },
])

const allDeployedNFTCollections = computed(() => {
  return getStoreItem.value("allProfiles")
})

const allfollowers = computed(() => {
  return getStoreItem.value("myFollowers")
})

const allfollowing = computed(() => {
  return getStoreItem.value("myFollowing")
})

const businessCards = computed(() => {
  return getStoreItem.value("myCards")
})


const follow = async (profile) => {
   await alphaConnectStore.followProfile(profile);
}

onMounted(async () => {
    await alphaConnectStore.loadAllProfile();

    await alphaConnectStore.loadMyFollowers(router?.params?.wallet);

    await alphaConnectStore.loadMyFollowing(router?.params?.wallet);

    await alphaConnectStore.loadMyCards();


});
</script>
