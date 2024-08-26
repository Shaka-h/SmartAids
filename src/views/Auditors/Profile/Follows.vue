<template>
    <!-- <div class="flex flex-col p-4 h-full rounded-lg" style="background-color: #40128B42"> -->
        <BusinessCard :open-dialog="showCard" :selected-card="selectedCard"  @close-dialog="showCard = false; "></BusinessCard>

        <div class="flex justify-between">
            <div class="sidePost flex flex-col p-10 space-y-10">
              <div class="font-bold flex justify-center">My</div>
            <template v-for="(tab, index) of follows" :key="index">
              <button class="primary2-action-btn mx-1" v-if="tab.id === activeTab">
                {{ tab.name }}
              </button>
              <button class="primary-action-btn mx-1" v-else @click="activeTab = tab.id">
                {{ tab.name }}
              </button>
            </template>
        </div>

        <div class="post">

            <div v-if="activeTab === 'all'">
                <div v-if="allDeployedNFTCollections.length">
                    <div class="flex items-center"> 
                        <div class="w-full p-4"><input type="text" v-model="search" placeholder="Search Username" class="form-control input" /></div>
                    </div>

                    <div class="border ml-5 p-4 w-2/3">
                        <div v-for="(profile, index) of allDeployedNFTCollections" :key="index" class=" bg-gradient border rounded-lg py-2 px-4 mb-2 flex justify-between items-center"> 
                            <div class="rows flex items-center col-md-8">
                                <div class="col-md-6 flex items-center space-x-2">
                                    <div>   
                                        <img :src="`http://127.0.0.1:8080/ipfs/${profile?.profilePhoto}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
                                    </div>
                                    <div>{{ profile?.username  }}</div>
                                </div>
                                <div class="col-md-6"> <span>Since :</span> {{ profile?.timestamp }}</div>

                            </div>
                            <div v-if="!profile?.isFollowing && !profile?.myProfile" @click="follow(profile)" class="bg-white rounded-lg flex items-center justify-center col-md-3 hover:border-b cursor-pointer">Follow</div>
                        </div>
                    </div>
                </div>

                <div v-if="!allDeployedNFTCollections.length">
                    <EmptyPage :message="'There is no one yet'"></EmptyPage>
                </div>
            </div>

            <div v-if="activeTab === 'followers'">
                <div v-if="allfollowers.length">
                    <div class="flex items-center"> 
                        <div class="w-full p-4"><input type="text" v-model="search" placeholder="Search Username" class="form-control input" /></div>
                    </div>
    
                    <div class="border ml-5 p-4 w-2/3">
                        <div v-for="(profile, index) of allfollowers" :key="index" class=" bg-gradient border rounded-lg py-2 px-4 mb-2 flex justify-between items-center"> 
                            <div class="rows flex items-center col-md-8">
                                <div class="col-md-6 flex items-center space-x-2">
                                    <div>   
                                        <img :src="`http://127.0.0.1:8080/ipfs/${profile?.profilePhoto}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
                                    </div>
                                    <div>{{ profile?.username  }}</div>
                                </div>
                                <div class="col-md-6"> <span>Since :</span> {{ profile?.timestamp }}</div>

                            </div>
                            <div v-if="!profile?.isFollowing" @click="follow(profile)" class="hover:border-b cursor-pointer">Follow Back</div>
                        </div>
                    </div>
                </div>

                <div v-if="!allfollowers.length">
                    <EmptyPage :message="'You Have No Followers'"></EmptyPage>
                </div>
            </div>

            <div v-if="activeTab === 'following'">
                <div v-if="allfollowing.length">
                    <div class="flex items-center space-x-2"> 
                        <div class="w-full p-4"><input type="text" v-model="search" placeholder="Search Username" class="form-control input" /></div>
                    </div>
    
                    <div class="border ml-5 p-4 w-2/3">
                        <div v-for="(profile, index) of allfollowing" :key="index" class="bg-gradient hover:bg-gray-100 border items-center rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                            <div class="rows flex items-center col-md-8">
                                <div class="col-md-6 flex items-center space-x-2">
                                    <div>   
                                        <img :src="`http://127.0.0.1:8080/ipfs/${profile?.profilePhoto}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
                                    </div>
                                    <div>{{ profile?.username  }}</div>
                                </div>
                                <div class="col-md-6"> <span>Since :</span> {{ profile?.timestamp }}</div>

                            </div>
                            <!-- <div @click="unFollow" class="hover:border-b cursor-pointer">UnFollow</div> -->
                        </div>                           
                    </div>
                </div>

                <div v-if="!allfollowing.length">
                    <EmptyPage :message="'Start Following People'"></EmptyPage>
                </div>
            </div>

            <div v-if="activeTab === 'cards'">
                <div v-if="businessCards.length">
                    <div class="flex items-center space-x-2"> 
                    <div class="w-full p-4"><input type="text" v-model="search" placeholder="Search Username" class="form-control input" /></div>
                </div>

                <div class="border ml-5 p-4 w-2/3">
                    <div v-for="(card, index) of businessCards" :key="index" class="bg-gradient border rounded-lg py-2 px-4 w-full mb-2 flex justify-between"> 
                        <div class="rows flex items-center col-md-8">
                            <div class="col-md-6 flex items-center space-x-2">
                                <div>   
                                    <img :src="`http://127.0.0.1:8080/ipfs/${card?.profilePhoto}`" class="w-10 h-10 rounded-full" alt="card picture"/>
                                </div>
                                <div>{{ card?.username  }}</div>
                            </div>
                            <div class="col-md-6"> <span>Since :</span> {{ card?.timestamp }}</div>

                        </div>
                        <div @click="viewProfile(card)"  class="cursor-pointer hover:bg-white p-1 rounded-lg">
                            <svg-icon name='view' class="icon cursor-pointer" color="#020202"></svg-icon>
                        </div>
                        <div @click="viewProfile(card)" class="cursor-pointer hover:bg-white p-1 rounded-lg">
                            <svg-icon :name="'download3'" class="icon cursor-pointer" color="#020202"></svg-icon>
                        </div>                    
                    </div>                           
                </div>

                
              </div>

                <div v-if="!businessCards.length">
                    <EmptyPage :message="'You Have No Shared Cards'"></EmptyPage>
                </div>  
            </div>
             
        </div>
    
    </div>
  
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import BusinessCard from "@/views/Beneficieries/Profile/BusinessCard.vue"
import {getSignerContract} from '../../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import EmptyPage from '@/components/shared/emptyPage.vue';
import {confirmAlert, notifySuccess} from "../../../services/notificationService";

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
});


const allfollowers = computed(() => {
  return getStoreItem.value("myFollowers")
})

const allfollowing = computed(() => {
  return getStoreItem.value("myFollowing")
})

const businessCards = computed(() => {
  return getStoreItem.value("myCards")
})

const businessCard = computed(() => {
  return getStoreItem.value("myCards").map(profile => {   
    // const responseData = await alphaConnectStore.loadProfile(profile[0]);
    // let timestamp = businessCard[0][0][4];
    // let readableDate = new Date(timestamp * 1000).toLocaleString();
    return {
      ...profile,
    //   timestamp: readableDate,
    //   profilePhoto: responseData?.photo
    };
  });
});


const follow = async (profile) => {
   await alphaConnectStore.followProfile(profile);
}

const unFollow = async (data) => {
  const result = await confirmAlert("Are you sure?", "Unfollow");

  if (result.isConfirmed) {
    await alphaConnectStore.followProfile(data);
  }
};


onBeforeMount(async () => {

    await alphaConnectStore.loadAllProfile();

    await alphaConnectStore.loadMyFollowers(alphaConnectStore.getConnectedAddress());

    await alphaConnectStore.loadMyFollowing(alphaConnectStore.getConnectedAddress());

    await alphaConnectStore.loadMyCards();

})

onMounted(async () => {

    nftProfileFactory_contract.on("ProfileFollowed", async () => {
        await alphaConnectStore.loadMyFollowing(alphaConnectStore.getConnectedAddress());
        await alphaConnectStore.loadMyFollowers(alphaConnectStore.getConnectedAddress());
        await alphaConnectStore.loadAllProfile();

    })

    nftProfileFactory_contract.on("cardShared", async () => {
        await alphaConnectStore.loadMyCards();
    })

})

</script>


<style scoped>
.post{
  width: 75%;
  height: 100vh;
}
.sidePost{
  width: 20%;
  height: 100vh;
  background-color: rgb(214, 210, 210);

}
@media (max-width: 991.98px) {
  .post{
      width: 100%;
  }
  .sidePost{
      width: 0%;
  }
}
</style>