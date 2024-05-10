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
import { ref , onMounted} from 'vue';
import { nftMyProfile_ABI } from '@/scripts/ContractConstants'
import addMetadataFile  from '@/scripts/IPFSJSON'
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import {ethers} from 'ethers';

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);
const router = useRoute()

const dialog = ref(false);
const nftMyProfile_contract = ref()
const profileContract = ref()
const close = ref(false)
let {signer, nftProfileFactory_contract, socialMedia_contract} = getSignerContract();

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


const Post = async (formValues) => {
  console.log(formValues);
  console.log(formValues.image[0].attachmentPath)
  const postCID = await addMetadataFile(
      {
          "post": formValues.image[0].attachmentPath,
          "description": formValues.description,
      }
      
  );
  console.log('Item created successfully with metadata. CID:', postCID);

  try {
      const createPost = await nftMyProfile_contract.value.createPost(
        postCID
      );
      console.log(createPost); // Log the deployed contract address

      // wait() function allows to wait for transaction to be completed
      let receipt = await createPost.wait()  

      console.log(receipt);

      const tokenIdBigNumber = receipt?.events[3].args.profileId;

      // Convert BigNumber to JavaScript number
      const postId = tokenIdBigNumber.toNumber();

      console.log(postId);

      // // not decodeFunctionData
      // // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
      // // encodedData is found in receipt

      if (postId) {
            const publishPost = await socialMedia_contract.createPost(
              profileContract.value,
              postId,
            )

            console.log(publishPost);
            let publishedPost = await publishPost.wait()
            console.log(publishedPost?.events[1].args.PostId);

            const PostIdBigNumber = publishedPost?.events[1].args.PostId
            const PostId = PostIdBigNumber.toNumber()

            if (PostId) {
                window.location.reload();
            } else {
                console.error('Error creating Item on market');
            }
        } else {
            console.error('Error creating token for post');
        }

  } catch (error) {
      console.error('Error creating collection:', error);
  }
}

onMounted( async () => {
  const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(router?.params?.wallet)
  profileContract.value = await getprofileContract?.ProfileContract
  console.log(profileContract.value, "hello");

  nftMyProfile_contract.value = new ethers.Contract(profileContract.value, nftMyProfile_ABI, signer);    
  console.log(nftMyProfile_contract.value)


})
</script>