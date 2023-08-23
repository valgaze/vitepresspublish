hell yar
hmm?<Beer label="Hey look a button" severity="success"/>

{{ damn }}
<texarea v-model="damn" />

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
const { isDark } = useData()
const token = ref('token_r')
const isLoading = ref(false)
const damn = ref('')

import Comps from './comps.vue'
import StyledInput from './StyledInput.vue'
import Beer from "primevue/button";

setTimeout(x => {
    isLoading.value = true
}, 4700)

</script>

{{ token }}
<StyledInput
:isLoading="isLoading"
:isDark="isDark"
@valChange="token = $event"
:value="token"/>

<Comps />
