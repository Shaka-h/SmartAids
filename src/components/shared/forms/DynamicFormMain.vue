<template>
  <div class="row">
    <template v-for="(field, index) of formFields">
        <template v-if="field.inputType === 'input' && showWhen(field.showWhen, field.name)">
          <form-input class="intro-x" :noModification="field.noModification" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value="field?.value" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-input>
        </template>
        <template v-if="field.inputType === 'time' && showWhen(field.showWhen, field.name)">
          <form-time-picker class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value="field?.value" :icon="field.icon" :size="field.size" @input-value="formChange($event)"></form-time-picker>
        </template>
        <template v-if="field.inputType === 'textarea' && showWhen(field.showWhen, field.name)">
          <form-text-area class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value="field?.value" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-text-area>
        </template>
        <template v-if="field.inputType === 'custom-select' && showWhen(field.showWhen, field.name)">
          <form-custom-select class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :default-input-value="field?.value" :default-text-input-value="field?.textInputValue" :options="field.options" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-custom-select>
        </template>
        <template v-if="field.inputType === 'select' && showWhen(field.showWhen, field.name)">
          <form-select class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value="field?.value" :options="field.options" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-select>
        </template>
        <template v-if="field.inputType === 'multi-select' && showWhen(field.showWhen, field.name)">
          <form-multi-select class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value="field?.value" :options="field.options" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-multi-select>
        </template>
        <template v-if="field.inputType === 'radio-group' && showWhen(field.showWhen, field.name)">
          <form-radio-group class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value2="field?.value" :options="field.options" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-radio-group>
        </template>
        <template v-if="field.inputType === 'checkbox' && showWhen(field.showWhen, field.name)">
          <check-box class="intro-x" :required="field.required" :label="field.label" :name="field.name" :input-value="field?.value" @input-value="formChange($event)"></check-box>
        </template>
        <template v-if="field.inputType === 'form-array' && showWhen(field.showWhen, field.name)">
          <dynamic-form-array :required="field.required" :label="field.label" :name="field.name" :show-labels="showLabels" :default-values="field.defaultValues" :formFields="field.children" @input-values="formChange($event)"></dynamic-form-array>
        </template>
        <template v-if="field.inputType === 'file' && showWhen(field.showWhen, field.name)">
          <form-drag-drop class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :size="field.size" :type="field.type" :accept="field.accept" :multiple-files="field.multipleFiles" @input-value="formChange($event)"></form-drag-drop>
        </template>
        <template v-if="field.inputType === 'rich-text' && showWhen(field.showWhen, field.name)">
          <form-rich-text class="intro-x" :required="field.required" :label="field.label" :show-labels="showLabels" :name="field.name" :input-value="field?.value" :options="field.options" :icon="field.icon" :size="field.size" :type="field.type" @input-value="formChange($event)"></form-rich-text>
        </template>
    </template>

    <div class="col-md-12 flex justify-end intro-x">
      <button @click="submitForm" class="btn btn-primary" :disabled="disableSubmit">
        {{ submitLabel ? submitLabel : 'save' }}
      </button>
    </div>

  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import CheckBox from "@/components/shared/forms/dynamic-form-components/FormCheckBox.vue";
import FormInput from "@/components/shared/forms/dynamic-form-components/FormInput.vue";
import FormSelect from "@/components/shared/forms/dynamic-form-components/FormSelect.vue";
import FormCustomSelect from "@/components/shared/forms/dynamic-form-components/FormCustomSelect.vue";
import FormRadioGroup from "@/components/shared/forms/dynamic-form-components/FormRadioGroup.vue";
import FormTextArea from "@/components/shared/forms/dynamic-form-components/FormTextArea.vue";
import DynamicFormArray from "@/components/shared/forms/dynamic-form-components/DynamicFormArray.vue";
import FormDragDrop from "@/components/shared/forms/dynamic-form-components/FromDragDrop.vue";
import FormRichText from "@/components/shared/forms/dynamic-form-components/FormRichText.vue";
import FormMultiSelect from "@/components/shared/forms/dynamic-form-components/FormMultiSelect.vue";
import FormTimePicker from "@/components/shared/forms/dynamic-form-components/FormTimePicker.vue";

const props = defineProps(['formFields', 'submitLabel', 'showLabels'])
const emit = defineEmits(['onSubmit', 'inputChange'])

const formValues = ref({})
const disableSubmit = ref(true)

onMounted(() => {
  for (const [index, formField] of props.formFields.entries()) {
    if (formField?.inputType === 'form-array') {
      let arrayFormNames = formField?.children.map(f => f.name)
      let formArrayDefaultValue = {}
      for (const formName of arrayFormNames) {
        formArrayDefaultValue[formName] = null
      }
      formValues.value[formField?.name] = [ formArrayDefaultValue ]
    }
    else if (formField?.inputType === 'file') {
      formValues.value[formField?.name] = []
    }
    else if (formField?.inputType === 'custom-select') {
      if (formField?.value && formField?.textInputValue) {
        formValues.value[formField.name] = {
          value: formField?.value,
          textInputValue: formField?.textInputValue
        }
      } else formValues.value[formField.name] = formField?.value
    }
    else {
      formValues.value[formField.name] = formField?.value
    }
  }
})

watch(formValues, (b) => {
  checkValidity()
})

onMounted(() => {
  checkValidity()
})


const checkValidity = () => {
  let found = false

  for (const formField of props.formFields) {

    if (formField?.inputType !== 'form-array' && formField?.inputType !== 'file') {
        if (formField.required && !formValues.value[formField.name]) {
          disableSubmit.value = true
          found = true
          break
        } else {
          disableSubmit.value = false
        }
    }
    if (formField?.inputType === 'file' && !found) {
        if (formField.required && !formValues.value[formField.name]?.length) {
          disableSubmit.value = true
          found = true
          break
        } else {
          disableSubmit.value = false
        }
    }

    if (formField?.inputType === 'form-array' && !found) {
      for (const childFormField of formField?.children) {
        let formArrayValues = formValues.value[formField?.name]
        if (formArrayValues) {
          for (const formArrayValue of formArrayValues) {
            if (childFormField.required && !formArrayValue[childFormField.name]) {
              disableSubmit.value = true
              break
            } else {
              disableSubmit.value = false
            }
          }
        }
      }
    }

  }
}

const showWhen = (value, name) => {
  // if (value) {
  //   formValues.value[name] = null
  // }
  return value ?  eval(value) : true
}

const formChange = (newValue) => {
  formValues.value = {
    ...formValues.value,
    ...newValue
  }
  emit('inputChange', newValue)
}
const submitForm = () => {
  emit('onSubmit', formValues.value)
}
</script>

<style scoped>

</style>
