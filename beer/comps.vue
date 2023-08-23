<template>
  <div>
    <CustomInput type="text" placeholder="Enter text" />
    <CustomInput type="textarea" placeholder="Enter textarea" />
    <CustomInput
      type="radio"
      :radioOptions="radioOptions"
      placeholder="Choose a radio option"
    />
    <CustomInput
      type="multi-select"
      :multiSelectOptions="multiSelectOptions"
      placeholder="Select options"
    />
    <CustomInput
      type="button"
      placeholder="Click me"
      @click="getData"
      buttonClass="is-info"
    />
  </div>
</template>

<script>
import CustomInput from "./main.vue";

export default {
  components: {
    CustomInput,
  },
  data() {
    return {
      radioOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
      multiSelectOptions: [
        { label: "Option A", value: "optionA" },
        { label: "Option B", value: "optionB" },
      ],
    };
  },
  methods: {
    getData() {
      alert("wah");
    },
  },
};
</script>
