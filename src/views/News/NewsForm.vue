<template>
    <v-dialog max-width="60%">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Post News"
            variant="flat"
            persistent
          ></v-btn>
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="Post News">
            <v-card-text>
              <div> 
                    <dynamic-form-main
                        :form-fields="formFields"
                        submit-label="Post"
                        :showLabels="true"
                        @on-submit="submitForm"
                    ></dynamic-form-main>
                </div>
            </v-card-text>
      
            <v-card-actions>
              <v-spacer></v-spacer>      
              <v-btn
                text="Close"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);

const dialog = ref(false);

const close = ref(false)
const formFields = [
    {
        inputType: "input",
        type: "input",
        name: "title",
        label: "Title",
        size: "large",
        required: true,
    },
    {
        inputType: "rich-text",
        name: "description",
        label: "Description",
        size: "large",
        required: true,
    },
    {
        inputType: "file",
        label: "Photo",
        accept: ["image/*"],
        multipleFiles: false,
        name: "photo",
        size: "large",
        required: true,
    },
];
</script>