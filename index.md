---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Publish Test"
  text: ""
  tagline: Effortless + essential conversation design tooling
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
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
  import CustomComponent from './.vitepress/components/webhooks.vue'
</script>

<CustomComponent name="what" />
<hr/>
<CustomComponent />

investigations:

- [x] vue component w/ pathing
- vue component that uses speedybot w/ pathing
