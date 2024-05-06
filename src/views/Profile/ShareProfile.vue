<template>
    <v-dialog max-width="40%">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Share Profile"
            variant="flat"
            persistent
          ></v-btn>
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="Share My Profile">
            <v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>      
                    <v-btn
                      text="Close"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
              <div> 
                <div class="flex items-center space-x-2"> 
                    <div class="w-full p-4"><input class="form-control input" /></div>
                    <div class="p-2 bg-primary rounded-lg">share</div>
                </div>
                </div>
                <div> 
                    <div v-for="(follow, index) of followersList" :key="index" class="hover:bg-blue border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                        <div>{{ follow.name }}</div>
                        <div class="cursor-pointer">
                            <svg-icon :name="'download3'" class="icon cursor-pointer" color="#020202"></svg-icon>
                        </div>
                    </div>
                </div>
            </v-card-text>
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
        name: "name",
        label: "Filter Name",
        size: "large",
        required: true,
    },
];

const followersList = ref([
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    },
    {
        name: "Miriam"
    }
])

</script>