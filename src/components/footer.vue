<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="grid grid-cols-12">
    <div class="col-span-1 bg-alphachain"></div>
    
    <div class="main-main-container flex flex-col col-span-10">
    <div class="flex-shrink-0 opacity-87 bg-alphachain flex justify-between px-10 py-10 items-start">
      <!-- This holds the first part of the footer -->
      <div class="flex flex-col items-start c-first-container">
        <!-- div to hold the alphachain and them icons -->
        <p class="text-white  font-ubuntu text-4xl font-bold w-85 h-[71.304px] flex-shrink-0">Alphachain</p>
        <p class="c-follow-us">Follow us</p>
        <!-- div for them icons -->
        <div class="pt-4">
          <ul class="c-links flex ">
            <li class="pr-2">
                <i class="fa facebook-f text-white c-exact-icon p-3 bg-opacity-50 " aria-hidden="true"></i>
              <a href=""><font-awesome-icon :icon="['fab', 'facebook-f']" class="text-white c-exact-icon p-3 bg-opacity-50 bg-alphachain"
                  size="1x" /></a>
            </li>
            <li class="pr-2">
              <a href=""><font-awesome-icon :icon="['fab', 'x-twitter']" class="text-white c-exact-icon p-3 bg-opacity-50 bg-alphachain"
                  size="1x" /></a>
            </li>
            <li class="pr-2">
              <a href=""><font-awesome-icon :icon="['fab', 'linkedin-in']" class="text-white c-exact-icon p-3 bg-opacity-50 bg-alphachain"
                  size="1x" /></a>
            </li>

            <li>
              <a href="https://www.instagram.com/ega_tanzania/"><font-awesome-icon :icon="['fab', 'instagram']" class="text-white c-exact-icon p-3 bg-opacity-50 bg-alphachain"
                  size="1x" /></a>
            </li>
          </ul>
        </div>

      </div>
      <!-- this holds the list you feel me -->
      <div class="c-links ">
        <ul>
          <label><span class="c-home-active">Other links</span></label>
          <li class="mt-5"><a href="https://faucet.all.co.tz/"><span>>Faucet</span></a></li>
          <li class="mt-5"><a href="https://alphachain.all.co.tz/Wallet"><span>>Wallet</span></a></li>
          <li class="mt-5"><a href="/"><span>>Explorer</span></a></li>
          <li class="mt-5 "><a href="https://alphachain.all.co.tz/dapps"><span>>dApps</span></a></li>
        </ul>
      </div>

      <!-- this one holds the third part -->
      <div class="flex flex-col items-start pr-11">
        <p class="c-join-our-community">Join our community</p>
        <div class="flex">
          <button class="
              bg-btnAmber
              px-5
              py-2
              rounded-md
              drop-shadow-md
              text-white
              mt-3">Join Discord</button>
          <button class="
           bg-btnAmber
              px-5
              py-2
              rounded-md
              drop-shadow-md
              text-white
              mt-3
              ml-2
              flex
              items-center
              "><img src="../assets/alpha-icon.svg" alt="alpha-icon">
                Alphachain Network</button>

        </div>
      </div>
    </div>
    <div class="text-[#D8D8D8] text-center  pb-4 italic bg-alphachain self-center w-full">
      Developed and maintained by eGA-RIDC, Copyright © 2024 eGA-RIDC
    </div>
  </div>

    <div class="col-span-1 bg-alphachain"></div>
  </div>
  
</template>
<style scoped>
.c-follow-us {
  color: #FFF;
  font-family: Ubuntu;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 137px;
  height: 35.652px;
  flex-shrink: 0;
}

.c-facebook {
  width: 90px;
  height: 86.721px;
  flex-shrink: 0;
}

.c-x-twitter {
  width: 90px;
  height: 86.721px;
  flex-shrink: 0;
}

.c-linked-in {
  width: 90px;
  height: 86.721px;
  flex-shrink: 0;
}

.c-instagram {
  width: 90px;
  height: 86.721px;
  flex-shrink: 0;
}

span {
  color: white;
  width: 48px;
  height: 46.251px;
  flex-shrink: 0;
}

.c-links a {
  color: #FFF;
  text-align: center;
  font-family: Ubuntu;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.c-links a :hover {
    color: #FFE79B;
}
.c-join-our-community {
  color: #FFF;
  text-align: center;
  font-family: Ubuntu;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

/* .c-join-button {
  border-radius: 12px;
  background: #FFA140;
  width: 240px;
  height: 58.778px;
  flex-shrink: 0;
} */

.c-exact-icon {
  font-weight: 4000;
  /* background-color: white; */
  border-radius: 9999px;
  width: 20px;
  height: 20px;
}

.c-home-active {
  font-weight: bold;
}


.c-links ul li a span {
  font-size: 16px;
}
</style>