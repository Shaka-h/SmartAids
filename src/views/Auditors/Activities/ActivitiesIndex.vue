<template>
  <div>
    <CardLayout :cardItems="navigationLinks" />
  </div>
</template>
<script setup>
import CardLayout from "@/components/Layout/CardLayout.vue";

import { ref } from "vue";
const navigationLinks = ref([
  {
    title: "Designation",
    to: { name: "designationSetting" },
    path: "/settings/designation-settings",
    icon: "designation",
    // permissions: ["can_view_absent_request", "can_view_leave_request"],
  },
  {
    title: "Institution",
    to: { name: "institutionsettings" },
    path: "/settings/institution-settings",
    icon: "email",
    // permissions: ["can_view_absent_request", "can_view_leave_request"],
  },
  {
    title: "Roles",
    to: { name: "rolesSettings" },
    path: "/settings/role-settings",
    icon: "email",
    // permissions: ["can_view_absent_request", "can_view_leave_request"],
  },
]);
</script>
