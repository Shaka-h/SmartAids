<template>
    <div class="row h-full p-4" >
        <div class="col-md-10 pr-10 md:w-full detail" style=""> 
            <div class="h-1/2 rounded-lg" style="background-color: #40128B42">
                <Details />
            </div>
            <div class="mt-8 h-1/2">
                <MyPosts />
            </div>
        </div>

        <div class="col-md-2 border-l-2 follow">
            <Follows />
        </div>  
    </div>

   
</template>

<script setup>
import Follows from '../Profile/Follows.vue';
import Details from './Details.vue';
import MyPosts from '../Profile/MyPosts.vue'

</script>

<style scoped>
.detail{
    width: 70%;
}
.follow{
    width: 30%;
}
@media (max-width: 991.98px) {
    .detail{
        width: 100%;
    }
    .follow{
        width: 0%;
    }
}
</style>