<template>
    <div class="p-3 flex-col font-bold hidden sm:flex" style="width: 280px;">
  
      <div class="capitalize border-b pt-2 pb-3 text-center mb-2 font-bold text-primary2">
        Dwitter
      </div>
  
      <div class="overflow-y-scroll h-full">
        <template v-for="(navigationLink, index) of navigationLinks" :key="index">
          <template v-if="!navigationLink?.children?.length">
            <div class="flex items-center rounded-md" v-if="isActive(navigationLink?.link)" style="background-color: #c6deff">
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

        <div class="p-2 mt-8 mx-8 cursor-pointer">
          <Post @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></Post>
        </div>

      </div>


     
  
    </div>
  </template>
  
  <script setup>
  import Post from '../../views/Post.vue'
  import SvgIcon from "@/components/shared/SvgIcon.vue";
  import {useRoute} from "vue-router";
  import {ref} from "vue";
  import {walletAddressConnected} from "@/scripts/ContractConstants";

  const route = useRoute()
  const hoveredLink = ref(null)
  const childHoveredLink = ref(null)
  
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
  </script>
  
  
  <style scoped lang="scss">
  
  .inactive {
    color: #707070;
  }
  .inactive:hover {
    color: #257ae4
  }
  
  </style>
  