<template>
    <div class="p-4 space-x-4">
       <div class="flex space-x-4 justify-end"> 
        <div class="px-4  cursor-pointer bg-">
            <ShareProfile @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></ShareProfile>
        </div>
        <div class="px-4  cursor-pointer ">
            <ProfileForm @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></ProfileForm>
        </div>
       </div>

        <div v-if="profileDetails" class="flex flex-col mt-8 mx-8"> 
            <div class="flex"> 
                <div class="">
                    <img :src="`http://127.0.0.1:8080/ipfs/${profileDetails[0]?.photoCID}`" class="rounded-full h-64 w-64"></img>
                </div>
                <div class="grow flex flex-col w-1/3 space-x-4 p-4 justify-center items-center"> 
                    <div> 
                        <div class="font-bold">{{profileDetails[0]?.name}}</div>
                        <div class="font-bold">{{profileDetails[0]?.fullName}}</div>
                        <div>{{profileDetails[0]?.organisation}}</div>
                        <div v-for="(skill, index) of profileDetails[0]?.skills" :Key="index" class="flex flex-col space-y-2">{{skill.skill}}</div>
                        <div class="flex mt-4 space-x-4 "> 
                            <div v-for="(contact, index) of profileDetails[0]?.contacts" :key="index" class="cursor-pointer p-2 rounded-lg bg-primary hover:bg-black">
                                <svg-icon :name="contact.Contact"  height="h-5" width="w-5" class="icon" color="#ffffff"></svg-icon>
                            </div>
                        </div> 
                    </div>
                                       
                </div>
            </div>
            
            <div class="mt-8"> 
                <div class="font-bold">Bibliography</div>
                <div class="mt-2" v-html="profileDetails[0]?.bibliography"> 
                    
                </div>
            </div>
        </div>
    </div>

</template>

<script setup> 
import { onMounted, ref, computed } from 'vue';
import ProfileForm from '../../views/Profile/ProfileForm.vue'
import ShareProfile from './ShareProfile.vue';
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import SvgIcon from "@/components/shared/SvgIcon.vue";

let {nftProfileFactory_contract} = getSignerContract();
const router = useRoute()
const profile = ref()
const profileDetails = ref()
const makeAPost = ref(false)

const fetchData = async () => {
    const responseData = []; // Array to store response data

    try {
        const response = await fetch(`http://127.0.0.1:8080/ipfs/${profile.value[3]}`);
        const data = await response.json();
        responseData.push(data); // Push data to responseData array
        console.log('Data for', router?.params?.wallet, ':', data);
        // Handle data as needed
    } catch (error) {
        console.error('Error fetching data from', router?.params?.wallet, ':', error);
        // Handle error
    }
    return responseData; // Return the array of response data
};


onMounted(async () => {
    profile.value = await nftProfileFactory_contract.profileByAddressOwner(router?.params?.wallet);
    console.log(profile.value, "market");

    await fetchData().then((responseData) => {
        console.log('All response data:', responseData);
        profileDetails.value = responseData
    });
});

</script>