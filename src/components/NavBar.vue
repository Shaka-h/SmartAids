<template>
    <div class="flex flex-row justify-between pt-0 px-4 items-center" style="background-color: #6B5F88">
      <div class="px-4 py-3" @click="router.push('/')" style="width: 280px;"> 
        <div v-if="panelName" class="capitalize font-bold text-white">
          {{ panelName }}
        </div>
      </div>
      <div class="flex justify-between w-full items-center">
        <div class="flex space-x-4 items-center "> 
          <div>
            <svg-icon
              name="menu"
              class="h-5 w-5"
            ></svg-icon>
          </div>
          <div class="flex items-center justify-center">
            <v-breadcrumbs class="text-white flex items-center font-bold justify-center mb-0" :items="hasBreadcrumb" v-if="hasBreadcrumb">
              <template v-slot:divider>
                <svg-icon
                  name="chevronright"
                  height="h-5"
                  width="w-5"
                  class="icon items-center flex"
                  color="#ffffff"
                ></svg-icon>
              </template>
            </v-breadcrumbs>
          </div>
         </div>
         <div class="px-4 cursor-pointer flex">
          <svg-icon
            name="powerOff"
            class="h-5 w-5"
            color="#FFFFFF"
          ></svg-icon>
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import {walletAddressConnected} from "@/scripts/ContractConstants";
  import SvgIcon from "@/components/shared/SvgIcon.vue";

  const props = defineProps(['navigationLinks', 'panelName', 'hasBreadcrumb'])

  
  const router = useRouter();
  const activeComponent = ref('home');
  const components = ref([
    { name: "Home", id: "home" },
    { name: "Disconnect Wallet", id: "wallet" }
  ]);
  
  const handleComponentClick = (id) => {
    activeComponent.value = id;
    
    if (id === 'home') {
      router.push('/'); 
    }

    else {
      walletAddressConnected.value = null;
      console.log('Wallet disconnected');
      router.push('/'); 
      // Perform any other necessary clean-up or actions

      // Check if MetaMask is installed
      // if (typeof window.ethereum !== 'undefined') {
      // const provider = window.ethereum;

      //   // Function to handle account connection
      //   const connectWallet = () => {
      //       provider.request({ method: 'eth_requestAccounts' })
      //           .then((accounts) => {
      //               walletAddressConnected.value = accounts[0];
      //               console.log('Connected with account:', walletAddressConnected.value);
      //               // Now you can use userAccount to interact with the blockchain
      //           })
      //           .catch((error) => {
      //               console.error('Error connecting to wallet:', error);
      //           });
      //   };

      //   // Function to handle disconnection
      //   const disconnectWallet = () => {
      //       walletAddressConnected.value = null;
      //       console.log('Wallet disconnected');
      //       // Perform any other necessary clean-up or actions
      //   };

      //   // Listen for account changes
      //   provider.on('accountsChanged', (accounts) => {
      //       if (accounts.length === 0) {
      //           disconnectWallet();
      //       } else {
      //           console.log('Account changed to:', accounts[0]);
      //           connectWallet(); // Reconnect if account changes
      //       }
      //   });

      //   // Listen for network changes
      //   provider.on('chainChanged', (chainId) => {
      //       console.log('Network changed to:', chainId);
      //   });

      //   // Check if MetaMask is connected to the network
      //   if (provider.networkVersion !== null || provider.chainId !== null) {
      //       // Request access to the user's accounts
      //       connectWallet();
      //   } else {
      //       console.error('MetaMask is not connected to the Ethereum network.');
      //   }
      // }
      // else {
      //     console.error('MetaMask not detected. Please install MetaMask to connect your wallet.');
      // }

    }
  };

  </script>
  