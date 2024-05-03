<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Post"
            variant="flat"
          ></v-btn>
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="Make a post">
            <v-card-text>
              <div> 
                <FormRichText />
                <DragDropVue />
              </div>
            </v-card-text>
      
            <v-card-actions>
              <v-spacer></v-spacer>
      
              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>

<script setup>
import DragDropVue from '@/components/shared/DragDrop.vue';
import FormRichText from '@/components/shared/FormRichText.vue'
import { ref } from 'vue';

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);

const dialog = ref(false);

const close = ref(false)

</script>