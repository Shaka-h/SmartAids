<template>
    <v-dialog max-width="60%">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Edit Profile"
            variant="flat"
            persistent
          ></v-btn>
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="My Profile">
            <v-card-text>
              <div> 
                    <dynamic-form-main
                        :form-fields="formFields"
                        submit-label="send"
                        :showLabels="true"
                        @on-submit="CreateProfile"
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
import { ref } from 'vue';
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import {getSignerContract} from '../../scripts/ContractUtils';
import addMetadata  from '@/scripts/IPFS'
import router from '@/router';
import {socialMedia } from '@/scripts/ContractConstants'
import addMetadataFile  from '@/scripts/IPFSJSON'

let {nftProfileFactory_contract} = getSignerContract();

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);

const dialog = ref(false);

const close = ref(false)
const formFields = [
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
                    { name: "Linkln", value: "linkln" }, 
                    { name: "Instagram", value: "instagram" },
                    { name: "Linkln", value: "linkln" }, 
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
];

const CreateProfile = async (formValues) => {
    console.log(formValues);
    console.log(formValues.photo[0].attachmentPath)
    const profileCID = await addMetadataFile(
        {
            "name": formValues.name,
            "fullName": formValues.fullName,
            "photoCID": formValues.photo[0].attachmentPath,
            "organisation": formValues.institution,
            "bibliography": formValues.bibliography,
            "skills": formValues.skills,
            "contacts": formValues.links
        }
        
    );
    console.log('Item created successfully with metadata. CID:', profileCID);

    try {
        const deployedContractAddress = await nftProfileFactory_contract.deployNFTProfileContract(
            socialMedia,
            formValues.name,
            profileCID
        );
        console.log(deployedContractAddress); // Log the deployed contract address

        // wait() function allows to wait for transaction to be completed
        let receipt = await deployedContractAddress.wait()  

        console.log(receipt);

        // not decodeFunctionData
        // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
        // encodedData is found in receipt

        // Ensure that deployedContractAddress is not null or undefined before routing
        if (receipt?.events[0]?.args?.ProfileContract) {
            window.location.reload()
        } else {
            console.error('Error creating profile: Deployed contract address not returned.');
        }

    } catch (error) {
        console.error('Error creating collection:', error);
    }
}

</script>