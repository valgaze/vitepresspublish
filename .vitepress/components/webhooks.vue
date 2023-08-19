<template>
  <div class="hero">
    <input
      class="good-one"
      type="text"
      placeholder="hooo-doggy"
      id="rootTokenRef"
      v-model="token"
      autofocus
    />

    <div class="hero-body">
      <div class="container" v-if="token">
        <h1 class="title">Hey, I'm {{ name }}.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { Speedybot } from "./../../fakesrc/index";

const boom = new Speedybot("xxxx" + Math.random());
export default {
  data() {
    return {
      token: "",
    };
  },
  props: {
    name: {
      type: String,
      required: false,
      default() {
        return `Hello bongo ${Math.random()}`;
      },
    },
  },
};
</script>

<style>
h2.subtitle {
  font-size: 1.2rem;
  border-top: none;
}

.good-one {
  font-size: 1.5rem;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 100%;
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  background-color: #fff;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>
