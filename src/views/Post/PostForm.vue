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
          submit-label="Post"
          :showLabels="true"
          @on-submit="Post"
      ></dynamic-form-main>
      </div>
       
     </div>
  </v-dialog>

</template>

<script setup>
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import { ref , onMounted, computed, watch} from 'vue';
import { useRoute } from 'vue-router';
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import {walletAddressConnected, walletConnected} from "@/scripts/ContractConstants";
import SvgIcon from "@/components/shared/SvgIcon.vue";

const props = defineProps(["openDialog"]);
const emits = defineEmits(["closeDialog"]);
const alphaConnectStore = useAlphaConnectStore();

const dialog = ref(false);
const { getStoreItem } = storeToRefs(alphaConnectStore)

const formFields = ref([
  {
      inputType: "rich-text",
      name: "description",
      label: "Description",
      size: "large",
      required: false,
  },
  {
      inputType: "file",
      label: "Image",
      accept: ["image/*"],
      multipleFiles: false,
      name: "image",
      size: "small",
      required: false,
  }
]);


const myProfileContract = computed(() => {
  return getStoreItem.value("myProfileContract")
})


const Post = async (formValues) => {
  

  // await alphaConnectStore.Post(formValues, router?.params?.wallet, myProfileContract);
  await alphaConnectStore.Post({ ...formValues, profileContract: myProfileContract.value, connectedAddress:alphaConnectStore.getConnectedAddress() });

  // window.location.reload();
  await alphaConnectStore.loadAllPosts(await alphaConnectStore.getConnectedAddress());

  emits('closeDialog')

}

watch(() => props.openDialog, (value) => {
    dialog.value = value
  })

onMounted( async () => {
    await alphaConnectStore.loadMyProfileContract(alphaConnectStore.getConnectedAddress()); //hii ndo ina loaf myProfileContract
})
</script>