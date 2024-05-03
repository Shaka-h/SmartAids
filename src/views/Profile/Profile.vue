<template>
    <div class="row h-full p-4" >
        <div class="col-md-10 pr-10" style="width: 70%;"> 
            <div class="h-1/2">
                <Details />
            </div>
            <div class="h-1/2">
                <MyPosts />
            </div>
        </div>

        <div class="col-md-2 border-l-2" style="width: 30%">
            <Follows />
        </div>
        
    </div>
</template>

<script setup>
import Follows from '../Profile/Follows.vue';
import Details from './Details.vue';
import MyPosts from '../Profile/MyPosts.vue'

</script>