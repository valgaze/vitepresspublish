---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Publish Test"
  text: ""
  tagline: Effortless + essential conversation design tooling
  image:
    src: /logo.gif
    alt: Speedybot
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: Examples
      link: /api-examples
    - theme: alt
      text: API Docs
      link: /api-docs/modules
features:
  - title: Zero dependencies
    details: Written in typescript, no de
  - title: Run it anywhere
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Speedycard builder
    details: Never again wrangle JSON and build rich interactive cards/forms with ease
---

<el-tabs v-model="activeName" tab-position="left" class="demo-tabs" @tab-click="handleClick">
<el-tab-pane label="Speedycard" name="first">User</el-tab-pane>
<el-tab-pane label="JSON (output)" name="second">Config</el-tab-pane>
</el-tabs>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<!--@include: ./README.md-->
