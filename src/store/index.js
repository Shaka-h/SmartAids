import {notifyError, notifySuccess, notifyWarning} from "@/services/notificationService";
import {getSignerContract} from '@/scripts/ContractUtils.js';
import { defineStore } from "pinia";
import addMetadataFile from "@/scripts/IPFSJSON.js";
import {socialMedia} from "@/scripts/ContractConstants.js";

let {nftProfileFactory_contract} = getSignerContract();

export const useAlphaConnectStore = defineStore('digitalClubsStore', {
    state: () => {
        return {
            isLoading: false,
            documentLink: null,
            openDocumentViewer: false,
            documentTitle: null,
            state: {
                createProfiles: [],
            }
        }
    },

    getters: {
      getStoreItem: (state) => {
          return (entity) => state.state[entity]
      }
    },


    actions: {
        async createProfile (context, profileData) {

            const profileCID = await addMetadataFile(
                {
                    "name": profileData.name,
                    "fullName": profileData.fullName,
                    "photoCID": profileData.photo[0].attachmentPath,
                    "organisation": profileData.institution,
                    "bibliography": profileData.bibliography,
                    "skills": profileData.skills,
                    "contacts": profileData.links
                }
            );

            const deployedContractAddress = await nftProfileFactory_contract.deployNFTProfileContract(
                socialMedia,
                profileData.name,
                profileCID
            );
            console.log(deployedContractAddress); // Log the deployed contract address
            this.isLoading = true;
            // wait() function allows to wait for transaction to be completed
            let storedResponse = await deployedContractAddress.wait()

            console.log(storedResponse);

            // Ensure that deployedContractAddress is not null or undefined before routing
            if (storedResponse?.events[0]?.args?.ProfileContract) {
                this.isLoading = false;
                context.commit('createProfiles', {
                    name : profileData.name,
                    profileUrl: profileCID
                })
                await notifySuccess("Added profile successfully!")
            } else {
                await notifyError('Error creating profile: Deployed contract address not returned.');
            }
        },


    }
})

