import { notifyError, notifySuccess, notifyWarning } from "@/services/notificationService";
import { getSignerContract } from '@/scripts/ContractUtils.js';
import { defineStore } from "pinia";
import addMetadataFile from "@/scripts/IPFSJSON.js";
import { socialMedia, discussionGround_Address, TutorialGround_address } from "@/scripts/ContractConstants.js";
import fetchData from "@/scripts/fetchData";
import fetchToken from "@/scripts/fetchToken";
import { ethers } from 'ethers';
import { nftMyProfile_ABI } from '@/scripts/ContractConstants'

let { nftProfileFactory_contract, socialMedia_contract, discussion_contract, tutorial_contract, signer } = getSignerContract();

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
                createPostState: 'idle',
                myProfileContract: null,
                allPosts: [],
                postComments: [],
                post: [],
                createNewsState: 'idle',
                news: [],
                allNews: [],
                sharedCards: [],
                shareMyCardState: 'idle',
                myPosts: [],
                myProfileDetails: [],
                profileDetails: [],
                postCommented: 'idle',
                createdPosts: [],
                createdDiscussions: [],
                createdDiscussionsState: 'idle',
                allDiscussions: [],
                cardsToShare: [],
                currentDiscussion: null,
                discussionAnswers: [],
                discussionAnswered: 'idle',
                myDiscussions: [],
                createdTutorialsState: 'idle'

            }
        }
    },

    getters: {
        getStoreItem: (state) => {
            return (entity) => state.state[entity]
        }
    },


    actions: {

        // ************************************************************************     PROFILE    *********************************************************************************************************

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
                    discussionGround_Address,
                    TutorialGround_address,
                    profileData.name,
                    profileCID
                );

                store.isLoading = true;
                let storedResponse = await deployedContractAddress.wait();
                console.log(storedResponse, "lol");

                if (storedResponse?.events[0]?.args?.ProfileContract) {
                    store.createProfileState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Added profile successfully!");

                    // Push the storedResponse to the profiles array
                    // store.profiles.push(storedResponse);
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

        async editProfile(profileData) {
            const store = this;
            console.log(profileData);

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

                
                const editedProfile = await nftProfileFactory_contract.editProfile(
                    profileData?.profileContract,
                    profileCID
                );

                store.isLoading = true;
                let storedResponse = await editedProfile.wait();
                console.log(storedResponse, "lol");

                if (storedResponse?.events[0]?.event == "NFTProfileUpdated") {
                    store.createProfileState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Updated profile successfully!");

                    // Push the storedResponse to the profiles array
                    // store.profiles.push(storedResponse);
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
                    profileContract: profileData[1]
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


                const promises = getAllDeployedNFTCollections.map(async (profile) => {
                    const profileDetails = await fetchData(profile[3]);
                    const responseData = await this.loadProfile(profile[0]);
                    const followingStatus = await this.isFollowingProfile(profile[0]);
                    const connectedAddress = (await this.getConnectedAddress()).toLowerCase();
                    const profileAddress = profile[0].toLowerCase();                   
                    const myProfile = connectedAddress === profileAddress;

                    console.log(connectedAddress, profile[0], myProfile);
                    let timestamp = profile[4];
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                        return {
                            ...profile,
                            timestamp: readableDate,
                            isFollowing: followingStatus,
                            profilePhoto: profileDetails[0]?.photoCID,
                            myProfile: myProfile
                        };
                });

                const listItem = await Promise.all(promises);
  

                // Update store state with fetched profiles
                store.state['allProfiles'] = listItem;



                // Update store state with fetched profiles
                // store.state['allProfiles'] = getAllDeployedNFTCollections;

            } catch (error) {
                console.error('Error loading profiles:', error);
                // Handle error
                notifyError('Error loading profiles: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async cardsToShare() {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const getAllDeployedNFTCollections = await nftProfileFactory_contract.getAllDeployedNFTCollections()


                const promises = getAllDeployedNFTCollections.map(async (profile) => {
                    const profileDetails = await fetchData(profile[3]);
                    const responseData = await this.loadProfile(profile[0]);
                    const sharedStatus = await this.isCardShared(profile[0]);
                    const connectedAddress = (await this.getConnectedAddress()).toLowerCase();
                    const profileAddress = profile[0].toLowerCase();                   
                    const myProfile = connectedAddress === profileAddress;

                    let timestamp = profile[4];
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                        return {
                            ...profile,
                            timestamp: readableDate,
                            isShared: sharedStatus,
                            profilePhoto: profileDetails[0]?.photoCID,
                            myProfile: myProfile
                        };
                });

                const listItem = await Promise.all(promises);
  

                // Update store state with fetched profiles
                store.state['cardsToShare'] = listItem;



                // Update store state with fetched profiles
                // store.state['allProfiles'] = getAllDeployedNFTCollections;

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

                    const profileDetails = await fetchData(followName[3]);
                    const responseData = await this.loadProfile(followName[0]);
                    const followingStatus = await this.isFollowingProfile(followName[0]);
                    let timestamp = followName[4];
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                        return {
                            ...followName,
                            timestamp: readableDate,
                            isFollowing: followingStatus,
                            profilePhoto: profileDetails[0]?.photoCID
                        };
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

                    const profileDetails = await fetchData(followName[3]);
                    const responseData = await this.loadProfile(followName[0]);
                    const followingStatus = await this.isFollowingProfile(followName[0]);
                    let timestamp = followName[4];
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                        return {
                            ...followName,
                            timestamp: readableDate,
                            isFollowing: followingStatus,
                            profilePhoto: profileDetails[0]?.photoCID
                        };
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

                    const profileDetails = await fetchData(card[3]);
                    const responseData = await this.loadProfile(card[0]);
                    const sharedStatus = await this.isCardShared(card[0]);
                    let timestamp = card[4];
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                        return {
                            ...card,
                            timestamp: readableDate,
                            isShared: sharedStatus,
                            profilePhoto: profileDetails[0]?.photoCID
                        };
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

                const follow = await nftProfileFactory_contract.followProfile(profile?.owner)

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

        async loadMyProfileContract(address) {

            const store = this;

            try {
                store.isLoading = true;

                const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(address)

                const profileContract = await getprofileContract?.ProfileContract
                const nftMyProfile_contract = new ethers.Contract(profileContract, nftMyProfile_ABI, signer);

                // Update store state with fetched profiles
                store.state['myProfileContract'] = nftMyProfile_contract;

            } catch (error) {
                console.error('Error loading myProfileContract:', error);
                // Handle error
                notifyError('Error loading myProfileContract: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async shareProfile(profile) {
            const store = this;

            try {
                const shareMyCard = await nftProfileFactory_contract.shareCard(profile?.owner)
                console.log(shareMyCard, "kmdkemk", profile?.owner);

                store.isLoading = true;
                const result = await shareMyCard.wait();

                console.log(result);


                if (result?.events[0].event) {
                    store.shareMyCardState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Shared card successfully!");
                }
                else {
                    store.createProfileState = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating post: Deployed contract address not returned.');
                }

            } catch (error) {
                console.error('Error sharing card:', error);
                // Handle error
                notifyError('Error sharing card: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async myProfileDetails(myAddress) {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const profile = await nftProfileFactory_contract.profileByAddressOwner(myAddress);

                // Extract the token URL from profileData
                const tokenUrl = profile[3];

                // Fetch additional profile details from the token URL using fetchData function
                const profileDetails = await fetchData(tokenUrl);

                // Process profile data
                const processedProfiles = profileDetails.map(input => ({
                    photo: input.photoCID,
                    name: input.name,
                    fullName: input.fullName,
                    institution: input.organisation,
                    links: input.contacts,
                    bibliography: input.bibliography,
                    skills: input.skills,
                }));



                // Update store state with fetched profiles
                store.state['myProfileDetails'] = processedProfiles;

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

        async loadProfile(address) {
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
                    profileContract: profileData[1]
                }));

                // Update store state with fetched profiles
                store.state['profileDetails'] = processedProfiles;

                // Log fetched profiles
                // console.log('Fetched profiles:', store.state.myProfile);

            } catch (error) {
                console.error('Error loading profileDetails:', error);
                // Handle error
                notifyError('Error loading profileDetails: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },


        async isFollowingProfile(profileAddress) {
            try {
                const isFollowing = await nftProfileFactory_contract.isFollowingProfile(profileAddress);
                return isFollowing;  // Assuming it returns a boolean or similar value
            } catch (error) {
                console.error("Error checking follow status:", error);
                return false;  // Or handle the error as needed
            }
        },


        async isCardShared(profileAddress) {
            try {
                const isCardShared = await nftProfileFactory_contract.isCardShared(profileAddress);
                return isCardShared;  // Assuming it returns a boolean or similar value
            } catch (error) {
                console.error("Error checking isCardShared status:", error);
                return false;  // Or handle the error as needed
            }
        },

        // ************************************************************************     NEWS    *********************************************************************************************************


        async PostNews(newsData) {
            const store = this;


            console.log(newsData, "comeon and go");
            try {
                store.createNewsState = 'pending'; // Set state to pending while profile creation is in progress

                console.log(newsData);

                let photo = null
                if (newsData?.photo[0]?.attachmentPath) {
                    photo = newsData.photo[0].attachmentPath
                }
                else {
                    photo = null
                }
                const newsCID = await addMetadataFile(
                    {
                        "photo": photo,
                        "title": newsData?.title,
                        "description": newsData?.description,
                    }

                );
                console.log('News created successfully with metadata. CID:', newsCID);


                const createNews = await socialMedia_contract.createNews(
                    newsCID
                )

                store.isLoading = true;
                let storedResponse = await createNews.wait();

                console.log(storedResponse, "tfdgfhuyrgfyugurbfugvuguhruiefgirhuifg");

                const newsId = parseInt(storedResponse?.events[0].args.NewsId);

                if (newsId) {
                    store.createNewsState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Added profile successfully!");

                    // Push the storedResponse to the profiles array
                    store.news.push(storedResponse);
                } else {
                    store.createNewsState = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating profile: Deployed contract address not returned.');
                }

            } catch (error) {
                store.createNewsState = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error creating post: ' + error.message);
            } finally {
                store.isLoading = false;
            }
        },

        async loadAllNews() {

            const store = this;

            try {
                const fetchAllNewsCreated = await socialMedia_contract.fetchAllNewsCreated()

                const promises = fetchAllNewsCreated.map(async (news) => {
                    const responseData = await fetchToken(news?.newsUrl);

                    let timestamp = parseInt(news?.time);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                    if (typeof news === 'object') {
                        return {
                            ...news,
                            hex: parseInt(news._hex),
                            timestamp: readableDate,
                            newsUrl: news?.newsUrl,
                            newsData: responseData,
                        };
                    }
                    else {
                        return news;
                    }
                });

                const listNews = await Promise.all(promises);

                // Update store state with fetched profiles
                store.state['allNews'] = listNews;

            } catch (error) {
                console.error('Error loading allNews:', error);
                // Handle error
                notifyError('Error loading allNews: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },


        // ************************************************************************     POSTS    *********************************************************************************************************

        async Post(postData) {
            const store = this;

            console.log(postData, "comeon and go");
            console.log(postData?.profileContract?.address, "comeon and go");
            try {

                store.createPostState = 'pending'; // Set state to pending while profile creation is in progress

                const postCID = await addMetadataFile(
                    {
                        "post": postData.image[0].attachmentPath,
                        "description": postData.description,
                    }

                );
                const nftMyProfile_contract = new ethers.Contract(postData?.profileContract?.address, nftMyProfile_ABI, signer);

                const createPost = await nftMyProfile_contract.createPost(
                    postCID
                );
                console.log(createPost); // Log the deployed contract address
                store.isLoading = true;
                // wait() function allows to wait for transaction to be completed
                let receipt = await createPost.wait()

                console.log(receipt, "IMYSM");

                const tokenIdBigNumber = receipt?.events[3].args.tokenId;

                // Convert BigNumber to JavaScript number
                const postId = parseInt(tokenIdBigNumber);

                console.log(tokenIdBigNumber);

                


                const publishPost = await socialMedia_contract.createPost(
                    postData?.profileContract?.address,
                    postId,
                )

                store.isLoading = true;

                console.log(publishPost);
                let publishedPost = await publishPost.wait()
                console.log(publishedPost);


                
                console.log(publishedPost?.events[1].args.PostId);

                const publishedPostIdBigNumber = publishedPost?.events[1].args.PostId
                const publishedPostId = publishedPostIdBigNumber.toNumber()

                // // not decodeFunctionData
                // // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
                // // encodedData is found in receipt

                if (publishedPostId) {
                    store.createPostState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Added post successfully!");

                    // Push the storedResponse to the profiles array
                    // store.createdPosts.push(storedResponse);
                } else {
                    store.createPostState = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating post: Deployed contract address not returned.');
                }

            } catch (error) {
                store.createPostState = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error creating post: ' + error.message);
            }
            finally {
                store.isLoading = false;
            }
        },

        async loadAllPosts(address) {

            const store = this;

            try {
                const getMyPosts = await socialMedia_contract.fetchAllPostsCreated()

                const promises = getMyPosts.map(async (post) => {

                    let nftMyProfile_contract = new ethers.Contract(post?.profileContract, nftMyProfile_ABI, signer);

                    let profile = await nftProfileFactory_contract.profileByAddressOwner(post?.creator);



                    let postUrl = await nftMyProfile_contract.getTokenURIById(parseInt(post.PostId._hex));
                    const responseData = await fetchToken(postUrl);
                    const image = await fetchToken(profile.profileUrl)
                    const like = await socialMedia_contract.likedBy(address, parseInt(post.PostId._hex))
                    const unlike = await socialMedia_contract.unLikedBy(address, parseInt(post.PostId._hex))

                    let timestamp = parseInt(post);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                    console.log(post, "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
                    if (typeof post === 'object') {
                        return {
                            ...post,
                            hex: parseInt(post._hex),
                            timestamp: readableDate,
                            postUrl: postUrl,
                            postData: responseData,
                            owner: profile?.username,
                            image: image?.photoCID,
                            liked: like,
                            unliked: unlike
                        };
                    }
                    else {
                        return post;
                    }
                });

                const listItem = await Promise.all(promises);
  

                // Update store state with fetched profiles
                store.state['allPosts'] = listItem;

            } catch (error) {
                console.error('Error loading myProfileContract:', error);
                // Handle error
                notifyError('Error loading myProfileContract: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async loadMyPosts(myAddress) {
            const store = this;

            try {
                store.isLoading = true;

                const getMyPosts = await socialMedia_contract?.fetchMyPostsCreated()

                console.log(getMyPosts, "gvdgvdtyefyvgy");

                // const getPosts = await getprofileByAddressContract("0x94099942864EA81cCF197E9D71ac53310b1468D8")
                // console.log("0x94099942864EA81cCF197E9D71ac53310b1468D80x94099942864EA81cCF197E9D71ac53310b1468D8");

                this.loadMyProfileContract(myAddress)

                const myProfileContractAddress = store.state['myProfileContract'].address
                let nftMyProfile_contract = new ethers.Contract(myProfileContractAddress, nftMyProfile_ABI, signer);

                const promises = getMyPosts.map(async (post) => {
                    let postUrl = await nftMyProfile_contract.getTokenURIById(parseInt(post.PostId._hex));
                    console.log(postUrl, "postUrl");
                    const responseData = await fetchToken(postUrl);
                    console.log(responseData, "responseData");

                    let timestamp = parseInt(post);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                    if (typeof post === 'object') {
                        return {
                            ...post,
                            hex: parseInt(post._hex),
                            timestamp: readableDate,
                            postUrl: postUrl,
                            postData: responseData
                        };
                    }
                    else {
                        return post;
                    }
                });

                const listItem = await Promise.all(promises);

                // Update store state with fetched profiles
                store.state['myPosts'] = listItem;

            } catch (error) {
                console.error('Error loading myPosts:', error);
                // Handle error
                notifyError('Error loading myPosts: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async loadPostsComments(PostId) {

            const store = this;

            const postId = store.state['post'][0]

            console.log(parseInt(PostId), "hamming awqa");

            try {

                const comm = await socialMedia_contract.getAllCommentsMadeToPost(parseInt(PostId))

                store.isLoading = true;

                const commentTxt = comm.map(async (comment) => {
                    let commentsUrl = await fetchToken(comment.commentUrl)
                    let commentor = await nftProfileFactory_contract.profileByAddressOwner(comment?.commentor);
                    let image = await fetchToken(commentor?.profileUrl)
                    let timestamp = parseInt(comment?.time);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();
                    if (typeof comment === 'object') {
                        return {
                            ...comment,
                            timestamp: readableDate,
                            commentTxt: commentsUrl,
                            commentorName: commentor?.username,
                            commentorImage: image?.photoCID
                        };
                    }
                    else {
                        return comment;
                    }
                });
                const comments = await Promise.all(commentTxt);
                // Update store state with fetched profiles
                store.state['postComments'] = comments;

            } catch (error) {
                console.error('Error loading this post comments:', error);
                // Handle error
                notifyError('Error loading this post comments: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },


        async commentPost(commentData, post) {

            const store = this;

            try {

                const commentCID = await addMetadataFile(
                    {
                        "comment": commentData.description,
                    }

                );
                console.log('Comment created successfully with metadata. CID:', commentCID);

                const publishComment = await socialMedia_contract.commentPost(
                    post,
                    commentCID,
                )

                store.isLoading = true;

                console.log(publishComment);
                let publishedComment = await publishComment.wait()
                console.log(publishedComment);


                if (publishedComment?.events[0].args.commentID) {
                    store.postCommented = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Comment sent successfully!");
                }
                else {
                    store.postCommented = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating post: Deployed contract address not returned.');
                }

            } catch (error) {
                console.error('Error loading myProfileContract:', error);
                // Handle error
                notifyError('Error loading myProfileContract: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },


        async getConnectedAddress() {
            const provider= await window.ethereum.request({ method: 'eth_requestAccounts' })
            return provider[0]        
        },

        // ************************************************************************     DISCUSSIONS    *********************************************************************************************************

        
        async createDiscussion(discussionData) {
            const store = this;
            try {

                store.createdDiscussionsState = 'pending'; // Set state to pending while profile creation is in progress

                const discussionCID = await addMetadataFile(
                    {
                        "name": discussionData.name,
                        "description": discussionData.description,
                    }

                );
                const nftMyProfile_contract = new ethers.Contract(discussionData?.profileContract?.address, nftMyProfile_ABI, signer);

                const creatediscussion = await nftMyProfile_contract.createDiscussion(
                    discussionCID
                );

                store.isLoading = true;

                // wait() function allows to wait for transaction to be completed
                let receipt = await creatediscussion.wait()

                console.log("ejrheh", receipt, "IMYSM");

                const tokenIdBigNumber = receipt?.events[3].args.tokenId;

                // Convert BigNumber to JavaScript number
                const discussionId = parseInt(tokenIdBigNumber);

                console.log(discussionId);

                
                const publishDiscussion = await discussion_contract.createDiscussion(
                    discussionData?.profileContract?.address,
                    discussionId,
                )

                // store.isLoading = true;

                // console.log(publishDiscussion);
                let publishedDiscussion = await publishDiscussion.wait()
                console.log(publishedDiscussion);


                
                console.log(publishedDiscussion?.events[1].args.discussionID);

                const publishedDiscussionIdBigNumber = publishedDiscussion?.events[1].args.discussionID
                const publishedDiscussionId = parseInt(publishedDiscussionIdBigNumber)

                // // not decodeFunctionData
                // // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
                // // encodedData is found in receipt

                if (publishedDiscussionId) {
                    store.creatediscussionState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Added discussion successfully!");

                    // Push the storedResponse to the profiles array
                    // store.createddiscussions.push(storedResponse);
                } else {
                    store.creatediscussionState = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating discussion: Deployed contract address not returned.');
                }

            } catch (error) {
                store.creatediscussionState = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error creating discussion: ' + error.message);
            }
            finally {
                store.isLoading = false;
            }
        },

        async loadAllDiscussions(address) {

            const store = this;

            try {
                const getAllDiscussion = await discussion_contract.fetchAllDiscussionsCreated()

                const promises = getAllDiscussion.map(async (discussion) => {

                    let nftMyProfile_contract = new ethers.Contract(discussion?.profileContract, nftMyProfile_ABI, signer);

                    let profile = await nftProfileFactory_contract.profileByAddressOwner(discussion?.creator);


                    let discussionUrl = await nftMyProfile_contract.getTokenURIById(parseInt(discussion.discussionId._hex));
                    const responseData = await fetchToken(discussionUrl);
                    const image = await fetchToken(profile.profileUrl)
                    const like = await discussion_contract.likedBy(address, parseInt(discussion.discussionId._hex))
                    const unlike = await discussion_contract.unLikedBy(address, parseInt(discussion.discussionId._hex))

                    let timestamp = parseInt(discussion);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                    if (typeof discussion === 'object') {
                        return {
                            ...discussion,
                            hex: parseInt(discussion._hex),
                            timestamp: readableDate,
                            discussionUrl: discussionUrl,
                            discussionData: responseData,
                            owner: profile?.username,
                            image: image?.photoCID,
                            liked: like,
                            unliked: unlike
                        };
                    }
                    else {
                        return discussion;
                    }
                });

                const listItem = await Promise.all(promises);
  

                // Update store state with fetched profiles
                store.state['allDiscussions'] = listItem;

            } catch (error) {
                console.error('Error loading discussions created:', error);
                // Handle error
                notifyError('Error loading discussions created: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async loadADiscussion(address, discussionId) {

            const store = this;

            try {
                const discussion = await discussion_contract.getADiscussion(discussionId)

                let nftMyProfile_contract = new ethers.Contract(discussion?.profileContract, nftMyProfile_ABI, signer);

                let profile = await nftProfileFactory_contract.profileByAddressOwner(discussion?.creator);


                console.log(profile);

                let discussionUrl = await nftMyProfile_contract.getTokenURIById(parseInt(discussion.discussionId._hex));
                const responseData = await fetchToken(discussionUrl);
                const image = await fetchToken(profile.profileUrl)
                const like = await discussion_contract.likedBy(address, parseInt(discussion.discussionId._hex))
                const unlike = await discussion_contract.unLikedBy(address, parseInt(discussion.discussionId._hex))

                let timestamp = parseInt(discussion);
                let readableDate = new Date(timestamp * 1000).toLocaleString();

                // Construct the discussion object with additional data
                const discussionItem = {
                    ...discussion,
                    hex: parseInt(discussion.discussionId._hex),
                    timestamp: readableDate,
                    discussionUrl: discussionUrl,
                    discussionData: responseData,
                    owner: profile?.username,
                    image: image?.photoCID,
                    liked: like,
                    unliked: unlike
                };

                // Update the store state with the new discussion
                store.state.currentDiscussion = discussionItem;

                console.log('Discussion loaded:', discussionItem);

                // // Update store state with fetched profiles
                // store.state['allDiscussions'] = listItem;

            } catch (error) {
                console.error('Error loading discussions created:', error);
                // Handle error
                notifyError('Error loading discussions created: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async loadMyDiscussions(myAddress) {
            const store = this;

            try {
                store.isLoading = true;

                const getMyDiscussion = await discussion_contract?.fetchMyDiscussionsCreated()

                console.log(getMyDiscussion, "gvdgvdtyefyvgy");

                this.loadMyProfileContract(myAddress)

                const myProfileContractAddress = store.state['myProfileContract'].address
                let nftMyProfile_contract = new ethers.Contract(myProfileContractAddress, nftMyProfile_ABI, signer);

                const promises = getMyDiscussion.map(async (post) => {
                    let postUrl = await nftMyProfile_contract.getTokenURIById(parseInt(post.discussionTokenId._hex));
                    const responseData = await fetchToken(postUrl);
                    let timestamp = parseInt(post);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

                    if (typeof post === 'object') {
                        return {
                            ...post,
                            hex: parseInt(post._hex),
                            timestamp: readableDate,
                            postUrl: postUrl,
                            postData: responseData
                        };
                    }
                    else {
                        return post;
                    }
                });

                const listItem = await Promise.all(promises);

                // Update store state with fetched profiles
                store.state['myDiscussions'] = listItem;

            } catch (error) {
                console.error('Error loading myDiscussions:', error);
                // Handle error
                notifyError('Error loading myDiscussions: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async postAnswer(discussionData) {

            console.log(discussionData, "leo vi[o");
            const store = this;

            try {

                const answerCID = await addMetadataFile(
                    {
                        "answer": discussionData?.description,
                    }

                );
                console.log('answer created successfully with metadata. CID:', answerCID);

                const publishAnswer = await discussion_contract.AnswerDiscussion(
                    discussionData?.discussionId,
                    answerCID,
                )

                store.isLoading = true;
                let publishedanswer = await publishAnswer.wait()
                console.log(publishedanswer);


                if (publishedanswer?.events[0].args.answerID) {
                    store.discussionAnswered = 'success'; // Set state to success after successful profile creation
                    notifySuccess("answer sent successfully!");
                }
                else {
                    store.discussionAnswered = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating post: Deployed contract address not returned.');
                }

            } catch (error) {
                console.error('Error loading myProfileContract:', error);
                // Handle error
                notifyError('Error loading myProfileContract: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async loadDiscussionAnswers(discussionId) {

            const store = this;

            try {

                const answers = await discussion_contract.getAllAnswersMadeToDiscussion(discussionId)

                store.isLoading = true;

                console.log(answers, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

                const answerDetails = answers.map(async (answer) => {
                    let answersUrl = await fetchToken(answer.answerUrl)
                    let answeror = await nftProfileFactory_contract.profileByAddressOwner(answer?.answeror);
                    let image = await fetchToken(answeror?.profileUrl)
                    let timestamp = parseInt(answer?.time);
                    const like = await discussion_contract.answerLikedBy(answer?.answeror, parseInt(answer.answerID))
                    const unlike = await discussion_contract.answerUnLikedBy(answer?.answeror, parseInt(answer.answerID))
                    let readableDate = new Date(timestamp * 1000).toLocaleString();
                    if (typeof answer === 'object') {
                        return {
                            ...answer,
                            timestamp: readableDate,
                            answerTxt: answersUrl,
                            answerorName: answeror?.username,
                            answerorImage: image?.photoCID,
                            liked: like,
                            unliked: unlike
                        };
                    }
                    else {
                        return answer;
                    }
                });
                const answersList = await Promise.all(answerDetails);
                // Update store state with fetched profiles
                store.state['discussionAnswers'] = answersList;

            } catch (error) {
                console.error('Error loading this post comments:', error);
                // Handle error
                notifyError('Error loading this post comments: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },


        // ************************************************************************     TUTORIAL    *********************************************************************************************************
        async createTutorial(tutorialData) {
            const store = this;
            try {

                store.createdTutorialsState = 'pending'; // Set state to pending while profile creation is in progress

                const tutorialCID = await addMetadataFile(
                    {
                        "name": tutorialData.name,
                        "description": tutorialData.description,
                    }

                );
                const nftMyProfile_contract = new ethers.Contract(tutorialData?.profileContract?.address, nftMyProfile_ABI, signer);

                const createTutorial = await nftMyProfile_contract.createTutorail(
                    tutorialCID
                );

                store.isLoading = true;

                // wait() function allows to wait for transaction to be completed
                let receipt = await createTutorial.wait()

                console.log("ejrheh", receipt, "IMYSM");

                const tokenIdBigNumber = receipt?.events[3].args.tokenId;

                // Convert BigNumber to JavaScript number
                const tutorialId = parseInt(tokenIdBigNumber);

                console.log(tutorialId);

                const publishTutorial = await tutorial_contract.createTutorial(
                    tutorialData?.profileContract?.address,
                    tutorialId,
                )

                // store.isLoading = true;

                // console.log(publishTutorial);
                let publishedDiscussion = await publishTutorial.wait()
                console.log(publishedDiscussion);


                
                console.log(publishedDiscussion?.events[1].args.discussionID);

                const publishedDiscussionIdBigNumber = publishedDiscussion?.events[1].args.discussionID
                const publishedDiscussionId = parseInt(publishedDiscussionIdBigNumber)

                // // not decodeFunctionData
                // // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
                // // encodedData is found in receipt

                if (publishedDiscussionId) {
                    store.createdTutorialsState = 'success'; // Set state to success after successful profile creation
                    notifySuccess("Added discussion successfully!");

                    // Push the storedResponse to the profiles array
                    // store.createddiscussions.push(storedResponse);
                } else {
                    store.createdTutorialsState = 'error'; // Set state to error if contract address is not returned
                    notifyError('Error creating discussion: Deployed contract address not returned.');
                }

            } catch (error) {
                store.createdTutorialsState = 'error'; // Set state to error if an error occurs during profile creation
                notifyError('Error creating discussion: ' + error.message);
            }
            finally {
                store.isLoading = false;
            }
        },
    },
});
