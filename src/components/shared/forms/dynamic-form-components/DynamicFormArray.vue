<template>
  <div class="px-3 w-full">
    <div class="flex justify-between flex-wrap items-center mt-2 mb-1 w-full">

      <span class="px-1">{{ label }}<span v-if="required && !showLabels" class="text-danger text-3xl p-1">*</span></span>
      <div>
        <button class="primary-action-btn intro-x" @click="addForm">
          <svg-icon name="add" height="h-5" width="w-5" color="#000" :stroke="true"></svg-icon>
        </button>
      </div>
    </div>
    <template v-for="(dynamicFormField, dynamicFormFieldIndex) of dynamicFormFields" :key="dynamicFormFieldIndex">
      <div class="flex items-center">
        <div class="flex items-center flex-wrap grow">
          <template v-for="(field, index) of dynamicFormField" :key="index">
            <template v-if="field.inputType === 'input' && showWhen(field.showWhen, field.name)">
              <form-input class="intro-x" :label="field.label" :show-labels="showLabels" :input-value="field?.value" :name="field.name" :icon="field.icon" :size="field.size"
                          :type="field.type" @input-value="formChange($event, dynamicFormFieldIndex)"></form-input>
            </template>
            <template v-if="field.inputType === 'textarea' && showWhen(field.showWhen, field.name)">
              <form-text-area class="intro-x" :label="field.label" :show-labels="showLabels" :input-value="field?.value" :name="field.name" :icon="field.icon" :size="field.size"
                              :type="field.type" @input-value="formChange($event, dynamicFormFieldIndex)"></form-text-area>
            </template>
            <template v-if="field.inputType === 'custom-select' && showWhen(field.showWhen, field.name)">
              <form-custom-select class="intro-x" :label="field.label" :show-labels="showLabels" :name="field.name" :options="field.options"
                                  :icon="field.icon" :size="field.size" :type="field.type"
                                  :default-input-value="field?.value" :default-text-input-value="field?.textInputValue"
                                  @input-value="formChange($event, dynamicFormFieldIndex)"></form-custom-select>
            </template>
            <template v-if="field.inputType === 'select' && showWhen(field.showWhen, field.name)">
              <form-select class="intro-x" :label="field.label" :show-labels="showLabels" :input-value="field?.value" :name="field.name" :options="field.options"
                           :icon="field.icon" :size="field.size" :type="field.type"
                           @input-value="formChange($event, dynamicFormFieldIndex)"></form-select>
            </template>
            <template v-if="field.inputType === 'radio-group' && showWhen(field.showWhen, field.name)">
              <form-radio-group class="intro-x" :label="field.label" :show-labels="showLabels" :input-value2="field?.value" :name="field.name" :options="field.options"
                                :icon="field.icon" :size="field.size" :type="field.type"
                                @input-value="formChange($event, dynamicFormFieldIndex)"></form-radio-group>
            </template>
            <template v-if="field.inputType === 'checkbox' && showWhen(field.showWhen, field.name)">
              <check-box class="intro-x" :label="field.label" :input-value="field?.value" :name="field.name"
                         @input-value="formChange($event, dynamicFormFieldIndex)"></check-box>
            </template>
          </template>
        </div>

        <div class="ml-3 intro-x" v-if="!(dynamicFormFieldIndex+1 < dynamicFormFields.length) && dynamicFormFieldIndex !== 0">
          <button class="danger-action-btn" @click="removeForm(dynamicFormFieldIndex)">
            <svg-icon name="delete" height="h-5" width="w-5" color="#a91926"></svg-icon>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CheckBox from "@/components/shared/forms/dynamic-form-components/FormCheckBox.vue";
import FormInput from "@/components/shared/forms/dynamic-form-components/FormInput.vue";
import FormSelect from "@/components/shared/forms/dynamic-form-components/FormSelect.vue";
import FormCustomSelect from "@/components/shared/forms/dynamic-form-components/FormCustomSelect.vue";
import FormRadioGroup from "@/components/shared/forms/dynamic-form-components/FormRadioGroup.vue";
import FormTextArea from "@/components/shared/forms/dynamic-form-components/FormTextArea.vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";

const props = defineProps(['formFields', 'label', 'name', 'defaultValues', 'showLabels', 'required'])
const emit = defineEmits(['onSubmit', 'inputValues'])

const formValues = ref([])
const dynamicFormFields = ref([
])

onMounted(() => {
  if (!props.defaultValues?.length) {
    dynamicFormFields.value = [
      [...props.formFields]
    ]
    for (const index in dynamicFormFields.value) {
      formValues.value.push({})
      let formNames = dynamicFormFields.value[index].map(f => f.name)
      for (const formName of formNames) {
        formValues.value[index][formName] = null
      }
    }
  } else {
    dynamicFormFields.value = []
    for (const defaultValue of props.defaultValues) {
      let formFieldWithDefault = []
      for (const formField of props.formFields) {
        if (formField?.inputType === 'custom-select') {
          formFieldWithDefault.push({
            ...formField,
            value: defaultValue[formField.name]?.value,
            textInputValue: defaultValue[formField.name]?.textInputValue
          })
        } else {
          formFieldWithDefault.push({
            ...formField,
            value: defaultValue[formField.name]
          })
        }
      }
      dynamicFormFields.value.push(formFieldWithDefault)
    }
  }
})


const addForm = () => {
  dynamicFormFields.value.push([...props.formFields])
  let formNames = dynamicFormFields.value[0].map(f => f.name)
  let newFormValues = {}
  for (const formName of formNames) {
    newFormValues[formName] = null
  }
  formValues.value.push(newFormValues)
  let inputValue = {}
  inputValue[props.name] = formValues.value
  emit('inputValues', inputValue)
}
const removeForm = (index) => {
  dynamicFormFields.value.splice(index, 1)
  formValues.value.splice(index, 1)
  let inputValue = {}
  inputValue[props.name] = formValues.value
  emit('inputValues', inputValue)
}

const formChange = (newValue, index) => {
  formValues.value[index] = {
    ...formValues.value[index],
    ...newValue
  }
  let inputValue = {}
  inputValue[props.name] = formValues.value
  emit('inputValues', inputValue)
}

const showWhen = (value, name) => {
  if (value) {
    formValues.value[name] = null
  }
  return value ?  eval(value) : true
}


</script>


<style scoped>

</style>
