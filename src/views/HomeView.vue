<template>
    <div class="w-full">
        <div class="w-full flex flex-col items-center transition-width duration-300 ease-in-out mx-auto ">
            <!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
            
            <div class="h-[100vh] w-full max-xl:bg-gradient-to-br flex flex-col text-gray-200 relative overflow-hidden">
                <div class="absolute top-0 left-0 h-[100%] w-[100%] flex bg-cover object-fit-cover bg-size-contain ">
                    <img width="100%" src="/src/assets/images/landing/patternpad2.svg" alt="">
                </div>
                
                <div id="home" class="h-full w-full mx-auto relative flex flex-row overflow-hidden ">
                    
                    <div class="view">
                        <div class="left">
                            <nav class="w-full px-10 z-10 h-[1%] min-h-16 flex py-4">
                                <div class="m-auto w-[100%] flex flex-row justify-between px-10 overflow-hidden items-center">
                                    <div class="my-auto">
                                        <div class="text-4xl font-mono text-white w-24"><img width="100%" src="/src/assets/images/eGAlogo.png" alt=""></div>
                                    </div>
                                    <div class="flex flex-row space-x-10">
                                        <div @click="scrollToSection('home')" class="cursor-pointer hover:border-b-2">Home</div>
                                        <!-- <div @click="scrollToSection('services')" class="cursor-pointer hover:border-b-2">Features</div> -->
                                        <div @click="scrollToSection('how')" class="cursor-pointer hover:border-b-2">How it works</div>
                                        <div @click="scrollToSection('why')" class="cursor-pointer hover:border-b-2">Why us</div>
                                        <div @click="scrollToSection('about')" class="cursor-pointer hover:border-b-2">About</div>
                                        <div @click="scrollToSection('contact')" class="cursor-pointer hover:border-b-2">Contacts</div>
                                    </div>
            
                                    <button @click="connect()" class="border border-black h-fit px-4 py-2 text-xl rounded  my-auto text-white font-sans font-medium hover:bg-[#0369A1] bg-[#0369A1] transition-colors duration-150 ease-in-out">Connect</button>
                                </div>
                            </nav>
                          <div class="flex h-2/3  justify-center items-center flex-col xl:text-5xl md:text-3xl">
                            <span class="font-bold bg-gradient-to-br from-[#40128bb9] via-[#401290b9] to-[#41129f9f] rounded">Welcome&nbsp;to&nbsp;AlphaConnect&nbsp;<br>where&nbsp;privacy</span>
                            <div class="bg-gray-60 bg-opacity-25 rounded-b"> <span class="gradient-text font-bold pt-4">meets connectivity.</span></div>
                           
                        </div>
                        </div>
                        <div class="right">
                          <div class="moon"></div>
                        </div>
                      </div>
                    <!-- <div class="w-[50%] flex flex-col font-sans px-4 justify-center ">
                        <div class="flex flex-col xl:text-5xl md:text-3xl">
                            <span class="font-bold bg-gradient-to-br from-[#40128bb9] via-[#401290b9] to-[#41129f9f] rounded">Welcome&nbsp;to&nbsp;AlphaConnect&nbsp;where&nbsp;privacy</span>
                            <div class="bg-gray-60 bg-opacity-25 rounded-b"> <span class="gradient-text font-bold">meets connectivity.</span></div>
                           
                        </div>
                        
                    </div>
                    <div class="w-[50%] flex flex-col font-sans px-4 justify-center ">
                        <img width="100%" height="100%" src="/src/assets/images/SOCIAL-MEDIA.jpg" alt="">
                    </div> -->

                    <!-- <div class="ml-auto mr-0 w-1/2 h-full flex bg-cover object-fit-cover bg-size-contain">
                        <img class="ml-auto" src="/src/assets/images/landing/pattern.jpeg" alt="">
                    </div> -->
                </div>
               
            </div>
            <div class="h-screen w-full relative">
                <div id="services" class="h-[70%] relative ">
                    <div class="flex flex-col py-32 bg-gray-100 h-[100%] px-8 justify-center items-center space-y-6 max-md:space-y-3">
                        <div class="flex flex-col space-y-6 max-md:space-y-3">
                            <!-- <div class="text-4xl font-bold mx-auto text-[#40128b]">
                                How AlphaConnect Works
                            </div> -->
                            <h2 class="fancy" style="--w: 20vw;--c: #40128b;--b:4px;--g: 40px">How AlphaConnect Works</h2>
                        </div>
                        <div class="flex flex-row space-x-4 font-sans mt-12">
                            <div class="flex flex-col items-center justify-center w-64">
                                <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200 transform -rotate-45">
                                    <span  class="material-symbols-outlined text-[30px] text-[#40128b] flex ">
                                        send
                                    </span>
                                </div>
                                <div class="text-2xl font-[600] mx-auto text-[#40128b] mt-4">
                                    Share
                                </div>
                                <div class="text-md font-semibold text-gray-400 text-center">
                                        Post and share pictures with friends <br> <br>
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center w-64">
                                <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                    <span class="material-symbols-outlined text-[30px] text-[#40128b]">
                                        partner_exchange
                                    </span>
                                </div>
                                <div class="text-2xl font-[600] mx-auto text-[#40128b] mt-4">
                                    Connect
                                </div>
                                <div class="text-md font-semibold text-gray-400 text-center">
                                    Make new friends and connections while maintaining control of your personal data
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center w-64 ">
                                <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                    <span class="material-symbols-outlined text-[40px] text-[#40128b]">
                                        private_connectivity
                                    </span>
                                </div>
                                <div class="text-2xl font-[600] mx-auto text-[#40128b] mt-4">
                                    Influence
                                </div>
                                <div class="text-md font-semibold text-gray-400 text-center">
                                       hold an account with less of the Web2 social media platform's security vulnerabilities
                                </div>
                            </div>
                        </div>

                <div id="why" class="h-[60%] relative ">
                    <div class="flex flex-col bg-gray-300 h-[100%] px-8 justify-center items-center space-y-6 max-md:space-y-3">
                        <div class="flex flex-col space-y-6 max-md:space-y-3">
                            <!-- <div class="text-4xl font-bold mx-auto text-[#40128b]">
                                Why AlphaConnect?
                            </div> -->
                            <h2 class="fancy" style="--w: 20vw;--c: #A37B93;--b:4px;--g: 40px">Why AlphaConnect</h2>
                            <div class="text-lg font-semibold text-gray-600 text-center">
                                Alphaconnect provides a decentralized platform <br>for sharing media content and connecting with people of all walks of life,<br> wherever in the world. 
                            </div>
                        </div>
                        <div class="flex flex-row space-x-4 font-sans">
                            
                            

                        </div>
                    </div>
                </div>

                <div id="about" class="h-[60%] relative ">
                    <div class="flex flex-col bg-gray-100 h-[100%] px-8 justify-center items-center space-y-6 max-md:space-y-3">
                        <div class="flex flex-col space-y-6 max-md:space-y-3">
                            <h2 class="fancy" style="--w: 20vw;--c: #40128b;--b:4px;--g: 40px">Alphachain</h2>
                            <div class="row mt-10 items-center w-full ">
                                <a href="https://alphachain.all.co.tz/" class="col-md-6 cursor-pointer hover:bg-gray-200  text-lg bg-gray-300 flex items-center justify-center p-10 rounded-lg font-semibold text-gray-600 text-center"> 
                                    <img width="50%" height="50%" src="/src/assets/images/alphachain.png" alt="">
                                </a>
                               <div class="col-md-6 text-lg font-semibold text-gray-600 text-center"> 
                                The Alphachain Network is an ethereum based blockchain network 
                                 to facilitate the widespread adoption of blockchain technology 
                                <br> in Tanzania<br>
                                <div class="flex text-blue-400 justify-space-evenly mt-4"> 
                                    <span class="cursor-pointer hover:border-b-2"><span class="text-gray-800 mr-2">Frist </span>Join Network</span>
                                    <a href="https://faucet.all.co.tz/" class="cursor-pointer hover:border-b-2"><span class="text-gray-800 mr-2">Then </span>Get AlphaCoin</a>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-0 h-[40%] relative">
                    <div class="absolute top-0 left-0 h-[100%] w-[100%] flex bg-cover object-fit-cover bg-size-contain ">
                        <img width="100%" class="h-[100%] absolute" src="/src/assets/images/landing/patternpad2.svg" alt="">
                        <footerView class="z-20 w-[100%] "/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue'; // Import ref from Vue
import {walletAddressConnected} from "@/scripts/ContractConstants";
import footerView from "@/components/footer.vue"
const router = useRouter();

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const sectionTop = section.offsetTop;
    console.log(sectionTop);
    window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
    });
};


function handleScroll() {
    // Check if the user has scrolled down or if the scroll button should be shown
    this.scrolledDown = window.scrollY > 100;
    this.showScrollButton = this.scrolledDown || window.scrollY < 100;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


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
        --text-gradient: linear-gradient(to right, #5c0ddb 20%,#957692, #6d43b4);
        color: transparent; /* Make the actual text invisible */
        background-clip: text; /* Clip background to the text content */
        -webkit-text-fill-color: var(--text-gradient); /* Webkit browsers */
        background-image: var(--text-gradient); /* Fallback for other browsers */
    }

    .fancy {
        --b: 6px;   /* control the border thickness */
        --w: 80px;  /* control the width of the line*/
        --g: 15px;  /* control the gap */
        --c: #0B486B;
       
        width: fit-content;
        padding: 0 2em;
        line-height: 1.6em;
        border: 1px solid;
        color: #fff;
        background: 
          conic-gradient(from   45deg at left ,var(--c) 25%,#0000 0) 0,
          conic-gradient(from -135deg at right,var(--c) 25%,#0000 0) 100%;
        background-size: 51% 100%;
        background-origin: border-box;
        background-repeat: no-repeat;
        border-image: 
           linear-gradient(
             #0000      calc(50% - var(--b)/2),
             var(--c) 0 calc(50% + var(--b)/2),
             #0000    0) 
          1/0 var(--w)/calc(var(--w) + var(--g));
        margin-inline: auto;
      }


.view {
    bottom:0;
    left:0;
    position:absolute;
    right:0;
    top:0;
    transform:skew(-5deg);
  }
  
  .left,
  .right {
    bottom:0;
    overflow:hidden;
    position:absolute;
    top:0;
  }
  
  .left { 
    left:-5%;  
    right:40%;  
  }
  
  .divider {
    background-color:#A37B93;
    border-left:solid 2px #000;
    border-right:solid 2px #000;
    bottom:-5%;
    left:50%;
    position:absolute;
    right:40%;
    top:-5%;
    z-index:1;
  }
  
  .right {
    left:60%;
    right:-5%;
  }
  
  .sun,
  .moon {
    bottom:-5%;
    left:-5%;
    position:absolute;
    right:-5%;
    top:-5%;
    transform:skew(5deg);
  }
    
  .moon {
    background-image: url(/src/assets/images/SOCIAL-MEDIA.jpg);
    background-position:center center;
    background-size:cover;
  }

  h2{ 
    font-size: 2rem;
  }

</style>
    <!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
