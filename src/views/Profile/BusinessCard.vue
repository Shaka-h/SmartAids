<template>
    <v-dialog v-model="dialog" :persistent="true" width="750">
      <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
        <div class="px-3 pb-3">
            <button @click="$emit('close', true)">
                <svg-icon
                  name="close"
                  height="h-6"
                  width="w-6"
                  color="#a91926"
                  :override_color="true"
                  :stroke="false"
                ></svg-icon>
            </button>
          <dynamic-form-main
              :form-fields="formFields"
              submit-label="save"
              @on-submit="submitForm"
              :show-labels="selectedData?.id"
          ></dynamic-form-main>
        </div>
      </div>
    </v-dialog>
  
  </template>
  
  
  <script setup>
  
  import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
  import {ref} from "vue";
  
  
  
  const dialog = ref(false)
  
  const props = defineProps(['openDialog'])
  const emits = defineEmits(['closeDialog'])
  
  
  const formFields = ref(
      [
  
        {
          inputType: "input",
          type: "input",
          name: "testimonialAuthorOrganization",
          label: "organization",
          size: "medium",
          required: true,
        },
        {
          inputType: "input",
          type: "input",
          name: "testimonialAuthorDesignation",
          label: "designation",
          size: "medium",
          required: true,
        },
        {
          inputType: "textarea",
          type: "input",
          name: "testimonialContent",
          label: "content",
          size: "large",
          required: true,
        },
        {
          inputType: "file",
          accept: ["image/*"],
          multipleFiles: false,
          name: "testimonialImagePath",
          label: "picture",
          size: "large",
          required: true,
        },
      ]
  )
  
  const closeDialog = () => {
    emits('closeDialog')
  }
  
  </script>
  
  
  <style scoped>
  
  </style>