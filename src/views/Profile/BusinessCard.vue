<template>
    <v-dialog v-model="dialog" :persistent="false" width="750">
      <div class="bg-slate-100 rounded shadow" style="background-color: #E8E8E8">  
        <div class="p-4 space-x-4">
          <div class="flex flex-col mt-8 mx-8"> 
              <div class="flex items-center justify-between"> 
                <div class="">
                  <img src="../../assets/images/landing/landing4.jpg" class="rounded-full h-64 w-64"></img>
                </div>
                <div class="flex flex-col space-y-2"> 
                    <div>Miriam Shaka</div>
                    <div>Web3 Fullstack Developer</div>
                    <div>Cryptocurrency Expert</div>
                    <div>e-Government Authority</div>
                    <div class="flex space-x-2"> 
                        <div>instagram</div>
                        <div>Linkedln</div>
                        <div>facebook</div>
                    </div>
                </div>
                </div>
              <div> 
                  <div class="mt-8 font-bold">Bibliography</div>
                  <div class="mt-4"> 
                      OpenAI is an artificial intelligence research laboratory consisting of researchers and engineers who work on advancing artificial intelligence in a safe and ethical manner. Founded in December 2015, OpenAI's mission is to ensure that artificial general intelligence (AGI) benefits all of humanity. The organization conducts cutting-edge research in various fields of AI, including natural language processing, computer vision, reinforcement learning, and more. OpenAI also aims to promote transparency and collaboration in AI research and development.
                  </div>
              </div>
          </div>
      </div>
      </div>
    </v-dialog>
  
  </template>
  
  
  <script setup>
  
  import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
  import {ref, watch} from "vue";
  
  
  
  const dialog = ref(false)
  
  const props = defineProps(['openDialog'])
  const emits = defineEmits(['closeDialog'])
  
  watch(() => props.openDialog, (value) => {
    dialog.value = value
  })
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