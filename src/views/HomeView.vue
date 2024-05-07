<template>
  <div class="h-auto xl:w-[70%] max-xl:w-full flex flex-col transition-width duration-300 ease-in-out mx-auto">
    <!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
    <nav class=" h-[1%] min-h-16 flex flex-row justify-between px-4">
        <div class="my-auto">
            <div class="text-4xl font-mono">LOGO</div>
        </div>
        <div class="flex flex-row">
            <div>

            </div>

            <button class="border border-black h-fit p-2 rounded  my-auto hover:text-white font-sans font-medium hover:bg-[#40128B] transition-colors duration-300 ease-in-out">Connect</button>
        </div>
    </nav>
    <div class="h-[99.5vh] bg-gray-100 relative rounded-t-xl overflow-hidden">
        <div class="h-3/4 w-full relative flex flex-row overflow-hidden">
            <div class="w-1/2 flex flex-col font-sans px-4 justify-center">
                <div class="flex flex-col xl:text-5xl md:text-3xl">
                    <span class="font-bold">Connect&nbsp;all&nbsp;around&nbsp;the&nbsp;world</span>
                    <span class="gradient-text font-bold">with Demedia</span>
                </div>
               <div class="text-xl mt-8">
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni vitae suscipit ducimus inventore hic. Illo provident voluptas minus harum neque esse enim rerum eius laborum, illum cupiditate perferendis veritatis dolorem.</span>
               </div>
            </div>

            <div class="ml-auto mr-0 w-1/2 h-full flex bg-cover object-fit-cover bg-size-contain">
                <img class="ml-auto" src="/src/assets/images/landing/pattern.jpeg" alt="">
            </div>

            <div
            class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style="height: 70px;"
            >
            <svg
                class="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
            >
                <polygon
                class="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
                ></polygon>
            </svg>
            </div>
        </div>

        <div class="h-1/4 bg-gray-300">
            
        </div>

         
    </div>
    <div class="h-screen relative">
        <div class="h-1/2 relative bg-gray-300">
            <div class="flex flex-col bg-gray-300 h-[100%] px-8">
                <div class="flex font-sans text-2xl text-gray-600 font-medium items-center justify-center text-center">
                    Demedia is a lorem ipsum, dolor asdaf dsaf asdf <br>sit amet consectetur adipisicing afaf adfgdf  adfasdfgf
                </div>

                <div class="flex flex-row space-x-8 mt-8 w-full h-[80%] relative justify-center py-1 transition-all duration-600 ease-in">
                    <div class="w-1/3 h-[100%] overflow-hidden rounded-[1.1rem] bg-gray-400 hover:bg-gradient-to-r hover:from-[#40128B] hover:via-[#a46fff] hover:to-[#5804ff] p-[2px]">
                        <div class="bg-gray-300 h-[100%] rounded-[0.9rem] flex flex-row">
                            
                        </div>
                    </div>
                    
                    <div class="w-1/3 h-[100%] overflow-hidden rounded-[1.1rem] bg-gray-400 hover:bg-gradient-to-r hover:from-[#40128B] hover:via-[#a46fff] hover:to-[#5804ff] p-[2px]">
                        <div class="bg-gray-300 h-[100%] rounded-[0.9rem] flex flex-row">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="bottom-0 h-1/2 bg-green-400">
            footer
        </div>
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
    height: 50vh;
    width: 50vw;
    background-color: #cccccc;
    }


    .gradient-text {
        /*--text-gradient: linear-gradient(to right, #5c0ddb 20%, #6d43b4 30%, #19083a);*/
        --text-gradient: linear-gradient(to right, #5c0ddb 20%, #6d43b4);
        color: transparent; /* Make the actual text invisible */
        background-clip: text; /* Clip background to the text content */
        -webkit-text-fill-color: var(--text-gradient); /* Webkit browsers */
        background-image: var(--text-gradient); /* Fallback for other browsers */
    }
</style>
    <!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
