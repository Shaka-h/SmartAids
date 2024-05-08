<template>
    <div class="w-full">
        <div class="w-full flex flex-col items-center transition-width duration-300 ease-in-out mx-auto ">
            <!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
            
            <div class="h-[100vh] w-full max-xl:bg-gradient-to-br flex flex-col text-gray-200 relative overflow-hidden">
                <div class="absolute top-0 left-0 h-[100%] w-[100%] flex bg-cover object-fit-cover bg-size-contain ">
                    <img width="100%" src="/src/assets/images/landing/patternpad2.svg" alt="">
                </div>
                <nav class="w-full z-10 h-[1%] min-h-16 flex ">
                    <div class="m-auto w-[70%] flex flex-row justify-between px-4 items-center">
                        <div class="my-auto">
                            <div class="text-4xl font-mono text-white w-24"><img width="100%" src="/src/assets/images/eGAlogo.png" alt=""></div>
                        </div>
                        <div class="flex flex-row">
                            <div>

                            </div>

                            <button @click="connect()" class="border border-black h-fit px-4 py-2 text-xl rounded  my-auto text-white font-sans font-medium hover:bg-[#7e2eff8c] bg-[#7e2eff] transition-colors duration-150 ease-in-out">Connect</button>
                        </div>
                    </div>
                </nav>
                <div class="h-3/4 w-[70%] mx-auto relative flex flex-row overflow-hidden ">
                    <div class="w-[50%] flex flex-col font-sans px-4 justify-center ">
                        <div class="flex flex-col xl:text-5xl md:text-3xl">
                            <span class="font-bold bg-gradient-to-br from-[#40128bb9] via-[#401290b9] to-[#41129f9f] rounded">Connect&nbsp;all&nbsp;around&nbsp;the&nbsp;world</span>
                            <div class="bg-gray-60 bg-opacity-25 rounded-b"> <span class="gradient-text font-bold">with AlphaConnect.</span></div>
                           
                        </div>
                        <div class="text-lg mt-4 text-gray-200 font-semibold">
                            <span>Share and Connect</span>
                        </div>
                    </div>

                    <!-- <div class="ml-auto mr-0 w-1/2 h-full flex bg-cover object-fit-cover bg-size-contain">
                        <img class="ml-auto" src="/src/assets/images/landing/pattern.jpeg" alt="">
                    </div> -->
                </div>
               
            </div>
            <div class="h-screen w-full relative">
                <div class="h-[60%] relative ">
                    <div class="flex flex-col bg-gray-100 h-[100%] px-8 justify-center items-center space-y-6 max-md:space-y-3">
                        <div class="flex flex-col space-y-6 max-md:space-y-3">
                            <div class="text-4xl font-bold mx-auto text-[#40128b]">
                                Why AlphaConnect?
                            </div>
                            <div class="text-lg font-semibold text-gray-400 text-center">
                                Alphaconnect provides a decentralized platform <br>for sharing media content and connecting with people of all walks of life,<br> wherever in the world. 
                            </div>
                        </div>
                        <div class="flex flex-row space-x-4 font-sans">
                            <div class="flex flex-col items-center justify-center w-64">
                                <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                    
                                </div>
                                <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                    Share
                                </div>
                                <div class="text-md font-semibold text-gray-400 text-center">
                                        Post and share pictures with friends <br> <br>
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center w-64">
                                <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                    
                                </div>
                                <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                    Connect
                                </div>
                                <div class="text-md font-semibold text-gray-400 text-center">
                                    Make new friends and connections while maintaining control of your own data
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center w-64 ">
                                <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                    
                                </div>
                                <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                    Influence
                                </div>
                                <div class="text-md font-semibold text-gray-400 text-center">
                                       hold an account with less of the Web2 social media platform's security vulnerabilities
                                </div>
                            </div>
                        </div>

                        <!-- <div class="flex font-sans text-2xl text-gray-600 font-medium items-center justify-center text-center">
                            Demedia is a lorem ipsum, dolor asdaf dsaf asdf <br>sit amet consectetur adipisicing afaf adfgdf  adfasdfgf
                        </div> -->

                        <!-- <div class="flex flex-row space-x-8 mt-8 w-full h-[80%] relative justify-center py-1 transition-all duration-600 ease-in">
                            <div class="w-1/3 h-[100%] z-20 hover:shadow-lg overflow-hidden rounded-[1.1rem] bg-gray-400 hover:bg-gradient-to-r hover:from-[#40128B] hover:via-[#a46fff] hover:to-[#5804ff] p-[2px]">
                                <div class="bg-gray-300 h-[100%] rounded-[0.9rem] flex flex-row">
                                    
                                </div>
                            </div>
                            
                            <div class="w-1/3 h-[100%] z-20 hover:shadow overflow-hidden rounded-[1.1rem] bg-gray-400 hover:bg-gradient-to-r hover:from-[#40128B] hover:via-[#a46fff] hover:to-[#5804ff] p-[2px]">
                                <div class="bg-gray-300 h-[100%] rounded-[0.9rem] flex flex-row">
                                    
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="bottom-0 h-[40%] relative">
                    <div class="absolute top-0 left-0 h-[100%] w-[100%] flex bg-cover object-fit-cover bg-size-contain ">
                        <img width="100%" src="/src/assets/images/landing/patternpad2.svg" alt="">
                    </div>
                    <!-- <footerView class="z-20" /> -->
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'; // Import ref from Vue
import {walletAddressConnected} from "@/scripts/ContractConstants";
import footerView from "@/components/footer.vue"
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
                  router.push(`/${walletAddressConnected.value}/posts`); // Access the value of wallet using .value

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
