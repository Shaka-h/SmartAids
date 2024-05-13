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

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);

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
  console.log(formValues);
  let photo = ref()
  if (formValues?.photo[0]?.attachmentPath){
    photo.value = formValues.photo[0].attachmentPath
  }
  else {
    photo.value = null
  }
  const newsCID = await addMetadataFile(
      {
          "photo": photo.value,
          "title": formValues?.title,
          "description": formValues?.description,
      }
      
  );
  console.log('News created successfully with metadata. CID:', newsCID);

  try {
    const createNews = await socialMedia_contract.createNews(
      newsCID
    )

    console.log(createNews);
    let createdNews = await createNews.wait()
    console.log(createdNews?.events[0].args.NewsId);

    if (createdNews?.events[0].args.NewsId) {
        window.location.reload();
    } else {
        console.error('Error creating Item on market');
    }

  } catch (error) {
      console.error('Error creating news:', error);
  }
}
onMounted( async () => {
  
})
</script>