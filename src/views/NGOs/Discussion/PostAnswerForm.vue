<template>
  <v-dialog v-model="dialog" :persistent="true" width="950">
    <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
      <div
        class="flex justify-between items-center p-2 text-gray-500"
      >
        <span class="font-bold px-2">
          <span v-if="title">{{ $t(title) }}</span>{{ props?.discussionId }}
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
              submit-label="Post Answer"
              :showLabels="true"
              @on-submit="postAnswer"
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

const props = defineProps(['openDialog', 'discussionId'])
const emits = defineEmits(['closeDialog'])

const formFields = ref([
{
    inputType: "rich-text",
    name: "description",
    label: "Post Answer",
    size: "large",
    required: false,
}
]);       

watch(() => props.openDialog, (value) => {
  dialog.value = value
})



const myProfileContract = computed(() => {
  return getStoreItem.value("myProfileContract")
})

const postAnswer = async (formValues) => {
  await alphaConnectStore.postAnswer({ ...formValues, discussionId: props?.discussionId });

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


