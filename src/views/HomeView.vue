<template>
  <div class="image">
    <div @click="connect" class="bg-red p-2 cursor-pointer">
      Connect
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'; // Import ref from Vue
import {walletAddressConnected} from "@/scripts/ContractConstants";

const router = useRouter();

// Define connect function to navigate to the specified route
const connect = () => {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
          const provider = window.ethereum;
          provider.request({ method: 'eth_requestAccounts' })
              .then((accounts) => {
                  walletAddressConnected.value = accounts[0];
                  console.log('Connected with account:', walletAddressConnected.value);
                  // Now you can use userAccount to interact with the blockchain
                  router.push(`/${walletAddressConnected.value}`); // Access the value of wallet using .value

              })
              .catch((error) => {
                  console.error('Error connecting to wallet:', error);
              });

              // Listen for account changes
              provider.on('accountsChanged', (accounts) => {
                  console.log('Account changed to:', accounts[0]);
              });

              // Listen for network changes
              provider.on('chainChanged', (chainId) => {
                  console.log('Network changed to:', chainId);
              });
          // Check if MetaMask is connected to the network
          if (provider.networkVersion !== null || provider.chainId !== null) {
              // Request access to the user's accounts
             
          } else {
              console.error('MetaMask is not connected to the Ethereum network.');
          }
      } else {
          console.error('MetaMask not detected. Please install MetaMask to connect your wallet.');
      }

};

</script>

<style scoped>
.image {
  background-image: url('../assets/images/landing/landing1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  background-color: #cccccc;
}
</style>
