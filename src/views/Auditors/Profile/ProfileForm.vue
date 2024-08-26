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
        <dynamic-form-main
            :form-fields="formFields"
            submit-label="send"
            :showLabels="true"
            @on-submit="CreateProfile"
        ></dynamic-form-main>
      </div>
       
     </div>
  </v-dialog>
</template>


<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import {getSignerContract} from '@/scripts/ContractUtils';
import {patchFormFields} from "@/interfaces/global.interface";
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import SvgIcon from "@/components/shared/SvgIcon.vue";

const alphaConnectStore = useAlphaConnectStore();
const props = defineProps(["openDialog", "profileData", "profileContract"]);
const emits = defineEmits(["closeDialog"]);
const { getStoreItem } = storeToRefs(alphaConnectStore)

const dialog = ref(false);

const formFields = ref([
    {
        inputType: "file",
        label: "Profile Photo",
        accept: ["image/*"],
        multipleFiles: false,
        name: "photo",
        size: "small",
        required: true,
    },
    {
        inputType: "input",
        type: "input",
        name: "name",
        label: "Name",
        size: "small",
        required: true,
    },
    {
        inputType: "input",
        type: "input",
        name: "fullName",
        label: "Full Name",
        size: "small",
        required: true,
    },
    {
        inputType: "input",
        type: "input",
        name: "institution",
        label: "Institution/ Organisation",
        size: "small",
        required: true,
    },
    {
        inputType: "form-array",
        name: "links",
        children: [
            {
                inputType: "select",
                name: "Contact",
                label: "Contact",
                options: [
                    { name: "Instagram", value: "instagram" },
                    { name: "Linkedin", value: "linkln" }, 
                    { name: "Facebook", value: "facebook" },
                    { name: "Xtwitter", value: "twitter" }, 
                    { name: "Github", value: "github" }, 
                    { name: "Phone", value: "phone" },
                ],
                size: "medium",
                required: true,
            },
            {
                inputType: "input",
                type: "input",
                name: "link",
                label: "Contact link/ number",
                size: "medium",
                required: true,
            }
        ]
    },
    {
        inputType: "rich-text",
        name: "bibliography",
        label: "Bibliography",
        size: "large",
        required: true,
    },
    {
        inputType: "form-array",
        name: "skills",
        children: [
            {
                inputType: "input",
                type: "input",
                name: "skill",
                label: "Skill Type",
                size: "large",
                required: true,
            }
        ]
    },
]);

const CreateProfile = async (formValues) => {
  if (!props?.profileContract) {
    try {
      await alphaConnectStore.createProfile(formValues);
      emits('closeDialog')
      console.log("deno");
      await alphaConnectStore.loadMyProfile(alphaConnectStore.getConnectedAddress());
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  } else {
    try {
      await alphaConnectStore.editProfile({ ...formValues, profileContract: props?.profileContract});
      emits('closeDialog')
      console.log("doen", alphaConnectStore.getConnectedAddress());
      await alphaConnectStore.loadMyProfile(alphaConnectStore.getConnectedAddress());
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  }
 }

watch(() => props.openDialog, (value) => {
  dialog.value = value
  if(props?.profileData){
    formFields.value = patchFormFields(formFields.value, {...props?.profileData[0], id: 1})
  }
})

// watch(() => props.profileData, (value) => {
//     if (value && value?.length){
//       dialog.value = true
//       formFields.value = patchFormFields(formFields.value, {...value[0], id: 1})
//     }
// })


const myProfile = computed(() => {
  return getStoreItem.value("myProfile")
})



onMounted(async () => {
    await alphaConnectStore.loadMyProfile(alphaConnectStore.getConnectedAddress()); 
});

</script>