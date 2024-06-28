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
              submit-label="Create"
              :showLabels="true"
              @on-submit="MakeDiscussion"
          ></dynamic-form-main>
      </div>
       
     </div>
  </v-dialog>

</template>


<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { onMounted, ref, watch, computed } from 'vue';
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";

const alphaConnectStore = useAlphaConnectStore();
const dialog = ref(false)
const { getStoreItem } = storeToRefs(alphaConnectStore)

const props = defineProps(['openDialog', 'selectedPost'])
const emits = defineEmits(['closeDialog'])

const formFields = ref([
  {
      inputType: "input",
      type: "input",
      name: "name",
      label: "Topic",
      size: "large",
      required: true,
  },
  
  {
      inputType: "rich-text",
      name: "description",
      label: "Discription",
      size: "large",
      required: false,
  }
]);       

const myProfileContract = computed(() => {
  return getStoreItem.value("myProfileContract")
})

const MakeDiscussion = async (formValues) => {
  await alphaConnectStore.createDiscussion({ ...formValues, profileContract: myProfileContract.value, connectedAddress:alphaConnectStore.getConnectedAddress() });

  emits('closeDialog')
}

watch(() => props.openDialog, (value) => {
  dialog.value = value
})

onMounted( async () => {
    await alphaConnectStore.loadMyProfileContract(alphaConnectStore.getConnectedAddress()); //hii ndo ina loaf myProfileContract
})
</script>


<style scoped>

</style>