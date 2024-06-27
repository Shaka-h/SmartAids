<template>
  <v-dialog v-model="dialog" :persistent="true" width="950">
    <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
      <div
        class="flex justify-between items-center p-2 text-gray-500"
      >
        <span class="font-bold px-2">
          <span v-if="title">{{ title }}</span>
        </span>
        <button @click="$emit('closeDialog', true)">
          <svg-icon
            name="close"
            height="h-6"
            width="w-6"
            color="#a91926"
            :override_color="true"
            :stroke="false"
          ></svg-icon>
        </button>
      </div>

      <div class="p-5 "> 
        <div> 
          <div class="flex items-center space-x-2"> 
              <div class="w-full p-4"><input type="text" v-model="search" placeholder="Search Username" class="form-control input" /></div>
          </div>
          </div>
          <div> 
              <div @click="shareProfile(profile)" v-for="(profile, index) of filteredData" :key="index" class="">
                <div v-if="!profile?.isShared && !profile.myProfile" class="hover:bg-blue-400 border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex space-x-2 items-center">
                  <div>   
                      <img :src="`http://127.0.0.1:8080/ipfs/${profile?.profilePhoto}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
                  </div>
                  <div>{{ profile?.username  }}</div>
                </div>
                <div v-if="profile?.isShared && !profile.myProfile" class="bg-gray-400 border rounded-lg py-2 px-4 w-full mb-2 flex space-x-2 items-center">
                  <div>   
                      <img :src="`http://127.0.0.1:8080/ipfs/${profile?.profilePhoto}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
                  </div>
                  <div>{{ profile?.username  }}</div>
                </div>
              </div>
          </div>
      </div>
       
     </div>
  </v-dialog>
</template>


<script setup>
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue';
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { notifyError, confirmAlert } from '@/services/notificationService';

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);
const alphaConnectStore = useAlphaConnectStore();
const { getStoreItem } = storeToRefs(alphaConnectStore)

const dialog = ref(false);
const search = ref("")
const close = ref(false)
const formFields = [
        {
        inputType: "input",
        type: "input",
        name: "name",
        label: "Filter Name",
        size: "large",
        required: true,
    },
];

const allDeployedNFTCollections = computed(() => {
  return getStoreItem.value("cardsToShare")
})

const filteredData = computed(() => {
    return allDeployedNFTCollections.value.filter(item => {
        return item[2].toLowerCase().includes(search.value.toLowerCase());
    });
});

const shareProfile = async (profile) => {

  if(!profile?.isShared){
    emits('closeDialog')  

    const result = await confirmAlert("Are you sure?", "Share");

    if (result.isConfirmed) {
      await alphaConnectStore.shareProfile(profile);
    }    
  }

  else{
    notifyError("You have already shared to this account");
  }  
}

watch(() => props.openDialog, (value) => {
  dialog.value = value
})

onBeforeMount(async () => {
  await alphaConnectStore.cardsToShare();
})

onMounted(async () => {
nftProfileFactory_contract.on("cardShared", async () => {
    await alphaConnectStore.loadMyCards();
})

})
</script>