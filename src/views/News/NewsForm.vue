<template>
    <v-dialog max-width="60%">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Post News"
            variant="flat"
            persistent
          ></v-btn>
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="Post News">
            <v-card-text>
              <div> 
                    <dynamic-form-main
                        :form-fields="formFields"
                        submit-label="Post News"
                        :showLabels="true"
                        @on-submit="createNews"
                    ></dynamic-form-main>
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
import { ref, onMounted } from 'vue';
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import {getSignerContract} from '../../scripts/ContractUtils';
let {signer, nftProfileFactory_contract, socialMedia_contract} = getSignerContract();
import addMetadataFile  from '@/scripts/IPFSJSON'
import { notifyError } from '@/services/notificationService';
import { useAlphaConnectStore } from "@/store/index.js";

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);
const alphaConnectStore = useAlphaConnectStore();

const dialog = ref(false);

const close = ref(false)
const formFields = ref([
    {
        inputType: "input",
        type: "input",
        name: "title",
        label: "Title",
        size: "large",
        required: true,
    },
    {
        inputType: "rich-text",
        name: "description",
        label: "Description",
        size: "large",
        required: true,
    },
    {
        inputType: "file",
        label: "Photo",
        accept: ["image/*"],
        multipleFiles: false,
        name: "photo",
        size: "large",
        required: false,
    },
]);


const createNews = async (formValues) => {
  await alphaConnectStore.PostNews(formValues);
}

onMounted( async () => {

})
</script>