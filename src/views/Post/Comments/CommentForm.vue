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
  import {getSignerContract} from '../../../scripts/ContractUtils';
  import { useRoute } from 'vue-router';
  import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
  import addMetadataFile  from '@/scripts/IPFSJSON'

  let {nftProfileFactory_contract, socialMedia_contract} = getSignerContract();
  const router = useRoute()
  const profile = ref()
  const profileDetails = ref()
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
  console.log(formValues.description);
  console.log(props.selectedPost, "here i am");

  const commentCID = await addMetadataFile(
      {
          "comment": formValues.description,
      }
      
  );
  console.log('Comment created successfully with metadata. CID:', commentCID);

  try {
    const publishComment = await socialMedia_contract.commentPost(
        props.selectedPost,
        commentCID,
    )

    console.log(publishComment);
    let publishedComment = await publishComment.wait()
    console.log(publishedComment);

    const commentIDBigNumber = publishedComment?.events[0].args.commentID
    const commentID = commentIDBigNumber.toNumber()

    if (commentID) {
        window.location.reload();
    } else {
        console.error('Error adding a comment');
    }

  } catch (error) {
      console.error('Error creating collection:', error);
  }
}

  watch(() => props.openDialog, (value) => {
    dialog.value = value
  })
  
  const closeDialog = () => {
    emits('closeDialog')
  }
  
  const fetchData = async () => {
    const responseData = []; // Array to store response data
  
    try {
        const response = await fetch(`http://127.0.0.1:8080/ipfs/${profile.value[3]}`);
        const data = await response.json();
        responseData.push(data); // Push data to responseData array
        // Handle data as needed
    } catch (error) {
        console.error('Error fetching data from', router?.params?.wallet, ':', error);
        // Handle error
    }
    return responseData; // Return the array of response data
  };
  
  
  onMounted(async () => {
    profile.value = await nftProfileFactory_contract.profileByAddressOwner(router?.params?.wallet);
  
    await fetchData().then((responseData) => {
        profileDetails.value = responseData
    });
  });
  
  </script>
  
  
  <style scoped>
  
  </style>