<template>
  <div>
    <main-layout :navigation-links="navigationLinks" :panel-name="panelName" :directories="directories"></main-layout>
  </div>
</template>

<script setup>

import MainLayout from "@/components/Layout/MainLayout.vue";
import { ref } from "vue";

const panelName = ref('Beneficiery')
const navigationLinks = ref([
  {
    name: "profile",
    link: "/beneficieries/profile",
    icon: 'dashboard',
    permissions: ['']
  },
  {
    name: "posts",
    link: "/beneficieries/posts",
    icon: 'request',
    permissions: ['']
  },
  {
    name: "news",
    link: "/beneficieries/news",
    icon: 'group',
    permissions: ['']
  },
  {
    name: "setting",
    link: "/beneficieries/setting",
    icon: 'experience',
    permissions: [''],
  },
  {
    name: "discussion",
    link: "/beneficieries/discussion",
    icon: 'sponsors',
    permissions: [''],
  },
  {
    name: "qna",
    link: "/beneficieries/qna",
    icon: 'challenges',
    permissions: [''],
  },

])

const directories = ref([
  {
    title: "Beneficiery",
    disabled: false,
    href: "/settings/user-management",
  },
  {
    title: "profile",
    disabled: true,
    href: "user",
  },
  // {
  //   title: "posts",
  //   disabled: true,
  //   href: "/beneficieries/posts",
  // },
  // {
  //   title: "news",
  //   disabled: true,
  //   href: "/beneficieries/news",
  // },
  // {
  //   title: "setting",
  //   disabled: true,
  //   href: "/beneficieries/setting",
  // },
  // {
  //   title: "discussion",
  //   disabled: true,
  //   href: "/beneficieries/discussion",
  // },
  // {
  //   title: "qna",
  //   disabled: true,
  //   href: "/beneficieries/qna",
  // },
]);
</script>

<style scoped></style>
