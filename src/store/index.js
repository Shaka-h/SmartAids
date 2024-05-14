import {notifyError, notifySuccess, notifyWarning} from "@/services/notificationService";
import {getSignerContract} from '@/scripts/ContractUtils.js';
import { defineStore } from "pinia";
import addMetadataFile from "@/scripts/IPFSJSON.js";
import {socialMedia} from "@/scripts/ContractConstants.js";
import fetchData from "@/scripts/fetchToken";

let {nftProfileFactory_contract} = getSignerContract();

export const useAlphaConnectStore = defineStore('alphaConnectStore', {
    state: () => {
        return {
            isLoading: false,
            documentLink: null,
            openDocumentViewer: false,
            documentTitle: null,
            state: {
                profiles: [],
                myProfile: null,
                createProfileState: 'idle'
            }
        }
    },

    getters: {
      getStoreItem: (state) => {
          return (entity) => state.state[entity]
      }
    },


    actions: {
        async createProfile(profileData) {
            const store = this;

            try {
                store.createProfileState = 'pending'; // Set state to pending while profile creation is in progress

                const profileCID = await addMetadataFile({
                    "name": profileData.name,
                    "fullName": profileData.fullName,
                    "photoCID": profileData.photo[0].attachmentPath,
                    "organisation": profileData.institution,
                    "bibliography": profileData.bibliography,
                    "skills": profileData.skills,
                    "contacts": profileData.links
                });

                const deployedContractAddress = await nftProfileFactory_contract.deployNFTProfileContract(
                    socialMedia,
                    profileData.name,
                    profileCID
                );

                store.isLoading = true;
                let storedResponse = await deployedContractAddress.wait();

                if (storedResponse?.events[0]?.args?.ProfileContract) {
                    store.createProfileState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Added profile successfully!");

                    // Push the storedResponse to the profiles array
                    store.profiles.push(storedResponse);
                } else {
                    store.createProfileState = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating profile: Deployed contract address not returned.');
                }
            } catch (error) {
                store.createProfileState = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error creating profile: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },


        async loadMyProfile(address) {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const profileData = await nftProfileFactory_contract.profileByAddressOwner(address);

                // Extract the token URL from profileData
                const tokenUrl = profileData[3];

                // Fetch additional profile details from the token URL using fetchData function
                const profileDetails = await fetchData(tokenUrl);

                // Process profile data
                const processedProfiles = profileDetails.map(profile => ({
                    ...profile,
                    photo: profile.photoCID,
                    name: profile.name,
                    fullName: profile.fullName,
                    institution: profile.organisation,
                    links: profile.contacts,
                    bibliography: profile.bibliography,
                    skills: profile.skills,
                    profileContract: profileData[1  ]
                }));

                // Update store state with fetched profiles
                store.state['myProfile'] = processedProfiles;

                // Log fetched profiles
                // console.log('Fetched profiles:', store.state.myProfile);

            } catch (error) {
                console.error('Error loading profiles:', error);
                // Handle error
                notifyError('Error loading profiles: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },
    },
});
