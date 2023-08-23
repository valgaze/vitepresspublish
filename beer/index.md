hell yar

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
const { isDark } = useData()
const token = ref('token_r')
const isLoading = ref(false)


import Comps from './comps.vue'
import StyledInput from './StyledInput.vue'

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
