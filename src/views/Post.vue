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
                <div class="flex flex-row flex-wrap gap-5 " :class="!multipleFiles ? 'justify-center items-center': ''">
                    <div
                      v-for="(selectedFile,index) in selectedFiles" :key="index"
                      class="imagePreviewWrapper transition delay-150 flex flex-col
                        rounded-lg border border-dashed border-primary/80 relative"
                      @mouseenter="triggerRemove({show: true, index})"
                      @mouseleave="triggerRemove({show: false, index})"
                      :style="{ 'background-image': `url(${selectedFile?.base64})` }">
                      <div class="">
                        <span class="text-center font-semibold my-1">{{ selectedFile?.name }}</span>
                        <div class="w-full flex items-center justify-center" v-if="fileIsDocumentType(selectedFile.name)" style="height: 100%">
                          <img :src="fetchDocumentIcon(selectedFile.name)" class="w-28 h-28"/>
                        </div>
                      </div>
                      <div class="backdrop-blur absolute top-0 w-full flex items-center justify-center hidden"
                           :id="`file_${uniqueName}_${index}`"
                        @click="removeFile(index)"  style="height: 100%; background-color: rgba(13,12,34,0.05)">
                        <svg-icon name="closeX" height="h-10" width="w-10" class="mr-1" color="#ff8c82" :stroke="true"></svg-icon>
                      </div>
                    </div>
                    <div v-if="multipleFiles" class="border p-5 grow flex items-center justify-center
                      text-center border-dashed my-3 cursor-pointer border-2 hover:bg-slate-100 text-gray-600 rounded"
                      @drop="handleDrop" @dragover.prevent @click="$refs.file.click()">
            <!--          <icon name="PlusCircle" size="40"/>-->
                      +
                    </div>
                  </div>
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
import { ref } from 'vue';

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);

const dialog = ref(false);

const close = ref(false)

</script>