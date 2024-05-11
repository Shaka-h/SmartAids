<template>
    <div>
      <nav-bar></nav-bar>

      <div class="mx-4 mt-4 rounded-t-xl shadow flex overflow-hidden" style="font-family: 'Quicksand', sans-serif;background-color: #fff; height: 100vh;">
         
        <side-bar></side-bar>
  
        <div class="py-3 px-4 w-full rounded-r-xl shadow-lg overflow-y-scroll" style="background-color: #70426418; height: 100%;">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>

<script setup>
import NavBar from '../NavBar.vue';
import SideBar from '../Layout/SideBar.vue'
</script>