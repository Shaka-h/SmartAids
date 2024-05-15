import { notifyError, notifySuccess, notifyWarning } from "@/services/notificationService";
import { getSignerContract } from '@/scripts/ContractUtils.js';
import { defineStore } from "pinia";
import addMetadataFile from "@/scripts/IPFSJSON.js";
import { socialMedia } from "@/scripts/ContractConstants.js";
import fetchData from "@/scripts/fetchData";
import fetchToken from "@/scripts/fetchToken";
import { ethers } from 'ethers';
import { nftMyProfile_ABI } from '@/scripts/ContractConstants'

let { nftProfileFactory_contract, socialMedia_contract, signer } = getSignerContract();

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
                myPosts: []

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

        async Post(postData) {
            const store = this;

            console.log(postData, "comeon and go");
            try {
                store.createPostState = 'pending'; // Set state to pending while profile creation is in progress

                const postCID = await addMetadataFile(
                    {
                        "post": postData.image[0].attachmentPath,
                        "description": postData.description,
                    }

                );

                const createPost = await postData.myProfileContract.createPost(
                    postCID
                );

                store.isLoading = true;
                let storedResponse = await createPost.wait();


                const postId = parseInt(storedResponse?.events[3].args.profileId);


                if (storedResponse?.events[3].args.profileId) {

                    const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(postData?.connectedAddress)
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

        async loadAllPosts(address) {

            const store = this;

            try {
                const getMyPosts = await socialMedia_contract.fetchAllPostsCreated()

                const promises = getMyPosts.map(async (post) => {

                    let nftMyProfile_contract = new ethers.Contract(post?.profileContract, nftMyProfile_ABI, signer);

                    let profile = await nftProfileFactory_contract.profileByAddressOwner(post?.creator);


                    let postUrl = await nftMyProfile_contract.getPostsURIById(parseInt(post.PostId._hex));
                    const responseData = await fetchToken(postUrl);
                    const image = await fetchToken(profile.profileUrl)
                    const like = await socialMedia_contract.likedBy(address, parseInt(post.PostId._hex))
                    const unlike = await socialMedia_contract.unLikedBy(address, parseInt(post.PostId._hex))

                    let timestamp = parseInt(post);
                    let readableDate = new Date(timestamp * 1000).toLocaleString();

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

                //   postComments.value = listItem.value[0]

                //   posts.value = listItem;    

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

        async loadPost(postId) {

            const store = this;

            try {
                const getMyPosts = await socialMedia_contract.idPost(postId)

                console.log(getMyPosts, "jjdjjjjjjjj");
                // Update store state with fetched profiles
                store.state['post'] = getMyPosts;

            } catch (error) {
                console.error('Error loading post:', error);
                // Handle error
                notifyError('Error loading post: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async loadPostsComments(PostId) {

            const store = this;

            const post = await this.loadPost(PostId)

            const postId = store.state['post'][0]

            console.log(parseInt(postId), "hdftyfgyaerfg");

            try {

                const comm = await socialMedia_contract.getAllCommentsMadeToPost(parseInt(postId))

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
                console.error('Error loading myProfileContract:', error);
                // Handle error
                notifyError('Error loading myProfileContract: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

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

                const listItem = await Promise.all(promises);

                //   postComments.value = listItem.value[0]

                //   posts.value = listItem;    

                // Update store state with fetched profiles
                store.state['allNews'] = listItem;

            } catch (error) {
                console.error('Error loading allNews:', error);
                // Handle error
                notifyError('Error loading allNews: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async shareProfile(profile) {
            const store = this;

            try {
                const shareMyCard = await nftProfileFactory_contract.shareCard(profile?.ProfileContract)

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


        async loadMyPosts(myAddress) {

            const store = this;

            try {
                store.isLoading = true;

                const getMyPosts = await socialMedia_contract.fetchMyPostsCreated()

                console.log(getMyPosts, "gvdgvdtyefyvgy");

                this.loadMyProfileContract(myAddress)

                const myProfileContractAddress = store.state['myProfileContract'].address
                let nftMyProfile_contract = new ethers.Contract(myProfileContractAddress, nftMyProfile_ABI, signer);

                const promises = getMyPosts.map(async (post) => {
                    let postUrl = await nftMyProfile_contract.getPostsURIById(parseInt(post.PostId._hex));
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



    },
});
