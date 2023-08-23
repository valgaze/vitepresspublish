<template>
  <div :class="['wrap', { 'is-loading': isLoading }, { 'is-dark': isDark }]">
    <input
      class="my-input"
      type="text"
      :placeholder="placeholder"
      @input="onInput($event)"
      :value="value || ''"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    isDark: Boolean,
    isLoading: Boolean,
    placeholder: {
      default() {
        return "Enter token (ex. MWYVMTktNTJiMjdkN2E4...)";
      },
    },
  },
  data() {
    return {
      inputValue: "",
      selectedOptions: [],
    };
  },
  methods: {
    async onInput(event) {
      try {
        const val = event.target.value;
        this.$emit("valChange", val);
      } catch (e) {
        console.log("Err", e);
      }
    },
  },
};
</script>

<style scoped>
/** Lots of inspiration from Bulma's nice loader on inputs: https://bulma.io/documentation/form/input/ */

.my-input {
  background-color: #fff;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  color: #363636;
  display: inline-flex;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  height: 2.5em;
  padding: 0 0 0 2%;
  padding-right: 7%;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  align-items: center;
  border: 1px solid white;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  width: 100%; /* Ensure the input takes full width */
}

/* Dark mode styles */
.is-dark .my-input {
  border-color: #363636;
  background-color: #363636;
  color: #fefefe;
}

.wrap {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
  border: 1px solid #dbdbdb;
}
.wrap::after {
  font-size: 1.5rem;
}
.wrap.is-loading::after {
  box-sizing: inherit;
  position: absolute !important;
  right: 0.625em;
  top: 0.35em;
  z-index: 4;
  animation: spinAround 0.5s infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 9999px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}

/* Keyframes for spinner animation */
@keyframes spinAround {
  to {
    transform: rotate(1turn);
  }
}
</style>
