 <template>
    <div class="p-4 space-x-4">
       <div class="flex space-x-4 justify-end"> 
        <div class="px-4  cursor-pointer bg-">
            <ShareProfile @closeDialog="makeAPost=false" :open-dialog="makeAPost"  ></ShareProfile>
        </div>
        <div class="px-4  cursor-pointer ">
            <ProfileForm @closeDialog="makeAPost=false" :open-dialog="makeAPost" :selected-profile="profileForm"></ProfileForm>
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
import { useRoute } from 'vue-router';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useAlphaConnectStore } from "@/store/index.js";
import {storeToRefs} from "pinia";
import {walletAddressConnected, walletConnected} from "@/scripts/ContractConstants";

const alphaConnectStore = useAlphaConnectStore();
const router = useRoute()
const profileForm = ref(null)
const makeAPost = ref(false)
const { getStoreItem } = storeToRefs(alphaConnectStore)

const profileDetails = computed(() => {
  return getStoreItem.value("myProfileDetails")
})

onMounted(async () => {
    await alphaConnectStore.myProfileDetails(alphaConnectStore.getConnectedAddress());
});

</script>