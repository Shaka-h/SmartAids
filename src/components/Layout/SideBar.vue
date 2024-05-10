<template>
    <div class="p-3 flex-col font-bold hidden sm:flex" style="width: 280px;">
  
      <div class="capitalize name border-b pt-2 pb-3 text-center mb-2 font-bold text-primary2">
        AlphaConnect
      </div>
      <div class="flex space-x-4 mt-4 items-center" v-if="profileContract != 0x0000000000000000000000000000000000000000"> 
  <!--      <button type="button" class="border hover:font-bold btn border-white px-2 mr-3 text-white rounded-md" @click="toggleLanguage">{{ buttonText }}</button>-->
        <div v-if="!profile" class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
          <img src="@/assets/images/profile.png"  alt="Profile picture">
        </div>

        <div v-if="profile" class="rounded-md shadow intro-x ">
          <img :src="`http://127.0.0.1:8080/ipfs/${profileImage[0]?.photoCID}`" class="w-10 h-10 border bg-blue rounded-full" alt="Profile picture"/>
        </div>

        <span class="mr-2">{{profileName}}</span>
      </div>
  
      <div class="overflow-y-scroll mt-8 h-full space-y-4">
        <template v-for="(navigationLink, index) of navigationLinks" :key="index">
          <template v-if="!navigationLink?.children?.length">
            <div class="flex items-center rounded-md " v-if="isActive(navigationLink?.link)" style="background-color: #c6deff">
              <span class="bg-primary2 h-8 rounded-r" style="width: 4px;"></span>
              <div class="flex items-center p-2 text-primary2 font-bold">
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4"></svg-icon>
                <span class="px-2">{{ navigationLink?.name }}</span>
              </div>
            </div>
            <div class="flex items-center rounded-md cursor-pointer inactive intro-x" v-else
                 @click="goTo(navigationLink?.link)"
                 @mouseenter="hoveredLink = index"
                 @mouseleave="hoveredLink = null">
              <span class="bg-primary2 h-8 rounded-r" style="width: 4px;" v-if="hoveredLink === index"></span>
              <span class="h-8 rounded-r" style="width: 4px;" v-else></span>
              <div class="flex items-center p-2">
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4" v-if="hoveredLink === index"></svg-icon>
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#999999" v-else></svg-icon>
                <span class="px-2">{{ navigationLink?.name }}</span>
              </div>
            </div>
          </template>
  
          <template v-else>
            <div class="px-3 intro-x mt-3 italic text-sm font-bold" style="color: #707070;">{{ navigationLink?.name }}</div>
            <div class="border-b mx-3"></div>
            <template v-for="(childNavigationLink, childIndex) of navigationLink?.children" :key="childIndex">
              <div class="flex items-center rounded-md" v-if="isActive(childNavigationLink?.link)" style="background-color: #c6deff">
                <span class="bg-primary2 h-8 rounded-r" style="width: 4px;"></span>
                <div class="flex items-center p-2 text-primary2">
                  <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4"></svg-icon>
                  <span class="px-2">{{ childNavigationLink?.name }}</span>
                </div>
              </div>
              <div class="flex items-center rounded-md cursor-pointer inactive intro-x" v-else
                   @click="goTo(childNavigationLink?.link)"
                   @mouseenter="childHoveredLink = `${index}_${childIndex}`"
                   @mouseleave="childHoveredLink = null">
                <span class="bg-primary2 h-8 rounded-r" style="width: 4px;" v-if="childHoveredLink === `${index}_${childIndex}`"></span>
                <span class="h-8 rounded-r" style="width: 4px;" v-else></span>
                <div class="flex items-center p-2">
                  <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#257ae4" v-if="childHoveredLink === `${index}_${childIndex}`"></svg-icon>
                  <svg-icon :name="childNavigationLink?.icon" height="h-5" width="w-5" class="icon" color="#999999" v-else></svg-icon>
                  <span class="px-2">{{ childNavigationLink?.name }}</span>
                </div>           
              </div>
            </template>
          </template>
        </template>
        <div v-if="profileContract != 0x0000000000000000000000000000000000000000" class="p-2 mt-8 mx-8 cursor-pointer">
          <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>
        </div>

      </div>


     
  
    </div>
  </template>
  
  <script setup>
  import Post from '../../views/Post/PostForm.vue'
  import SvgIcon from "@/components/shared/SvgIcon.vue";
  import {useRoute} from "vue-router";
  import {onMounted, ref} from "vue";
  import {walletAddressConnected} from "@/scripts/ContractConstants";
  import {getSignerContract} from '../../scripts/ContractUtils';

  const route = useRoute()
  const hoveredLink = ref(null)
  const childHoveredLink = ref(null)
  let {nftProfileFactory_contract} = getSignerContract();
  const profileContract = ref()
  const profileName = ref()
  const profileImage = ref()
  const profile = ref()

  const isActive = (link) => {
    return route.fullPath.includes(link)
  }

  const navigationLinks = ref([
   {
    name: "Posts",
    link: `/${walletAddressConnected.value}/posts`,
    icon: 'testimonials',
    permissions: ['']
  },
  {
    name: "News",
    link: `/${walletAddressConnected.value}/news`,
    icon: 'news',
    permissions: ['']
  },
  {
    name: "Profile",
    link: `/${walletAddressConnected.value}/profile`,
    icon: 'links',
    permissions: ['']
  },
  {
    name: "Notifications",
    link: `/${walletAddressConnected.value}/setting`,
    icon: 'notification',
    permissions: ['']
  },
  {
    name: "Setting",
    link: `/${walletAddressConnected.value}/setting`,
    icon: 'category',
    permissions: ['']
  },
])

const makeAPost = ref(false)
const closeDialog = () => {
    emits("closeDialog");
  };

  const postSomething = () => {
    makeAPost.value = true;
};

const fetchData = async () => {
    const responseData = []; // Array to store response data

    try {
        const response = await fetch(`http://127.0.0.1:8080/ipfs/${profile.value}`);
        const data = await response.json();
        responseData.push(data); // Push data to responseData array
        console.log('Data for', data);
        // Handle data as needed
    } catch (error) {
        console.error('Error fetching data from', error);
        // Handle error
    }
    return responseData; // Return the array of response data
};

onMounted(async () => {
    const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(route?.params?.wallet)
    profileContract.value = await getprofileContract?.ProfileContract
    console.log(profileContract.value, "profileContract");
    profileName.value = await getprofileContract?.username
    profile.value = await getprofileContract?.profileUrl
    console.log(profile.value, "sdfghjkl;");

    await fetchData().then((responseData) => {
        console.log('All response data:', responseData);
        profileImage.value = responseData
    });

});

  </script>
  
  
  <style scoped lang="scss">
  
  .inactive {
    color: #707070;
  }
  .inactive:hover {
    color: #257ae4
  }
  
  .name{
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 25px;
  }
  </style>
  