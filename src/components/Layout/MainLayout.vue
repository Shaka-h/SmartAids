<template>
    <div style="background-color: #EFEFEF;">
      <top-bar></top-bar>

      <nav-bar class="mt-1" :panel-name="panelName" :has-breadcrumb="directories"></nav-bar>

      <div class="mx-4 mt-4 flex overflow-hidden" style="font-family: 'Quicksand', sans-serif; height: 100vh;">
         
        <side-bar :navigation-links="navigationLinks" :panel-name="panelName"></side-bar>

        <div class="py-3 px-4 w-full rounded-r-xl shadow-lg overflow-y-scroll" style="background-color: #FAFAFA; height: 100%;">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>

<script setup>
import NavBar from '../NavBar.vue';
import SideBar from '../Layout/SideBar.vue';
import TopBar from '../Layout/TopBar.vue';

const props = defineProps(['navigationLinks', 'panelName', 'directories'])



</script>