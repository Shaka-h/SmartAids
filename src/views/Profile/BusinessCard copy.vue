<template>
    <v-dialog max-width="60%">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Profile"
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
                  <div class="p-4 space-x-4">
                    <div class="flex mt-8 mx-8"> 
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
                        <div> 
                            <div class="font-bold">Bibliography</div>
                            <div> 
                                OpenAI is an artificial intelligence research laboratory consisting of researchers and engineers who work on advancing artificial intelligence in a safe and ethical manner. Founded in December 2015, OpenAI's mission is to ensure that artificial general intelligence (AGI) benefits all of humanity. The organization conducts cutting-edge research in various fields of AI, including natural language processing, computer vision, reinforcement learning, and more. OpenAI also aims to promote transparency and collaboration in AI research and development.
                            </div>
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

const makeAPost = ref(false)
const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);

const dialog = ref(false);

const close = ref(false)

</script>
