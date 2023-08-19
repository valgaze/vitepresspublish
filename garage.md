---
# https://vitepress.dev/reference/default-theme-home-page
outline: deep
# layout: home

hero:
  name: "Speedybot Garage"
  text: ""
  tagline: Take a wrench to your bot (webhooks, roomIds, etc)
---

<script setup>
  import CustomComponent from './.vitepress/components/webhooks.vue'
  import BoundInput from './.vitepress/components/BoundInput.vue'


import { ref } from 'vue'

const count = ref(0)
const token = ref('beer')
</script>

<hr/>
Countaer is {{ count }}<br/>
Token is {{ token }}

<BoundInput
v-bind:value="token"
@bongo="token = $event"/>

<!-- <CustomComponent :name="token" /> -->

<button @click="token='aaa'">DO IT</button>

## Garage

{{ token }}

```html--vue
<pre>T: {{ token }}</pre>
<!-- stylesheet -->
<link rel="stylesheet" href="https://mycdn.com/css/{{ token }}/style.min.css" />
```

::: code-group

```ts-vue [config.ts]
// npm i speedybot@latest
// npx ts-node script.ts
import { Speedybot } from "speedybot";

const target = "myEmail@joe.com";
const token = "{{token}}"

async function main(token: string, target: string) {
  const Bot = new Speedybot(token);

  const card = Bot.card()
    .addTitle("Hello there!!")
    .subTitle(`The system time is new Date().toString()`);
  Bot.sendTo(target, card);
}

main(target, token);
```

```js [config.js]
// npm i speedybot@latest
// node script.js
const { Speedybot } = require("speedybot");

const target = "myEmail@joe.com";
const token = "aaabbbcccdddee";

async function main(token, target) {
  const Bot = new Speedybot(token);

  const card = Bot.card()
    .addTitle("Hello there!!")
    .subTitle(`The system time is new Date().toString()`);
  Bot.sendTo(target, card);
}

main(target, token);
```

:::

investigations:

- [x] vue component w/ pathing
- [x] vue component that uses speedybot w/ pathing
- input field
- global state possible? hook into dark mode for componentss?
- how does it look deployed
