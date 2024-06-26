<template>
    <div>
        <div class="flex items-center justify-center h-full flex-col ">
            <div class="class font-bold text-2xl mb-8">{{props?.message}}</div>
            <img src="@/assets/images/image.png" alt="Profile picture">
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['message'])

</script>
