<template>
  <input
    type="text"
    class="input-field"
    :class="{ 'dark-mode': isDark }"
    @input="onInput($event)"
    :value="value || ''"
  />
</template>

<script>
export default {
  props: ["value", "isDark"],
  methods: {
    async onInput(event) {
      try {
        const val = event.target.value;
        this.$emit("valChange", val);
      } catch (e) {
        console.log("omge", e);
      }
    },
  },
};
</script>
<style>
.input-field {
  align-items: center;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  color: #363636;
  display: inline-flex;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  max-width: 100%;
  padding: calc(0.5em - 1px) calc(0.75em - 1px);
  position: relative;
  vertical-align: top;
  width: 100%;
  transition: background-color 0.3s cubic-bezier(0.2, 0.8, 0.4, 1),
    border-color 0.3s cubic-bezier(0.2, 0.8, 0.4, 1),
    color 0.3s cubic-bezier(0.2, 0.8, 0.4, 1),
    box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.4, 1);
}

.dark-mode {
  background-color: #363636;
  border-color: #1a1a1a;
  color: #fff;
  box-shadow: inset 0 0.0625em 0.125em rgba(255, 255, 255, 0.05);
}
</style>
