import {notifyError, notifySuccess, notifyWarning} from "@/services/notificationService";
import {getSignerContract} from '@/scripts/ContractUtils.js';
import { defineStore } from "pinia";
import addMetadataFile from "@/scripts/IPFSJSON.js";
import {socialMedia} from "@/scripts/ContractConstants.js";
import fetchData from "@/scripts/fetchToken";

let {nftProfileFactory_contract, socialMedia_contract} = getSignerContract();

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
                createProfileState: 'idle',
                allProfiles: [],
                myFollowers: [],
                myFollowing: [], 
                myCards: [],
                followProfile: 'idle',
                createPostState: 'idle'
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

        async loadAllProfile() {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const getAllDeployedNFTCollections = await nftProfileFactory_contract.getAllDeployedNFTCollections()

                // Update store state with fetched profiles
                store.state['allProfiles'] = getAllDeployedNFTCollections;

            } catch (error) {
                console.error('Error loading profiles:', error);
                // Handle error
                notifyError('Error loading profiles: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async loadMyFollowers(myAddress) {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const getMyFollowers = await nftProfileFactory_contract.getAllfollowers(myAddress)
                
                const promises = getMyFollowers.map(async (follow) => {
                    const result = [];
                    const followName = await nftProfileFactory_contract.profileByAddressOwner(follow);
                    result.push(followName);
                    return result;
                });
            
                const myFollowers = await Promise.all(promises);

                // Update store state with fetched profiles
                store.state['myFollowers'] = myFollowers;

            } catch (error) {
                console.error('Error loading getMyFollowers:', error);
                // Handle error
                notifyError('Error loading getMyFollowers: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async loadMyFollowing(myAddress) {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const getMyFollowing = await nftProfileFactory_contract.getAllfollowing(myAddress)

                
                const getAllfollowingpromises = getMyFollowing.map(async (follow) => {
                    const result = [];
                    const followName = await nftProfileFactory_contract.profileByAddressOwner(follow);
                    result.push(followName);
                    return result;
                });
            
                const myFollowing = await Promise.all(getAllfollowingpromises);
            
                // Update store state with fetched profiles
                store.state['myFollowing'] = myFollowing;

            } catch (error) {
                console.error('Error loading getMyFollowing:', error);
                // Handle error
                notifyError('Error loading getMyFollowing: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async loadMyCards() {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const getMyBusinessCards = await nftProfileFactory_contract.getMybusinessCard()
                
                const getMyBusinessCardspromises = getMyBusinessCards.map(async (follow) => {
                    const result = [];
                    const card = await nftProfileFactory_contract.profileByAddressOwner(follow);
                    result.push(card);
                    return result;
                });
            
            
                const mySharedCards = await Promise.all(getMyBusinessCardspromises);
            
                // Update store state with fetched profiles
                store.state['myCards'] = mySharedCards;

            } catch (error) {
                console.error('Error loading mySharedCards:', error);
                // Handle error
                notifyError('Error loading mySharedCards: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async followProfile(profile) {
            const store = this;

            try {
                store.followProfile = 'pending'; // Set state to pending while profile creation is in progress                

                const follow = await nftProfileFactory_contract.followProfile(profile?.ProfileContract)

                store.isLoading = true;
                let storedResponse = await follow.wait();

                if (storedResponse?.events) {
                    store.followProfile = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Followed profile successfully!");

                } else {
                    store.followProfile = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error following profile: Deployed contract address not returned.');
                }
            } catch (error) {
                store.followProfile = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error following profile: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async Post(postData, myAddress, nftMyProfile_contract) {
            const store = this;

            try {
                store.createPostState = 'pending'; // Set state to pending while profile creation is in progress

                const postCID = await addMetadataFile(
                    {
                        "post": postData.image[0].attachmentPath,
                        "description": postData.description,
                    }
                    
                );

                const createPost = await nftMyProfile_contract.createPost(
                    postCID
                );

                store.isLoading = true;
                let storedResponse = await createPost.wait();


                const postId = parseInt(storedResponse?.events[3].args.profileId);


                if (storedResponse?.events[3].args.profileId) {

                    const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(myAddress)
                    const profileContract = await getprofileContract?.ProfileContract

                    const publishPost = await socialMedia_contract.createPost(
                        profileContract,
                        postId,
                    )
                    
                    let publishedPost = await publishPost.wait()

                    const publishPostId = publishedPost?.events[1].args.PostId
            
                    if (publishPostId) {
                        store.createProfileState = 'success'; // Set state to success after successful profile creation
                        notifySuccess("Added post successfully!");
    
                        // Push the storedResponse to the profiles array
                        store.profiles.push(storedResponse);       
                    } else {
                        store.createProfileState = 'error'; // Set state to error if contract address is not returned
                        notifyError('Error creating post: Deployed contract address not returned.');
                    }
                } 
            } catch (error) {
                store.createProfileState = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error creating post: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

    },
});
