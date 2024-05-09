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
                    <div class="w-full p-4"><input type="text" v-model="search" placeholder="Search Username" class="form-control input" /></div>
                </div>
                </div>
                <div> 
                    <div @click="shareProfile(profile)" v-for="(profile, index) of filteredData" :key="index" class="hover:bg-blue border rounded-lg py-2 px-4 w-full cursor-pointer mb-2 flex justify-between"> 
                        <div>{{ profile[2] }}</div>
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
import { ref, onMounted, computed } from 'vue';
import {getSignerContract} from '../../scripts/ContractUtils';

const props = defineProps(["openDialog", "selectedData"]);
const emits = defineEmits(["closeDialog"]);
let {nftProfileFactory_contract} = getSignerContract();
const allDeployedNFTCollections = ref()

const dialog = ref(false);
const search = ref("")
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

const filteredData = computed(() => {
    return allDeployedNFTCollections.value.filter(item => {
        return item[2].toLowerCase().includes(search.value.toLowerCase());
    });
});

const shareProfile = (profile) => {
    console.log(profile);
}

onMounted(async () => {
    const getAllDeployedNFTCollections = await nftProfileFactory_contract.getAllDeployedNFTCollections()
    allDeployedNFTCollections.value = await getAllDeployedNFTCollections
    console.log(allDeployedNFTCollections.value, "allDeployedNFTCollections");

});
</script>