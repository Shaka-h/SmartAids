 <template>
    <ProfileForm @closeDialog="makeAPost=false" :open-dialog="makeAPost" :profile-contract="profileContract" :profile-data="profileDetails"></ProfileForm>
    <ShareProfile @closeDialog="shareProfile=false" :open-dialog="shareProfile"  ></ShareProfile>

    <div class="p-4 space-x-4">
       <div class="flex space-x-4 justify-end"> 
        <div @click="shareMyProfile" class="p-2 rounded-lg bg-primary flex items-center cursor-pointer ">
            SHARE PROFILE
        </div>
        <div @click="editProfile" class="p-2 rounded-lg bg-primary2 flex items-center cursor-pointer ">
            EDIT PROFILE
        </div>
       </div>
        <div v-if="profileDetails" class="flex flex-col mt-8 mx-8"> 
            <div class="flex"> 
                <div class="">
                    <img :src="`http://127.0.0.1:8080/ipfs/${profileDetails[0]?.photo}`" class="rounded-full h-64 w-64"></img>
                </div>
                <div class="grow flex flex-col w-1/3 space-x-4 p-4 justify-center items-center"> 
                    <div>
                        <div class="font-bold">{{profileDetails[0]?.name}}</div>
                        <div class="font-bold">{{profileDetails[0]?.fullName}}</div>
                        <div>{{profileDetails[0]?.organisation}}</div>
                        <div v-for="(skill, index) of profileDetails[0]?.skills" :Key="index" class="flex flex-col space-y-2">{{skill.skill}}</div>
                        <div class="flex mt-4 space-x-4 "> 
                            <div v-for="(contact, index) of profileDetails[0]?.links" :key="index" class="cursor-pointer p-2 rounded-lg bg-primary hover:bg-black">
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
import ProfileForm from '@/views/Beneficieries/Profile/ProfileForm.vue'
import ShareProfile from './ShareProfile.vue';
import { useRoute } from 'vue-router';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import {walletAddressConnected, walletConnected} from "@/scripts/ContractConstants";

const alphaConnectStore = useAlphaConnectStore();
const router = useRoute()
const profileForm = ref(null)
const profileContract = ref()
const makeAPost = ref(false)
const shareProfile = ref(false)
const { getStoreItem } = storeToRefs(alphaConnectStore)

const profileDetails = computed(() => {
  return getStoreItem.value("myProfileDetails")
})
const myProfileContract = computed(() => {
  return getStoreItem.value("myProfileContract")
})

const shareMyProfile = () => {
    shareProfile.value = true;
   
};

const editProfile = () => {
    makeAPost.value = true;
    profileContract.value = myProfileContract.value?.address;
    console.log(profileForm.value, "whhhyyyy");
};

onMounted(async () => {
    await alphaConnectStore.myProfileDetails(alphaConnectStore.getConnectedAddress());
    await alphaConnectStore.loadMyProfileContract(alphaConnectStore.getConnectedAddress()); //hii ndo ina loaf myProfileContract

});

</script>