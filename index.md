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

---

# https://vitepress.dev/reference/default-theme-home-page

layout: home

hero:
name: "Speedybot"
text: "conversation design tooling"
tagline: "works anywhere and with (nearly) everything"
actions: - theme: brand
text: Get Started 🚀
link: /docs/quickstarts.md - theme: alt
text: API Docs 📚
link: /api-docs/modules.md

features:

- title: You gotta problem
  icon: 🛠️
  details: YLOLLOL A LINK!!OU need to- introduce it, sell it, benefits, features, send them to start
  link: /api-docs/modules.md
- title: SpeedyCard Editior
  icon: 😎
  details: "Build rich interactive UIs with SpeedyCards-- easy + typesafe which become rich Adpative Cards to capture data from users"
  link: /docs/speedycard.md
- title: Portable
  icon: 👹
  details: Run it on a serverless function, CI/CD pipeline, script, server, a global CDN, whatever ya want
- title: Flexible
  icon: 👟
  details: Speedybo can run your whole bot or its convenience features can do some of it

---

<!-- files/form submissions/chips/infra/scripts) and you focus on buildig text/files/form submissions/chips) -->
<style>
@keyframes Gradient {
 0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}


.VPHomeHero .name span{
background: linear-gradient(120deg, rgb(0,123,255), rgb(30,200,125), rgb(220,20,60), rgb(0,123,255)) !important;
-webkit-background-clip: text !important;
background-clip: text !important;
color: transparent !important;
background-size: 200% 200% !important;
font: 900 80px/1 'Josefin Sans', sans-serif !important;
letter-spacing: 2px !important;
animation: Gradient 3s ease infinite !important;
}
</style>

<!--@include: ./README.md-->
