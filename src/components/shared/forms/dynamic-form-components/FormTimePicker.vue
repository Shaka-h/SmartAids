<template>
  <div class="flex flex-col" :class="{ 'col-md-4': size === 'small', 'col-md-6': size === 'medium', 'col-md-12': size === 'large' }">
    <span class="text-gray-600" v-if="showLabels">{{ label }}</span>
    <div class="form-group input-holder my-2 pl-2">
      <svg-icon v-if="icon" :name="icon" height="h-5" width="w-5" class="icon" color="#999999"></svg-icon>
      <div class="py-1 w-full flex">
        <vue-timepicker input-width="100%" v-model="value" input-class="border-0 input bg-[#f8fafc]" close-on-complete></vue-timepicker><span v-if="required" class="text-danger text-3xl px-1">*</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {onMounted, ref, watch} from "vue";
import VueTimepicker from 'vue3-timepicker'

const props = defineProps(['icon', 'label', 'name', 'size', 'type', 'required', 'inputValue', 'showLabels'])
const emit = defineEmits(['inputValue'])

let value = ref(null)

onMounted(() => {
  value.value = props.inputValue
})

watch(value, (value) => {
  let inputValue = {}
  let timeValue = `${value.HH}:${value.mm}`
  if (value.HH === '' || value.mm === '') timeValue = null
  inputValue[props.name] = timeValue
  emit('inputValue', inputValue)
})
</script>

<style scoped>

.input-holder {
  display: flex;
  line-height: 30px;
  align-items: center;
  border-radius: 10px;
  background-color: #f8fafc;
  transition: 0.5s ease;
  border: 2px solid transparent;
}
.input {
  width: 100%;
  height: 45px;
  line-height: 30px;
  background-color: #f8fafc;
  border: 0;
  outline: none;
  color: #0d0c22;
  transition: 0.5s ease;
}

.input::placeholder {
  color: #94a3b8;
}

.input-holder:focus,
.input-holder:hover {
  border-color: rgba(129, 140, 248);
}


.icon {
  fill: none;
  width: 1rem;
  height: 1rem;
}
</style>
