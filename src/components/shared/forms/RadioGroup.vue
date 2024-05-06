<template>
  <div>
    <label
        class="flex flex-col p-2 transition-all bg-gray-200 rounded cursor-pointer group group-hover:border-2 group-checked:border-2 group-checked:border-blue-600hover:border-2 hover:border-blue-500 bg-white border-2 border-blue-500 gap-4"
        @click="changeValue"
    >
      <input
          name="institution"
          :checked="checked"
          type="radio"
          v-model="radioValue"
          class="w-4 h-4 bg-gray-100 border-gray-300 peer accent-blue-600 checked:bg-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />

      <div class="flex flex-col items-center justify-center">
        <svg-icon v-if="icon" :name="icon"  height="h-10" width="w-10" class="mr-1" color=""></svg-icon>
        <div>{{ label }}</div>
      </div>
    </label>
  </div>

</template>

<script>
import SvgIcon from "../SvgIcon.vue";



export default {
  components: {SvgIcon},
  props:['label', 'icon', 'value'],
  emits: ['valueChange'],
  data() {
    return {
      radioValue: null,
      checked:false
    }
  },
  watch: {
    radioValue() {
      this.$emit('valueChange', this.value)
    }
  },

  methods: {
     changeValue() {
      this.checked = true
    }
  }
};
</script>

