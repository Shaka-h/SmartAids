<template>
  <div class="flex flex-col px-3 w-full">
    <span  class="text-gray-600 pb-2" v-if="showLabels">{{ label }}<span v-if="required" class="text-danger text-3xl p-1">*</span> </span>
  <QuillEditor v-model:content="value" style="background-color: #f8fafc; height: 200px;"
               class="border pb-0 w-full mb-2" content-type="html" :modules="modules" toolbar="full" />

  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {QuillEditor} from "@vueup/vue-quill";
// import BlotFormatter from "quill-blot-formatter";
import Form from "quill-form";
import Autoformat from "quill-autoformat/src/modules/autoformat.js";

const props = defineProps(['icon', 'label', 'name', 'required', 'inputValue', 'showLabels'])
const emit = defineEmits(['inputValue'])

let value = ref("")
const modules = [
  // {
  //   name: 'blotFormatter',
  //   module: BlotFormatter,
  //   options: {/* options */}
  // },
  {
    name: 'form',
    module: Form,
    options: {/* options */}
  },
  {
    name: 'autoformat',
    module: Autoformat,
    options: {/* options */}
  }
];

onMounted(() => {
  value.value = props.inputValue
})

watch(value, (value) => {
  let inputValue = {}
  inputValue[props.name] = value
  emit('inputValue', value === '\n' ? null : inputValue)
})
</script>

<style scoped>

.input-holder {
  border-radius: 10px;
  background-color: #f8fafc;
  transition: 0.5s ease;
  border: 2px solid transparent;
  height: 100%;
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
