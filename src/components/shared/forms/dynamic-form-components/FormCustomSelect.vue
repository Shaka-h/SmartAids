<template>
  <div class="flex flex-col" :class="{'col-md-4': size === 'small','col-md-6': size === 'medium','col-md-12': size === 'large'}">
    <span class="text-gray-600" v-if="showLabels">{{ label }}</span>
    <div class="p-1 rounded-lg form-group ">
      <div class="flex input-holder w-full text-gray-500">
        <div
          class="my-auto h-6 ma-3 flex items-center border-r pr-1">
          <select
            v-model="value"
            class="text-sm outline-none left-2 rounded-lg"
          >
            <option value="" disabled selected>{{ label }}</option>
            <option v-for="(option, index) of options" :key="index" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>
        <input
          :type="type"
          v-model="textInputValue"
          :placeholder="value"
          :required="required"
          class="w-full pr-3 py-2 appearance-none bg-transparent outline-none focus:border-slate-600 shadow-sm rounded-lg"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps([
  "icon",
  "label",
  "name",
  "defaultInputValue",
  "defaultTextInputValue",
  "size",
  "type",
  "showLabels",
  "required",
  "options",
]);
const emit = defineEmits(["inputValue"]);

let value = ref("");
let textInputValue = ref("");

onMounted(() => {
  value.value = props.defaultInputValue
  textInputValue.value = props.defaultTextInputValue
})


watch(value, (value) => {
  let inputValue = {};
  inputValue[props.name] = { 'value':value, 'textInputValue': textInputValue.value };
  emit("inputValue", inputValue);
});
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
