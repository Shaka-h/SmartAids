<template>
  <div class="flex flex-col" :class="{ 'col-md-4': size === 'small', 'col-md-6': size === 'medium', 'col-md-12': size === 'large' }">
    <span class="text-gray-600">{{ label }}<span v-if="required" class="text-danger text-3xl p-1">*</span></span>
    <div class="form-group input-holder my-2 pl-3">
      <svg-icon v-if="icon" :name="icon" height="h-5" width="w-5" class="icon" color="#999999"></svg-icon>

      <v-autocomplete
          v-model="value"
          :items="options"
          chips
          closable-chips
          color="blue-grey-lighten-2"
          class="text-sm outline-none form-control select left-2 rounded-lg h-full"
          item-value="value"
          item-title="name"
          multiple
      >
        <template v-slot:chip="{ props, item }">
          <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.avatar"
              :text="item.raw.name"
          ></v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item
              v-bind="props"
              :prepend-avatar="item?.raw?.avatar"
              :title="item?.raw?.name"
              :subtitle="item?.raw?.group"
          ></v-list-item>
        </template>
      </v-autocomplete>
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
  value.value = props.inputValue ? props.inputValue : []
  for (const elementsByClassNameElement of document.getElementsByClassName('v-field__input')) {
    elementsByClassNameElement.classList.remove('v-field__input')
    elementsByClassNameElement.classList.add('flex')
    elementsByClassNameElement.classList.add('flex-wrap')
    elementsByClassNameElement.classList.add('h-8')
    elementsByClassNameElement.classList.add('m-0')
    for (const inputText of elementsByClassNameElement.getElementsByTagName('input')) {
      inputText.classList.add('hidden')
    }
  }
})

watch(value, (value) => {
  let inputValue = {}
  value = value.map(v => {

    for (const option of props.options) {
      if (v === option.name) {
        v = option.value
        break;
      }
    }
    return v
  })
  console.log(value)
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
