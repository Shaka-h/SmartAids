<template>
  <v-dialog max-width="60%">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Post"
          variant="flat"
          persistent
        ></v-btn>
      </template>
    
      <template v-slot:default="{ isActive }">
        <v-card title="Make a post">
          <v-card-text>
            <div>
              <v-card-text>
                <div> 
                  <dynamic-form-main
                      :form-fields="formFields"
                      submit-label="Post"
                      :showLabels="true"
                      @on-submit="Post"
                  ></dynamic-form-main>
              </div>
            </v-card-text>
            </div>
          </v-card-text>
    
          <v-card-actions>
            <v-spacer></v-spacer>
    
            <v-btn
              text="Close"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
</template>

<script setup>
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import { ref , onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import {walletAddressConnected, walletConnected} from "@/scripts/ContractConstants";

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);
const router = useRoute()
const alphaConnectStore = useAlphaConnectStore();

const dialog = ref(false);
const close = ref(false)
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

}

onMounted( async () => {
    await alphaConnectStore.loadMyProfileContract(alphaConnectStore.getConnectedAddress()); //hii ndo ina loaf myProfileContract
})
</script>