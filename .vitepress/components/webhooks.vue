<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Hey, I'm {{ name }}.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { Speedybot } from "speedybot-mini";

const boom = new Speedybot();
console.log("#", boom.contains);
export default {
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
</style>
