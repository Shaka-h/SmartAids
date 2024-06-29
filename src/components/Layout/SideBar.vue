<template> 
  <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>

    <div class="p-3 css-selector  flex-col font-bold hidden sm:flex" style="width: 280px; ">
  
      <div class="capitalize name border-b pt-2 pb-3 text-center mb-2 font-bold " style="color: #0D1042; " >
        AlphaConnect
      </div>
      <div class="flex space-x-4 mt-4 items-center" v-if="myProfile?.length"> 
  <!--      <button type="button" class="border hover:font-bold btn border-white px-2 mr-3 text-white rounded-md" @click="toggleLanguage">{{ buttonText }}</button>-->
        <div v-if="!myProfile[0]?.profileContract" class="w-10 h-10 border rounded-full flex items-center justify-center shadow-lg bg-white">
          <img src="@/assets/images/profile.png"  alt="Profile picture">
        </div>

        <div v-if="myProfile[0]?.profileContract" class="rounded-md shadow intro-x ">
          <img :src="`http://127.0.0.1:8080/ipfs/${myProfile[0]?.photoCID}`" class="w-10 h-10 rounded-full" alt="Profile picture"/>
        </div>

        <span class="mr-2">{{myProfile[0].name}}</span>
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
                <svg-icon :name="navigationLink?.icon" height="h-5" width="w-5" class="icon" color="#0D1042" v-else></svg-icon>
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

        <div v-if="myProfile?.length" class="p-2 mt-8 mx-8 cursor-pointer">
          <div @click="postSomething" class="bg-primary rounded-lg p-1 items-center flex justify-center cursor-pointer">POST</div>
        </div>

      </div>


     
  
    </div>
  </template>
  
  <script setup>
  import Post from '../../views/Post/PostForm.vue'
  import SvgIcon from "@/components/shared/SvgIcon.vue";
  import {useRoute} from "vue-router";
  import {onMounted, ref, computed} from "vue";
  import {walletAddressConnected} from "@/scripts/ContractConstants";
  import { useAlphaConnectStore } from "@/store/index.js";
  import {storeToRefs} from "pinia";

  const alphaConnectStore = useAlphaConnectStore();
  const route = useRoute()
  const hoveredLink = ref(null)
  const childHoveredLink = ref(null)
  const { getStoreItem } = storeToRefs(alphaConnectStore)

  const isActive = (link) => {
    return route.fullPath.includes(link)
  }

  const myProfile = computed(() => {
    return getStoreItem.value("myProfile")
  })

const navigationLinks = ref([
  {
    name: "Posts",
    link: "/posts",
    icon: "testimonials",
    permissions: [""],
  },
  {
    name: "News",
    link: "/news",
    icon: "news",
    permissions: [""],
  },
  {
    name: "Profile",
    link: "/profile",
    icon: "links",
    permissions: [""],
  },
  {
    name: "Discussions",
    link: "/discussion",
    icon: 'discussion',
    permissions: ['']
  },
  // {
  //   name: "Q&A",
  //   link: "/qna",
  //   icon: 'category',
  //   permissions: ['']
  // },
  {
    name: "Tutorials",
    link: "/tutorial",
    icon: 'data',
    permissions: ['']
  },
  {
    name: "Presentations",
    link: "/presentation",
    icon: 'presentation',
    permissions: ['']
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: "notification",
    permissions: [""],
  },
]);

const makeAPost = ref(false);

const closeDialog = () => {
  emits("closeDialog");
};

const postSomething = () => {
  makeAPost.value = true;
};


onMounted(async () => {
    await alphaConnectStore.loadMyProfile(alphaConnectStore.getConnectedAddress());
});
</script>

<style scoped lang="scss">
.inactive {
  color: #0d1042;
}
.inactive:hover {
  color: #257ae4;
}

.name {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 25px;
}

.sideBack {
  background: rgb(187, 132, 147);
  background: radial-gradient(
    circle,
    rgba(187, 132, 147, 1) 43%,
    rgba(219, 175, 160, 1) 69%,
    rgba(146, 144, 195, 1) 78%
  );
}

.css-selector {
  background: linear-gradient(270deg, #bb8493, #535c91, #9290c3);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 39s ease infinite;
  -moz-animation: AnimationName 39s ease infinite;
  animation: AnimationName 39s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
