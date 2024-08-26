<template>
    <v-dialog v-model="dialog" :persistent="true" width="950">
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
  
        <div class="p-5 "> 
            <dynamic-form-main
                :form-fields="formFields"
                submit-label="Comment"
                :showLabels="true"
                @on-submit="CommentPost"
            ></dynamic-form-main>
        </div>
         
       </div>
    </v-dialog>
  
  </template>
  
  
  <script setup>
  import SvgIcon from "@/components/shared/SvgIcon.vue";
  import { onMounted, ref, watch } from 'vue';
  import {getSignerContract} from '../../../../scripts/ContractUtils';
  import { useRoute } from 'vue-router';
  import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
  import addMetadataFile  from '@/scripts/IPFSJSON'
  import { useAlphaConnectStore } from "@/store/index.js";

const alphaConnectStore = useAlphaConnectStore();
const dialog = ref(false)

const props = defineProps(['openDialog', 'selectedPost'])
const emits = defineEmits(['closeDialog'])

const formFields = ref([
  {
      inputType: "rich-text",
      name: "description",
      label: "Add Comment",
      size: "large",
      required: false,
  }
]);       
  
const CommentPost = async (formValues) => {
  await alphaConnectStore.commentPost(formValues,props?.selectedPost);
}

  watch(() => props.openDialog, (value) => {
    dialog.value = value
  })

  
  </script>
  
  
  <style scoped>
  
  </style>