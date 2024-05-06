<template>
  <div class="flex flex-col" :class="{ 'col-md-4': size === 'small', 'col-md-6': size === 'medium', 'col-md-12': size === 'large' }">
    <span class="text-gray-600" v-if="showLabels">{{ label }}</span>
    <div class="form-group col-md-3 flex flex-row justify-start group">
      <FormRadio v-for="(option, index) of options" :key="index" class="m-2" :label="option.name" :name="name" :input-value="inputValue2" :value="option.value" @input-value="valueChanged($event)" />
      <span v-if="required" class="text-danger text-3xl p-1">*</span>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import FormRadio from "@/components/shared/forms/dynamic-form-components/FormRadio.vue";

const props = defineProps(['icon', 'label', 'name', 'size', 'type', 'required', 'options', 'inputValue2', 'showLabels'])
const emit = defineEmits(['inputValue'])

let value = ref("")

const valueChanged = (value) => {
  emit('inputValue', value)
}
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
