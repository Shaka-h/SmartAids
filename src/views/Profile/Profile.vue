<template>
    <div v-if="profileContract != 0x0000000000000000000000000000000000000000" class="row h-full p-4" >
        <div class="col-md-10 pr-10 md:w-full detail" style=""> 
            <div class="h-1/2 rounded-lg" style="background-color: #40128B42">
                <Details />
            </div>
            <div class="mt-8 h-1/2">
                <MyPosts :profile-contract="profileContract"/>
            </div>
        </div>

        <div class="col-md-2 border-l-2 follow">
            <Follows />
        </div>  
    </div>

   <div v-if="profileContract == 0x0000000000000000000000000000000000000000" class="flex justify-center h-1/3 items-center">
    <div class="px-4  cursor-pointer ">
        <ProfileForm @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></ProfileForm>
    </div>
   </div>

   
</template>

<script setup>
import Follows from '../Profile/Follows.vue';
import Details from './Details.vue';
import MyPosts from '../Profile/MyPosts.vue'
import { onMounted, ref, computed } from 'vue';
import {getSignerContract} from '../../scripts/ContractUtils';
import { useRoute } from 'vue-router';
import ProfileForm from '../../views/Profile/ProfileForm.vue'

let {nftProfileFactory_contract} = getSignerContract();
const router = useRoute()
const profile = ref()
const profileContract = ref()
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
    const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(router?.params?.wallet)
    profileContract.value = await getprofileContract?.ProfileContract
    console.log(profileContract.value, "profileContract");

});

</script>

<style scoped>
.detail{
    width: 70%;
}
.follow{
    width: 30%;
}
@media (max-width: 991.98px) {
    .detail{
        width: 100%;
    }
    .follow{
        width: 0%;
    }
}
</style>