<template>
  <div class="container">
    Bongo: {{ JSON.stringify({ token }) }}
    <!-- <div class="field">
      <label class="label">Recent Spaces</label>
      <div class="control has-icons-right">
        <input
          @click="beer"
          class="input"
          type="text"
          v-model="search"
          @input="filter"
          @blur="searchIsActive = false"
          placeholder="Search Recent Rooms"
          style="cursor: pointer"
        />
        {{ selected }}
        <span class="icon is-right">🔎</span>
      </div>
      <div
        class="dropdown select-dropdown"
        :class="{ 'is-active': searchIsActive }"
      >
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a
              href="#"
              v-for="item in filteredRooms"
              :key="item.id"
              class="dropdown-item"
              @mousedown.prevent="selectRoom(item)"
            >
              <span>{{ item.title }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                {{ item.id.slice(0, 4) }}...
              </span>
            </a>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useData } from "vitepress";

const count = ref(0);
const token = ref("beer");
const { isDark } = useData();
const filteredRooms = [];
const selectRoom = () => {
  return 0;
};
// return {
//   count,
//   token,
//   isDark,
// };
// export default {
//   props: ["value", "isDark"],
//   methods: {
//     async onInput(event) {
//       try {
//         const val = event.target.value;
//         this.$emit("valChange", val);
//       } catch (e) {
//         console.log("omge", e);
//       }
//     },
//   },
// };
</script>
<style>
.dark-mode {
  background-color: #363636;
  border-color: #1a1a1a;
  color: #fff;
  box-shadow: inset 0 0.0625em 0.125em rgba(255, 255, 255, 0.05);
}
</style>
