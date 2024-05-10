<template>
    <div class="flex flex-col p-4 h-full rounded-lg" style="background-color: #40128B42">
        <BusinessCard :open-dialog="showCard" @close-dialog="showCard = false;"></BusinessCard>

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
                <div v-for="(follow, index) of allfollowers" :key="index" class="bg-gradient border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow[0][2] }}</div>
                </div>
            </div>

            <div v-if="activeTab === 'following'">
                <div v-for="(follow, index) of allfollowing" :key="index" class="bg-gradient hover:bg-blue border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ follow[0][2] }}</div>
                </div>
            </div>
            <div v-if="activeTab === 'cards'">
                <div @click="viewProfile()" v-for="(card, index) of businessCards" :key="index" class="bg-gradient hover:bg-blue border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                    <div>{{ card[0][2] }}</div>
                    <div class="cursor-pointer">
                        <svg-icon :name="'download3'" class="icon cursor-pointer" color="#020202"></svg-icon>
                    </div>
                </div>
            </div>
            <!-- <div class="p-2 mt-8 mx-8 cursor-pointer">
                <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>
            </div> -->
        </div>
    
    </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import BusinessCard from "@/views/Profile/BusinessCard.vue"
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';

let {nftProfileFactory_contract} = getSignerContract();
const router = useRoute();
const activeTab = ref("all")
const showCard = ref(false)

const viewProfile = () => {
  showCard.value = true
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
        name: "Business Cards",
        id: 'cards'
    },
])

const allDeployedNFTCollections = ref()
const allfollowers = ref()
const allfollowing = ref()
const businessCards = ref()

const follow = async (profile) => {
    console.log(profile?.ProfileContract);
    const follow = await nftProfileFactory_contract.followProfile(profile?.ProfileContract)
    let receipt = await follow.wait() 
    console.log(receipt); 
    activeTab.value = 'following'
}

onMounted(async () => {
    const getAllDeployedNFTCollections = await nftProfileFactory_contract.getAllDeployedNFTCollections()
    allDeployedNFTCollections.value = await getAllDeployedNFTCollections
    console.log(allDeployedNFTCollections.value, "allDeployedNFTCollections");

    const getAllfollowers = await nftProfileFactory_contract.getAllfollowers(router?.params?.wallet)
    allfollowers.value = await getAllfollowers
    console.log(allfollowers.value, "allfollowers");

    const promises = allfollowers.value.map(async (follow) => {
        const result = [];
        const followName = await nftProfileFactory_contract.profileByAddressOwner(follow);
        result.push(followName);
        console.log(followName, "trial");
        return result;
    });

    allfollowers.value = await Promise.all(promises);

    
    const getAllfollowing = await nftProfileFactory_contract.getAllfollowing(router?.params?.wallet)
    allfollowing.value = await getAllfollowing
    console.log(allfollowing.value, "allfollowing");

    const getAllfollowingpromises = allfollowing.value.map(async (follow) => {
        const result = [];
        const followName = await nftProfileFactory_contract.profileByAddressOwner(follow);
        result.push(followName);
        console.log(followName, "trial");
        return result;
    });

    allfollowing.value = await Promise.all(getAllfollowingpromises);


    const getMyBusinessCards = await nftProfileFactory_contract.getMybusinessCard()
    businessCards.value = await getMyBusinessCards
    console.log(businessCards.value, "businessCards");

    const getMyBusinessCardspromises = businessCards.value.map(async (follow) => {
        const result = [];
        const card = await nftProfileFactory_contract.profileByAddressOwner(follow);
        result.push(card);
        console.log(card, "card");
        return result;
    });

    businessCards.value = await Promise.all(getMyBusinessCardspromises);


});
</script>
