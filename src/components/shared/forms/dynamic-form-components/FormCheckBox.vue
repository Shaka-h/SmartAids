<template>
  <div class="ml-4 mt-3" :class="{ 'col-md-4': size === 'small', 'col-md-6': size === 'medium', 'col-md-12': size === 'large' }">
      <label class="container flex">
        <input v-model="value" :checked="value" type="checkbox">
        <div class="checkmark"></div>
        <span class="label-text pl-3" v-if="label">{{ label }}</span>
      </label>
  </div>
</template>

<script>
export default {
    props:['name', 'label', 'size', 'inputValue'],
    emits: ['inputValue'],
  data() {
      return {
        value: false
      }
  },
  watch: {
      value() {
        let inputValue = {}
        inputValue[this.name] = this.value
        this.$emit('inputValue', inputValue)
      }
  },
  mounted() {
      this.value = !!this.inputValue

    let inputValue = {}
    inputValue[this.name] = this.value
    this.$emit('inputValue', inputValue)
  }
};
</script>

<style scoped>

.label-text {
  font-size: 16px !important;
}
/* Hide the default checkbox */
.container input {
  position: absolute;
  display: flex;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  position: relative;
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
}

/* Create a custom checkbox */
.checkmark {
  --clr: #8c00ff;
  position: relative;
  top: 0;
  left: 0;
  height: 1.1em;
  width: 1.2em;
  background-color: #ccc;
  border-radius: 50%;
  transition: 300ms;
}

.container input:checked ~ .checkmark {
  background-color: var(--clr);
  border-radius: .5rem;
  animation: pulse 500ms ease-in-out;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid #E0E0E2;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 rgba(140, 0, 255, 0.56);
    rotate: 20deg;
  }

  50% {
    rotate: -20deg;
  }

  75% {
    box-shadow: 0 0 0 5px rgba(140, 0, 255, 0.38);
  }

  100% {
    box-shadow: 0 0 0 8px rgba(140, 0, 255, 0.19);
    rotate: 0;
  }
}
</style>
