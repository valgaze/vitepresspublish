<template>
  <div :class="['input-container', isDark ? 'is-dark' : '', buttonClass]">
    {{ selectedOptions }}
    {{ inputValue }}
    <input
      v-if="type === 'text'"
      type="text"
      class="input"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <textarea
      v-else-if="type === 'textarea'"
      class="textarea"
      :placeholder="placeholder"
      v-model="inputValue"
    ></textarea>
    <div v-else-if="type === 'radio'" class="radio-group">
      <label
        v-for="(option, index) in radioOptions"
        :key="index"
        class="radio-label"
      >
        <input
          type="radio"
          :value="option.value"
          v-model="inputValue"
          class="radio-input"
        />
        {{ option.label }}
      </label>
    </div>
    <div v-else-if="type === 'multi-select'" class="multi-select">
      <label
        class="checkbox-label"
        v-for="(option, index) in multiSelectOptions"
        :key="index"
      >
        <input
          type="checkbox"
          :value="option.value"
          v-model="selectedOptions"
          class="checkbox-input"
        />
        {{ option.label }}
      </label>
    </div>
    <button v-else-if="type === 'button'" class="button">
      {{ placeholder }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: String, // 'text', 'textarea', 'radio', 'multi-select', or 'button'
    placeholder: String,
    isDark: Boolean,
    radioOptions: Array, // Array of {label, value} objects
    multiSelectOptions: Array, // Array of {label, value} objects
    buttonClass: String, // Class for button styling variant (is-danger, is-warning, is-info)
  },
  data() {
    return {
      inputValue: "",
      selectedOptions: [],
    };
  },
};
</script>

<style scoped>
/* Base input styles */
.input-container {
  position: relative;
}

.input,
.textarea,
.radio-label,
.checkbox-label,
.button {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
}

.textarea {
  resize: vertical;
}

.radio-label,
.checkbox-label {
  display: block;
  margin: 5px 0;
}

.radio-input,
.checkbox-input {
  margin-right: 5px;
}

/* Dark mode */
.is-dark .input,
.is-dark .textarea,
.is-dark .radio-label,
.is-dark .checkbox-label,
.is-dark .button {
  background-color: #333;
  color: #fff;
}

/* Styling for different attention levels */
.is-danger .button {
  background-color: red;
}

.is-warning .button {
  background-color: yellow;
}

.is-info .button {
  background-color: blue;
  color: white;
}

/* Radio button styles */
.radio-group {
  margin: 5px 0;
}

/* Multi-select styles */
.multi-select {
  margin: 5px 0;
}

/* Button styles */
.button {
  cursor: pointer;
}
</style>
