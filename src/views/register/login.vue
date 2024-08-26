<template>
  <nav class="w-full px-10 flex py-4 bg-black">
    <div class="m-auto w-full flex flex-row justify-between overflow-hidden items-center">
        <div class="my-auto ">
            <div class="flex items-center cursor-pointer " @click="router.push('/')"> 
                <img class="w-16 h-16" src="/favicon.ico"/>      
                <span class="text-white hover:border-b cursor-pointer text-2xl ml-2">Smart Aids</span>
            </div>
        </div>
        <div class="flex flex-row space-x-10">
            <div @click="scrollTo('home')" class="cursor-pointer hover:border-b-2">Home</div>
            <!-- <div @click="scrollToSection('services')" class="cursor-pointer hover:border-b-2">Features</div> -->
            <div @click="scrollTo('services')" class="cursor-pointer hover:border-b-2">How it works</div>
            <div @click="scrollTo('why')" class="cursor-pointer hover:border-b-2">Why us</div>
            <div @click="scrollTo('about')" class="cursor-pointer hover:border-b-2">About</div>
            <div @click="scrollTo('contact')" class="cursor-pointer hover:border-b-2">Contacts</div>
        </div>

        <button @click="connect()" class="border border-black h-fit px-4 py-2 text-xl rounded  my-auto text-white font-sans font-medium hover:bg-[#0369A1] bg-[#0369A1] transition-colors duration-150 ease-in-out">Donate</button>
    </div>
</nav>
<div class="flex h-full">
  <div style="width: 40%" class="flex pt-8  flex-col px-4 bg-black">
    <div class="flex justify-between w-1/2"> 
      <span>Back</span>
      <span>REGISTRATION</span>
    </div>
    <div class="pt-8 items-center" >
      Register on **Africa Smart Aids** to access our blockchain-powered platform tailored to your role. 
      Whether you're a **Donor** looking to track your contributions, an **NGO** managing aid distribution, 
      a **Beneficiary** receiving support, or an **Auditor** ensuring transparency, our platform empowers you to make a meaningful impact. 
      Sign up now to join a community committed to transparency and accountability in aid distribution across Africa.
    </div>
    <div class="flex justify-center mt-8"> 
      <SideRegister class="mt-8"></SideRegister>
    </div>
  </div>
  
  <div class="p-4" style="width: 60%">
    <div class="flex flex-row justify-center mt-4">
      <template v-for="(tab, index) of users" :key="index">
        <button class="primary2-action-btn mx-1 intro-x" v-if="tab.id === activeTab">
          {{ tab.name }}
        </button>
        <button class="primary-action-btn mx-1" v-else @click="activeTab = tab.id">
          {{ tab.name }}
        </button>
      </template>
    </div>
    <div>
      <div v-if="activeTab === 'donors'">
        <dynamic-form-main
          :form-fields="formFields"
          submit-label="Comment"
          :showLabels="true"
          @on-submit="CommentPost"
        ></dynamic-form-main>
      </div>
      <div v-if="activeTab === 'beneficieries'">
        <MemberAwards />
      </div>
    </div>

  </div>
</div>

</template>

<script setup>
  
import DynamicFormMain from "@/components/shared/forms/DynamicFormMain.vue";
import { ref } from "vue";
import SideRegister from "./sideRegister.vue";

const activeTab = ref('activities')

const formFields = ref([
    {
        inputType: "file",
        label: "Profile Photo",
        accept: ["image/*"],
        multipleFiles: false,
        name: "photo",
        size: "small",
        required: true,
    },
    {
        inputType: "input",
        type: "input",
        name: "name",
        label: "Name",
        size: "small",
        required: true,
    },
    {
        inputType: "input",
        type: "input",
        name: "fullName",
        label: "Full Name",
        size: "small",
        required: true,
    },
    {
        inputType: "input",
        type: "input",
        name: "institution",
        label: "Institution/ Organisation",
        size: "small",
        required: true,
    },
    {
        inputType: "form-array",
        name: "links",
        children: [
            {
                inputType: "select",
                name: "Contact",
                label: "Contact",
                options: [
                    { name: "Instagram", value: "instagram" },
                    { name: "Linkedin", value: "linkln" }, 
                    { name: "Facebook", value: "facebook" },
                    { name: "Xtwitter", value: "twitter" }, 
                    { name: "Github", value: "github" }, 
                    { name: "Phone", value: "phone" },
                ],
                size: "medium",
                required: true,
            },
            {
                inputType: "input",
                type: "input",
                name: "link",
                label: "Contact link/ number",
                size: "medium",
                required: true,
            }
        ]
    },
    {
        inputType: "rich-text",
        name: "bibliography",
        label: "Bibliography",
        size: "large",
        required: true,
    },
    {
        inputType: "form-array",
        name: "skills",
        children: [
            {
                inputType: "input",
                type: "input",
                name: "skill",
                label: "Skill Type",
                size: "large",
                required: true,
            }
        ]
    },
]);

const users = ref([
  {
    name: "donors",
    id: 'donors'
  },
  {
    name: "beneficieries",
    id: 'beneficieries'
  }
])
</script>


<style scoped>
/* From Uiverse.io by paesjr */ 
.e-card {
    margin: 100px auto;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    width: 60%;
    border-radius: 16px;
  }
  
  .wave {
    position: absolute;
    width: 540px;
    height: 700px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(744deg, #00ff80, #009933 60%, #00cc44);
  }
  
  .icon {
    width: 3em;
    margin-top: -1em;
    padding-bottom: 1em;
  }
  
  .infotop {
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 4em;
    left: 0;
    right: 0;
    color: rgb(255, 255, 255);
    font-weight: 600;
  }
  
  .name {
    font-size: 14px;
    font-weight: 100;
    position: relative;
    top: 1em;
    text-transform: lowercase;
  }
  
  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 210px;
  }
  
  .playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
  }
  
  .wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
  }
  
  .playing .wave:nth-child(2) {
    animation-duration: 4000ms;
  }
  
  .wave:nth-child(2) {
    animation-duration: 50s;
  }
  
  .playing .wave:nth-child(3) {
    animation-duration: 5000ms;
  }
  
  .wave:nth-child(3) {
    animation-duration: 45s;
  }
  
  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  
</style>