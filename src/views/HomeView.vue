<template>
    <div class="bg-gray-300">
        <div class="flex flex-col items-center">
            <!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
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
            <div class="text p-4">Africa Smart Aids For Transparency and Accountability</div>
            
            <div class="w-full px-4"> 
                <div class="grid grid-rows-8 grid-flow-col gap-4" style="height: 75vh">
                    <div class="row-start-2 row-span-4 col-span-1 ...">
                        <img src="/public/aids/aid4.jpg" alt="Profile picture" style="height: 100%; width:100%" class="rounded-lg">
                    </div>
                    <div class="row-span-3 col-span-1 mt-8" >
                        <img src="/public/aids/aid3.jpeg" alt="Profile picture" style="height: 100%; width:100%" class="rounded-lg">
                    </div>
                    <div class="row-span-3 col-span-3 pt-8">
                        <div class="flex justify-center items-center flex-col">
                            <div class="pt-4 w-full flex justify-center p-4 text2">
                                By leveraging blockchain technology, we provide a secure and transparent 
                                platform that tracks aid funds from donors to recipients.
                                Our mission is to make sure that every dollar is accounted for,
                                preventing corruption and inefficiencies, and ensuring that aid reaches those who need it most.
                                Through innovative technology, we aim to build trust and enhance 
                                the impact of aid initiatives across the continent.
                            </div>
                            <div class="flex space-x-4 mt-8">
                                <button @click="connect()" class="border h-fit px-4 py-2 text-xl rounded  my-auto text-[#5F6C37] font-sans font-medium border-[#5F6C37] border-2 transition-colors duration-150 ease-in-out">Register</button>
                                <button @click="connect()" class="border h-fit px-4 py-2 text-xl rounded  my-auto text-white font-sans font-medium bg-[#5F6C37] transition-colors duration-150 ease-in-out">Connect</button>    
                            </div>
                        </div>
                    </div>
                    <div class="row-span-5 ">
                        <img src="/public/aids/aid6.jpg" alt="Profile picture" style="height: 100%; width:100%" class="rounded-lg">
                    </div>
                    <div class="row-start-5 row-span-4 ">
                        <img src="/public/aids/aid1.jpg" alt="Profile picture" style="height: 100%; width:100%" class="rounded-lg">
                    </div>
                    <div class="row-span-5 ...">
                        <img src="/public/aids/aid7.jpg" alt="Profile picture" style="height: 100%; width:100%" class="rounded-lg">
                    </div>
                    <div class="row-span-4 col-span-1 ...">
                        <img src="/public/aids/aid9.jpg" alt="Profile picture" class="rounded-lg">
                    </div>
                    <div class="row-start-6 row-span-3 col-span-1 mt-12 ">
                        <img src="/public/aids/aid5.jpeg" alt="Profile picture" class="rounded-lg">
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
                router.push("/register"); // Access the value of wallet using .value

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

.text {
    font-size: 2rem;
    color: #5F6C37;
    font-weight: bold;
}
.text2 {
    font-size: 1rem;
    font-weight: bold;
}
</style>
<!-- bg-gradient-to-br from-[#40128B] via-[#401290] to-[#40129F] -->
