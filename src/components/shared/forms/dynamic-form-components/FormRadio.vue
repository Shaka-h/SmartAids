<template>
  <div class="container2">
    <label>
      <input type="radio" :name="name" :value="value" v-model="radioValue" @click="valueChanged()"/>
      <span>{{label}}</span>
    </label>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

const props = defineProps(['label', 'name', 'value', 'inputValue'])
const emit = defineEmits(['inputValue'])

let radioValue = ref("")

onMounted(() => {
  radioValue.value = props.inputValue
  if (props.inputValue === props.value) {
    let inputValue = {}
    inputValue[props.name] = props.inputValue
    emit('inputValue', inputValue)
  }
})

const valueChanged = () => {
  let inputValue = {}
  inputValue[props.name] = props.value
  emit('inputValue', inputValue)
}
</script>

<style scoped>

.container2 label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;

}

.container2 label input {
  position: absolute;
  left: -9999px;
}

.container2 label input:checked + span {
  background-color: #386de165;
  color: white;
}

.container2 label input:checked + span:before {
  box-shadow: inset 0 0 0 0.4375em #386EE1;
}

.container2 label span {
  display: flex;
  align-items: center;
  padding: 0.2em 0.75em 0.2em 0.375em;
  border-radius: 77em;
  transition: 0.25s ease;
  color: #414181;
}

.container2 label span:hover {
  background-color: #d6d6e5;
}

.container2 label span:before {
  display: flex;
  flex-shrink: 0;
  content: "";
  background-color: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 0.375em;
  transition: 0.25s ease;
  box-shadow: inset 0 0 0 0.125em #386EE1;
}
</style>
