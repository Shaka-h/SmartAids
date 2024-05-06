<template>
  <div class="flex flex-col" :class="{ 'col-md-4': size === 'small', 'col-md-6': size === 'medium', 'col-md-12': size === 'large' }">
    <span class="text-gray-600" v-if="showLabels">{{ label }}<span v-if="required && showLabels" class="text-danger px-2 ">*</span></span>
    <div class="form-group input-holder my-2 pl-3">
      <svg-icon v-if="icon" :name="icon" height="h-5" width="w-5" class="icon" color="#999999"></svg-icon>
      <select
          v-model="value"
          class="text-sm outline-none form-control select left-2 rounded-lg h-full">
        <option value="" disabled selected>{{ label }} <span v-if="required && !showLabels" class="text-danger text-3xl p-1">*</span></option>
        <option v-for="(option, index) of options" :key="index"
        :value="option.value"> {{ option.name }} </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {onMounted, ref, watch} from "vue";

const props = defineProps(['icon', 'label', 'name', 'size', 'type', 'required', 'options', 'inputValue', 'showLabels'])
const emit = defineEmits(['inputValue'])

let value = ref("")

onMounted(() => {
  value.value = props.inputValue ? props.inputValue : ""
})

watch(value, (value) => {
  let inputValue = {}
  inputValue[props.name] = value
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
.select {
  width: 100%;
  height: 45px;
  line-height: 30px;
  background-color: #f8fafc;
  border: 0;
  outline: none;
  color: #0d0c22;
  transition: 0.5s ease;
}

.select::placeholder {
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
