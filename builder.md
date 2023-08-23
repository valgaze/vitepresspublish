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
import { ref } from 'vue'
import { useData } from 'vitepress'
import { Speedybot } from 'speedybot'
import BoundInput from './.vitepress/components/BoundInput.vue'
import RoomSearcher from './.vitepress/components/RoomSearcher.vue'

const Bot = new Speedybot()
const token = ref('__REPLACE__ME__')
const tokenValid = ref(false)
const hasTriedOnce = ref(false)
const url = ref('')
const webhooks = ref([])
const { isDark } = useData()

const updateToken = (t) => {
  hasTriedOnce.value = true
  Bot.setToken(t); 
  
  tokenValid.value = true  
}

const checkWebhooks = async (t) => { 
  
  const res = await Bot.getWebhooks()
  console.log("#", res)
 webhooks.value = res
}

</script>

DEBUG: {{ JSON.stringify({token, tokenValid, url, isDark, webhooks }) }}

---

## Room search

 <RoomSearcher />

## Enter your token

<BoundInput :isDark="isDark" @valChange="token = $event" :value="token"/>

<button @click="updateToken(token)" class="btn info">Set token</button>

<button @click="checkWebhooks(token)">check webhook token</button>

<div v-for="webhook in webhooks">
webhook: {{ webhook }}
</div>

<div v-if="hasTriedOnce && !tokenValid">

::: danger
Token is INVALID 😥 (generate a new token and try again)
:::

</div>

<style>
.btn {
background-color: #fff;
border-color: #dbdbdb;
border-width: 1px;
color: #363636;
cursor: pointer;
justify-content: center;
padding-bottom: calc(.5em - 1px);
padding-left: 1em;
padding-right: 1em;
padding-top: calc(.5em - 1px);
text-align: center;
white-space: nowrap;
  }
  .button:hover {
    background: #3488ce
  }
  .info {
    background-color: #3e8ed0;
border-color: transparent;
color: #fff;
  }
  </style>
