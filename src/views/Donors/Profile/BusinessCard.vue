<template>
  <v-dialog v-model="dialog" :persistent="true" width="750">
    <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
      <div
        class="flex justify-between items-center p-2 text-gray-500"
      >
        <span class="font-bold px-2">
          <span v-if="title">{{ $t(title) }}</span>
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
      <div class="p-4 space-x-4">
        <div  class="flex justify-between items-center p-2 text-gray-500"> 
          <div @click="downloadCard()" class="rounded-lg p-2 bg-primary cursor-pointer">Download</div>
        </div>
        <div class="flex flex-col mt-8 mx-8"> 
          
          <div class="flex items-center justify-between"> 
            <div class="">
              <img :src="`http://127.0.0.1:8080/ipfs/${profileDetails[0]?.photoCID}`" class="rounded-full h-64 w-64"></img>
          </div>
          <div class="flex flex-col space-y-2"> 
            <div> 
              <div class="font-bold">{{profileDetails[0]?.name}}</div>
              <div class="font-bold">{{profileDetails[0]?.fullName}}</div>
              <div>{{profileDetails[0]?.organisation}}</div>
              <div v-for="(skill, index) of profileDetails[0]?.skills" :Key="index" class="flex flex-col space-y-2">{{skill.skill}}</div>
              <div class="flex mt-4 space-x-4 "> 
                  <div @click="openLink(contact)" v-for="(contact, index) of profileDetails[0]?.contacts" :key="index" class="cursor-pointer p-2 rounded-lg bg-primary hover:bg-black">
                      <svg-icon :name="contact.Contact"  height="h-5" width="w-5" class="icon" color="#ffffff"></svg-icon>
                  </div>
              </div> 
            </div>
          </div>
        </div>
        <div> 
            <div class="mt-8 font-bold">Bibliography</div>
            <div class="mt-2" v-html="profileDetails[0]?.bibliography"> 
            </div>
        </div>
      </div>
    </div>
    </div>
  </v-dialog>

</template>


<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { computed, ref, watch } from 'vue';
import ProfileForm from '@/views/Beneficieries/Profile/ProfileForm.vue'
import ShareProfile from './ShareProfile.vue';
import {getSignerContract} from '../../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const alphaConnectStore = useAlphaConnectStore();
const router = useRoute()
const profile = ref()
const dialog = ref(false)
const { getStoreItem } = storeToRefs(alphaConnectStore)

const props = defineProps(['openDialog', 'selectedCard'])
const emits = defineEmits(['closeDialog'])

const openLink = (link) => {
  console.log(link);
  if(link.Contact === 'instagram') {
    window.open(`https://www.instagram.com/${link.link}/`, '_blank');
  }
  else if(link.Contact === 'linkln') {
    window.open(`https://www.linkln.com/${link.link}/`, '_blank');
  }
  else if(link.Contact === 'facebook') {
    window.open(`https://www.facebook.com/${link.link}/`, '_blank');
  }
  else if(link.Contact === 'twitter') {
    window.open(`https://twitter.com/${link.link}/`, '_blank');
  }
  else if(link.Contact === 'github') {
    window.open(`https://www.github.com/${link.link}/`, '_blank');
  }
};


watch(() => props.openDialog, (value) => {
  dialog.value = value
})

const closeDialog = () => {
  emits('closeDialog')
}

const profileDetails = computed(() => {
  return getStoreItem.value("profileDetails")
})

</script>


<style scoped>

</style>