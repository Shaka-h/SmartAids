<template>
    <div class="flex flex-row  pt-0 px-4 items-center" style="background-color: #6B5F88">
      <div class="flex items-center cursor-pointer w-1/4" @click="router.push('/')"> 
        <img class="w-16 h-16" src="/favicon.ico"/>      
        <span class="text-white hover:border-b cursor-pointer text-2xl ml-2">Smart Aids</span>
      </div>

      <div class="flex space-x-4 w-1/2 justify-space-evenly font-bold"> 
        <div v-for="(component, index) of components" :key="index">
          <div
            v-if="component.id === activeComponent"
            class="text-white hover:border-b cursor-pointer"
            @click="handleComponentClick(component.id)"
          >
            {{ component.name }}
          </div>
          <div
            v-else
            class="text-white hover:border-b cursor-pointer"
            @click="handleComponentClick(component.id)"
          >
            {{ component.name }}
          </div>
        </div>
      </div>
      <div class="w-1/4 flex items-center justify-center">
        <div class="bg-primary p-2 rounded-lg font-bold">My Account</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import {walletAddressConnected} from "@/scripts/ContractConstants";

  
  const router = useRouter();
  const activeComponent = ref('home');
  const components = ref([
    { name: "HOME", id: "home" },
    { name: "DOCUMENTATION", id: "documentation" },
    { name: "CONTACTS", id: "contacts" },
    { name: "COMMUNITY", id: "community" },
    { name: "ABOUT", id: "about" },
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
  