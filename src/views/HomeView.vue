<template>
    <div class="w-full container1">
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
                                        <div @click="scrollTo('home')" class="cursor-pointer hover:border-b-2">Home</div>
                                        <!-- <div @click="scrollToSection('services')" class="cursor-pointer hover:border-b-2">Features</div> -->
                                        <div @click="scrollTo('services')" class="cursor-pointer hover:border-b-2">How it works</div>
                                        <div @click="scrollTo('why')" class="cursor-pointer hover:border-b-2">Why us</div>
                                        <div @click="scrollTo('about')" class="cursor-pointer hover:border-b-2">About</div>
                                        <div @click="scrollTo('contact')" class="cursor-pointer hover:border-b-2">Contacts</div>
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
                          <div class="moon">
                            <!-- <img class="w-full h-full object-cover shrink-0 grow-0" src="@/assets/images/SOCIAL-MEDIA.jpg" alt="haha"> -->
                            <div class="absolute w-full h-full flex flex-row bg-green-500">
                                <v-carousel
                                    height="100%"
                                    :show-arrows="false"
                                    interval="5000"
                                    cycle
                                    hide-delimiter-background
                                >
                                    <v-carousel-item
                                    v-for="(image, i) in images"
                                    :key="i"
                                    >
                                    <v-sheet
                                        height="100%"
                                    >
                                        <div class="d-flex  fill-height justify-center align-center">
                                            <img class="h-full w-full object-cover shrink-0 grow-0" :src="image.src" alt="the image">
                                        </div>
                                    </v-sheet>
                                    </v-carousel-item>
                                </v-carousel>
                                <!--
                                    <img class="h-full w-full object-cover shrink-0 grow-0" v-for="image in images" :key="image.src" :src="image.src" :alt="image.alt"/>
                                -->
                            </div>
                          </div>
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
                            <h2 class="fancy" style="--w: 20vw;--c: #40128b;--b:4px;--g: 40px"> <div class="text-3xl">How AlphaConnect Works</div> </h2>
                        </div>
                        <div class="flex font-sans text-2xl text-gray-600 font-medium items-center mt-32 justify-center text-center">
                            Step-by-step guide on how users can join and start using AlphaConnect.
                        </div> 

                        <div class="flex flex-row space-x-8 mt-8 w-4/5 h-[80%] relative justify-center py-1 transition-all duration-600 ease-in">   
                            <!-- hover:bg-gradient-to-r hover:from-[#40128B] hover:via-[#a46fff] hover:to-[#5804ff] -->
                            <div class="w-1/2 h-[100%] z-20 overflow-hidden rounded-[0.5rem] flex items-center justify-center border-[1px] shadow-lg  p-[2px]">
                                <div class="w-full  items-center justify-center h-[100%] rounded-[0.9rem] flex flex-row">
                                    <div class="flex flex-col space-y-4 items-center justify-center ">
                                        <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                            <div class="w-20 h-20 flex justify-center items-center rounded-full bg-[#40128b6c]">
                                                <div><svg-icon name="connect" class="icon cursor-pointer" color="#000000"></svg-icon></div>
                                            </div>
                                        </div>
                                        <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                            Connect
                                        </div>
                                        <div class="text-md font-semibold text-gray-800 text-center">
                                            Start by connecting your wallet into the Alphachain network<br>
                                            <span @click="scrollToSection('contact')" class="text-blue-600 hover:border-b-2 cursor-pointer">Setup Network</span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2 h-[100%] z-20 overflow-hidden rounded-[0.5rem] flex items-center justify-center border-[1px] shadow-lg  p-[2px]">
                                <div class="w-full  items-center justify-center h-[100%] rounded-[0.9rem] flex flex-row">
                                    <div class="flex flex-col space-y-4 items-center justify-center ">
                                        <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                            <div class="w-20 h-20 flex justify-center items-center rounded-full bg-[#40128b6c]">
                                                <div><svg-icon name="createProfile" class="icon cursor-pointer" color="#000000"></svg-icon></div>
                                            </div>
                                        </div>
                                        <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                            Create Profile
                                        </div>
                                        <div class="text-md font-semibold text-gray-800  text-center">
                                               Customize your profile so as people over the network may know alittle about you
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2 h-[100%] z-20 overflow-hidden rounded-[0.5rem] flex items-center justify-center border-[1px] shadow-lg  p-[2px]">
                                <div class="w-full  items-center justify-center h-[100%] rounded-[0.9rem] flex flex-row">
                                    <div class="flex flex-col space-y-4 items-center justify-center ">
                                        <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                            <div class="w-20 h-20 flex justify-center items-center rounded-full bg-[#40128b6c]">
                                                <div><svg-icon name="share" class="icon cursor-pointer" color="#000000"></svg-icon></div>
                                            </div>
                                        </div>
                                        <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                            Share
                                        </div>
                                        <div class="text-md font-semibold text-gray-800  text-center">
                                            Share your profile represented as an NFT with other users.                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2 h-[100%] z-20 overflow-hidden rounded-[0.5rem] flex items-center justify-center border-[1px] shadow-lg  p-[2px]">
                                <div class="w-full  items-center justify-center h-[100%] rounded-[0.9rem] flex flex-row">
                                    <div class="flex flex-col space-y-4 items-center justify-center ">
                                        <div class="w-20 h-20 flex justify-center items-center rounded-full bg-gray-200">
                                            <div class="w-20 h-20 flex justify-center items-center rounded-full bg-[#40128b6c]">
                                                <div><svg-icon name="upload" class="icon cursor-pointer" color="#000000"></svg-icon></div>
                                            </div>
                                        </div>
                                        <div class="text-2xl font-[600] mx-auto text-[#40128b]">
                                            Influence
                                        </div>
                                        <div class="text-md font-semibold text-gray-800  text-center">
                                            Create posts and make comments in the network to engage freely and securly with AlphaConnect
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    <span class="cursor-pointer hover:border-b-2">
                                        Add Wallet
                                    </span>
                                    <span class="cursor-pointer hover:border-b-2">
                                        Join Network
                                    </span>
                                    <a href="https://faucet.all.co.tz/" class="cursor-pointer hover:border-b-2">Get AlphaCoin</a>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer id="contact" class="bottom-0 font-poppin bg-sky-950 text-white " style="background-color: #0D1042">
                    <div class="p-20">
                      <span class="text-3xl flex">
                        <hr class="w-10 bg-black mr-3">
                        AlphaChain
                        <hr class="w-10 bg-black ml-3">
                      </span>
                      <div class="pt-10 grid grid-cols-3 gap-10">
                        <div class="">
                          <span class="text-xl">Follow us on:</span> 
                          <div class="flex pt-4">
                            <button class="w-10 h-10 ml-6">
                                <svg-icon name="instagram"  height="h-10" width="w-10" class="icon" color="#ffffff"></svg-icon>
                            </button>
                            <button class="w-10 h-10 ml-6">
                                <svg-icon name="facebook"  height="h-10" width="w-10" class="icon" color="#ffffff"></svg-icon>
                            </button>
                            <button class="w-10 h-10 ml-6">
                                <svg-icon name="twitter"  height="h-10" width="w-10" class="icon" color="#ffffff"></svg-icon>
                            </button>
                            <button class="w-10 h-10 ml-6">
                                <svg-icon name="linkln"  height="h-10" width="w-10" class="icon" color="#ffffff"></svg-icon>
                            </button>
                          </div>
                        </div>
                        <div class="grid gap-y-2 text-xl">
                          <span>Faucet</span>
                          <span>dApps</span>
                          <span>Wallet</span>
                          <span>Explorer</span>
                        </div>
                        <div class="">
                          <span class="text-4xl font-semibold">
                            Join Our Community
                          </span>
                          <br>
                          <div class="grid gap-y-4">
                            <button class="bg-sky-700 w-1/2 text-xl rounded-lg p-2">Join Discord</button>
                            <button class="bg-sky-700 w-2/3 text-xl rounded-lg p-2">Add AlphaChain Network</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mx-auto pb-4 text-center">
                      <p class="bottom-0">AlphaConnect.<br>
                        Developed and maintained by eGA-RIDC, Copyright © 2024 eGA-RIDC
                      </p>
                    </div>
                  </footer>
            </div>
        </div>
    </div>

</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue'; // Import ref from Vue
import {walletAddressConnected, walletConnected} from "@/scripts/ContractConstants";
import footerView from "@/components/footer.vue"
import { notifyError } from "@/services/notificationService";

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


function scrollTo(id) {
    const element = document.getElementById(id);

    if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Define connect function to navigate to the specified route
const connect = () => {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        const provider = window.ethereum;

    // Function to switch to the desired network
        // const switchToNetwork = async () => {
        //     try {
        //         await provider.request({
        //             method: 'wallet_switchEthereumChain',
        //             params: [{ chainId: '0xAA36A7' }] // 11155111 in hexadecimal
        //         });
        //         console.log('Successfully switched to chain 11155111');
        //     } catch (switchError) {
        //         if (switchError.code === 4902) {
        //             // This error code indicates that the chain has not been added to MetaMask
        //             try {
        //                 await provider.request({
        //                     method: 'wallet_addEthereumChain',
        //                     params: [{
        //                         chainId: '0xAA36A7',
        //                         chainName: 'Sepolia test network',
        //                         rpcUrls: ['https://sepolia.infura.io/v3/'],
        //                         nativeCurrency: {
        //                             name: 'SepoliaETH',
        //                             symbol: 'SepoliaETH',
        //                             decimals: 18
        //                         },
        //                         blockExplorerUrls: ['https://sepolia.etherscan.io']
        //                     }]
        //                 });
        //             } catch (addError) {
        //                 console.error('Failed to add network:', addError);
        //             }
        //         } else {
        //             console.error('Failed to switch network:', switchError);
        //         }
        //     }
        // };

        provider.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                walletAddressConnected.value = accounts[0];
                console.log('Connected with account:', walletAddressConnected.value);
                router.push("/posts"); // Access the value of wallet using .value

                // Attempt to switch to the desired network
                // switchToNetwork().then(() => {
                //     router.push(`/${walletAddressConnected.value}/posts`); // Access the value of wallet using .value
                // }).catch((error) => {
                //     console.error('Error switching network:', error);
                // });
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
            // MetaMask is connected
        } else {
            console.error('MetaMask is not connected to the Ethereum network.');
            notifyError('MetaMask is not connected to the Ethereum network')
        }
    } else {
        // console.error('MetaMask not detected. Please install MetaMask to connect your wallet.');
        notifyError('MetaMask not detected. Please install MetaMask to connect your wallet.');
    }


};

const images = [
    {
        src:"/src/assets/images/SOCIAL-MEDIA.jpg",
        alt:"image 1"
    },
    {
        src:"/src/assets/images/SOCIAL-MEDIA.jpg",
        alt:"image 1"
    },
    {
        src:"/src/assets/images/SOCIAL-MEDIA.jpg",
        alt:"image 1"
    },
]

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
    
  h2{ 
    font-size: 2rem;
  }

  .container1{
    scroll-behavior: smooth;
    transition: all 800ms ease-in-out;
  }
</style>
<!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
